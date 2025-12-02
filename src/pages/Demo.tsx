import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, RotateCcw, Lightbulb, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadModels, analyzeFace, compareFaces, getFacialFeatures, estimateEthnicity, type FaceAnalysis } from "@/lib/faceApi";
import * as faceapi from 'face-api.js';
import rekognizeLogo from "@/assets/rekognize-logo.svg";

const Demo = () => {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [result, setResult] = useState<{ 
    match: boolean; 
    confidence: number;
    referenceAnalysis: FaceAnalysis | null;
    comparisonAnalysis: FaceAnalysis | null;
  } | null>(null);
  const [showCamera, setShowCamera] = useState<"reference" | "comparison" | null>(null);
  const [referenceFaceBox, setReferenceFaceBox] = useState<any>(null);
  const [comparisonFaceBox, setComparisonFaceBox] = useState<any>(null);
  const [detectingReference, setDetectingReference] = useState(false);
  const [detectingComparison, setDetectingComparison] = useState(false);
  const [liveDetection, setLiveDetection] = useState<any>(null);
  const [detectionQuality, setDetectionQuality] = useState<number>(0);
  const [autoCapturing, setAutoCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [lightingQuality, setLightingQuality] = useState<'good' | 'poor' | 'checking'>('checking');
  
  const referenceInputRef = useRef<HTMLInputElement>(null);
  const comparisonInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const referenceImgRef = useRef<HTMLImageElement>(null);
  const comparisonImgRef = useRef<HTMLImageElement>(null);
  const detectionIntervalRef = useRef<any>(null);
  const consecutiveDetectionsRef = useRef<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    loadModels()
      .then(() => {
        setModelsLoading(false);
        toast({
          title: "AI Models Loaded",
          description: "Face detection and analysis ready!",
        });
      })
      .catch(() => {
        toast({
          title: "Error Loading Models",
          description: "Please refresh the page to try again.",
          variant: "destructive",
        });
      });
  }, []);

  // Auto-detect faces when images are loaded
  useEffect(() => {
    if (referenceImage && referenceImgRef.current && !modelsLoading) {
      detectFaceInImage(referenceImgRef.current, "reference");
    }
  }, [referenceImage, modelsLoading]);

  useEffect(() => {
    if (comparisonImage && comparisonImgRef.current && !modelsLoading) {
      detectFaceInImage(comparisonImgRef.current, "comparison");
    }
  }, [comparisonImage, modelsLoading]);

  const detectFaceInImage = async (imgElement: HTMLImageElement, type: "reference" | "comparison") => {
    try {
      if (type === "reference") setDetectingReference(true);
      else setDetectingComparison(true);

      const detection = await faceapi
        .detectSingleFace(imgElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        if (type === "reference") {
          setReferenceFaceBox(detection.detection.box);
        } else {
          setComparisonFaceBox(detection.detection.box);
        }
        
        toast({
          title: "Face Detected!",
          description: `Face automatically detected in ${type} image.`,
        });
      } else {
        toast({
          title: "No Face Detected",
          description: `Could not detect a face in the ${type} image.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Auto face detection error:', error);
    } finally {
      if (type === "reference") setDetectingReference(false);
      else setDetectingComparison(false);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "reference" | "comparison"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (type === "reference") {
          setReferenceImage(imageUrl);
          setReferenceFaceBox(null);
        } else {
          setComparisonImage(imageUrl);
          setComparisonFaceBox(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera control functions
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    setShowCamera(null);
    setLiveDetection(null);
    setDetectionQuality(0);
    setAutoCapturing(false);
    setCountdown(0);
    consecutiveDetectionsRef.current = 0;
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0);
      const imageUrl = canvas.toDataURL("image/jpeg");
      
      if (showCamera === "reference") {
        setReferenceImage(imageUrl);
        toast({
          title: "Photo Captured!",
          description: "Reference image captured successfully.",
        });
      } else {
        setComparisonImage(imageUrl);
        toast({
          title: "Photo Captured!",
          description: "Comparison image captured successfully.",
        });
      }
      
      stopCamera();
    }
  }, [showCamera, stopCamera, toast]);

  // Real-time face detection on camera feed
  useEffect(() => {
    if (showCamera && videoRef.current && !modelsLoading) {
      const video = videoRef.current;
      
      const runDetection = async () => {
        if (video.readyState === 4) {
          try {
            const detection = await faceapi
              .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
              .withFaceLandmarks();

            if (detection) {
              setLiveDetection(detection);
              const quality = detection.detection.score * 100;
              setDetectionQuality(quality);

              // Analyze lighting quality from video feed
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = video.videoWidth;
              tempCanvas.height = video.videoHeight;
              const tempCtx = tempCanvas.getContext('2d');
              if (tempCtx) {
                tempCtx.drawImage(video, 0, 0);
                const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                const data = imageData.data;
                let brightness = 0;
                for (let i = 0; i < data.length; i += 4) {
                  const r = data[i];
                  const g = data[i + 1];
                  const b = data[i + 2];
                  brightness += (r + g + b) / 3;
                }
                brightness = brightness / (data.length / 4);
                
                // Good lighting is between 80-200 brightness
                if (brightness < 70 || brightness > 220) {
                  setLightingQuality('poor');
                } else {
                  setLightingQuality('good');
                }
              }

              // Draw detection on canvas
              if (canvasRef.current) {
                const displaySize = { width: video.videoWidth, height: video.videoHeight };
                faceapi.matchDimensions(canvasRef.current, displaySize);
                const resizedDetection = faceapi.resizeResults(detection, displaySize);
                
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                  
                  // Draw bounding box - only green if excellent quality
                  const box = resizedDetection.detection.box;
                  const isExcellent = quality >= 85;
                  ctx.strokeStyle = isExcellent ? '#22c55e' : quality > 70 ? '#eab308' : '#ef4444';
                  ctx.lineWidth = 4;
                  ctx.strokeRect(box.x, box.y, box.width, box.height);
                  
                  // Draw landmarks
                  const landmarks = resizedDetection.landmarks.positions;
                  ctx.fillStyle = isExcellent ? '#22c55e' : quality > 70 ? '#eab308' : '#ef4444';
                  landmarks.forEach((point: any) => {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
                    ctx.fill();
                  });
                }
              }

              // Auto-capture logic - immediate capture when EXCELLENT quality (85%+) AND good lighting
              if (quality >= 85 && lightingQuality === 'good' && !autoCapturing) {
                setAutoCapturing(true);
                toast({
                  title: "Excellent Quality!",
                  description: "Capturing now...",
                });
              }
            } else {
              setLiveDetection(null);
              setDetectionQuality(0);
              consecutiveDetectionsRef.current = 0;
              setAutoCapturing(false);
              setCountdown(0);
              
              // Clear canvas
              if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                }
              }
            }
          } catch (error) {
            console.error('Live detection error:', error);
          }
        }
      };

      detectionIntervalRef.current = setInterval(runDetection, 100);

      return () => {
        if (detectionIntervalRef.current) {
          clearInterval(detectionIntervalRef.current);
        }
      };
    }
  }, [showCamera, modelsLoading]);

  // Auto-capture when flag is set
  useEffect(() => {
    if (autoCapturing) {
      const timer = setTimeout(() => {
        capturePhoto();
        setAutoCapturing(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoCapturing, capturePhoto]);

  // Countdown timer for auto-capture
  useEffect(() => {
    if (autoCapturing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoCapturing && countdown === 0) {
      capturePhoto();
      setAutoCapturing(false);
    }
  }, [autoCapturing, countdown, capturePhoto]);

  const startCamera = async (type: "reference" | "comparison") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setShowCamera(type);
      setLiveDetection(null);
      setDetectionQuality(0);
      consecutiveDetectionsRef.current = 0;
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const performComparison = async () => {
    if (!referenceImage || !comparisonImage) {
      toast({
        title: "Missing Images",
        description: "Please upload or capture both images before comparing.",
        variant: "destructive",
      });
      return;
    }

    if (!referenceImgRef.current || !comparisonImgRef.current) {
      toast({
        title: "Error",
        description: "Images not properly loaded. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);
    setResult(null);

    try {
      // Analyze both faces
      const refAnalysis = await analyzeFace(referenceImgRef.current);
      const compAnalysis = await analyzeFace(comparisonImgRef.current);

      if (!refAnalysis || !compAnalysis) {
        toast({
          title: "No Face Detected",
          description: "Could not detect a face in one or both images. Please try different images.",
          variant: "destructive",
        });
        setIsComparing(false);
        return;
      }

      // Compare face descriptors
      const similarity = compareFaces(refAnalysis.descriptor, compAnalysis.descriptor);
      const match = similarity >= 60; // Threshold for match

      setResult({ 
        match, 
        confidence: similarity,
        referenceAnalysis: refAnalysis,
        comparisonAnalysis: compAnalysis,
      });

      toast({
        title: "Analysis Complete",
        description: match ? "Match found!" : "No match detected.",
      });
    } catch (error) {
      console.error('Face comparison error:', error);
      toast({
        title: "Analysis Error",
        description: "An error occurred during face analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsComparing(false);
    }
  };

  const reset = () => {
    setReferenceImage(null);
    setComparisonImage(null);
    setResult(null);
    setShowCamera(null);
    setReferenceFaceBox(null);
    setComparisonFaceBox(null);
    if (referenceInputRef.current) referenceInputRef.current.value = "";
    if (comparisonInputRef.current) comparisonInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-12 pb-24">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={rekognizeLogo} alt="Rekognize" className="h-16 md:h-20" />
        </div>

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Face Comparison Demo
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Compare two face images to determine if they belong to the same person. 
            Upload images or capture them directly using your camera with advanced face detection.
          </p>
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-3">
            <Lightbulb className="w-5 h-5 text-secondary" />
            <span className="text-sm text-secondary font-medium">
              <strong>Auto-capture:</strong> When a high-quality face is detected consistently, the photo will be captured automatically!
            </span>
          </div>
        </div>

        {/* Camera Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl p-6 max-w-3xl w-full">
              <h3 className="text-2xl font-bold mb-4">
                Capture {showCamera === "reference" ? "Reference" : "Comparison"} Image
              </h3>
              
              {/* Detection Status */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${liveDetection ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-sm font-medium">
                      {liveDetection ? `Face Detected (${Math.round(detectionQuality)}% quality)` : 'Looking for face...'}
                    </span>
                  </div>
                  {autoCapturing && (
                    <div className="flex items-center space-x-3 bg-green-500/20 border-2 border-green-500 rounded-lg px-4 py-2 animate-pulse">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-500">CAPTURING...</span>
                    </div>
                  )}
                </div>
                
                {/* Lighting Feedback */}
                {liveDetection && lightingQuality === 'poor' && (
                  <div className="flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500 rounded-lg px-3 py-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-yellow-500 font-medium">
                      Poor lighting detected. Move to a brighter area or turn on more lights for better quality.
                    </span>
                  </div>
                )}
                
                {/* Quality Feedback */}
                {liveDetection && detectionQuality < 85 && lightingQuality === 'good' && (
                  <div className="flex items-center space-x-2 bg-blue-500/20 border border-blue-500 rounded-lg px-3 py-2">
                    <span className="text-xs text-blue-500 font-medium">
                      {detectionQuality >= 70 
                        ? 'Good detection. Move slightly closer or adjust position for excellent quality (85%+)' 
                        : 'Move closer to camera and face it directly for better detection'}
                    </span>
                  </div>
                )}
              </div>

              {/* Video Feed with Canvas Overlay */}
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
                
                  {/* Detection Info Overlay */}
                {liveDetection && (
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white min-w-[200px]">
                    <div className="text-xs mb-1 flex items-center justify-between">
                      <span>Detection Quality</span>
                      {lightingQuality === 'poor' && (
                        <span className="text-yellow-400 text-xs">⚠ Poor Light</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            detectionQuality >= 85 ? 'bg-green-500' : 
                            detectionQuality >= 70 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${detectionQuality}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{Math.round(detectionQuality)}%</span>
                    </div>
                    <div className="text-xs text-gray-300">
                      {detectionQuality >= 85 && lightingQuality === 'good' 
                        ? '✓ EXCELLENT - Auto-capturing!' 
                        : detectionQuality >= 70 
                        ? 'Good - improve more' 
                        : 'Need better position'}
                    </div>
                  </div>
                )}
                
                {/* Capturing Flash Overlay */}
                {autoCapturing && (
                  <div className="absolute inset-0 bg-white animate-pulse pointer-events-none" />
                )}
              </div>

              {/* Instructions */}
              <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-semibold">Two ways to capture:</p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li><strong>Auto-capture:</strong> Activates instantly at EXCELLENT quality (85%+ with good lighting)</li>
                      <li><strong>Manual capture:</strong> Click "Capture Now" button anytime</li>
                      <li>Green box = Excellent, Yellow = Good, Red = Poor</li>
                      <li>Best results: Face camera directly in good lighting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={capturePhoto}
                  className="gradient-primary text-white font-semibold flex-1"
                  size="lg"
                >
                  <Camera className="mr-2 w-5 h-5" />
                  {liveDetection && detectionQuality >= 85 && lightingQuality === 'good' 
                    ? 'Capture Now (Excellent!)' 
                    : 'Capture Now'}
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Interface */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Reference Image */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Reference Image</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Upload or capture the reference face image
            </p>
            
            <div className="aspect-square bg-muted/30 rounded-xl border-2 border-dashed border-border mb-4 overflow-hidden flex items-center justify-center relative">
              {referenceImage ? (
                <>
                  <img 
                    ref={referenceImgRef}
                    src={referenceImage} 
                    alt="Reference" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  {detectingReference && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                  {referenceFaceBox && (
                    <div 
                      className="absolute border-4 border-green-500 rounded-lg pointer-events-none"
                      style={{
                        left: `${(referenceFaceBox.x / referenceImgRef.current!.width) * 100}%`,
                        top: `${(referenceFaceBox.y / referenceImgRef.current!.height) * 100}%`,
                        width: `${(referenceFaceBox.width / referenceImgRef.current!.width) * 100}%`,
                        height: `${(referenceFaceBox.height / referenceImgRef.current!.height) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Face Detected
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-8">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No image selected</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => referenceInputRef.current?.click()}
                variant="outline"
                className="font-semibold"
              >
                <Upload className="mr-2 w-4 h-4" />
                Upload
              </Button>
              <Button
                onClick={() => startCamera("reference")}
                variant="outline"
                className="font-semibold"
              >
                <Camera className="mr-2 w-4 h-4" />
                Capture
              </Button>
            </div>
            <input
              ref={referenceInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "reference")}
              className="hidden"
            />
          </div>

          {/* Comparison Image */}
          <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Comparison Image</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Upload or capture the image to compare
            </p>
            
            <div className="aspect-square bg-muted/30 rounded-xl border-2 border-dashed border-border mb-4 overflow-hidden flex items-center justify-center relative">
              {comparisonImage ? (
                <>
                  <img 
                    ref={comparisonImgRef}
                    src={comparisonImage} 
                    alt="Comparison" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  {detectingComparison && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                  {comparisonFaceBox && (
                    <div 
                      className="absolute border-4 border-green-500 rounded-lg pointer-events-none"
                      style={{
                        left: `${(comparisonFaceBox.x / comparisonImgRef.current!.width) * 100}%`,
                        top: `${(comparisonFaceBox.y / comparisonImgRef.current!.height) * 100}%`,
                        width: `${(comparisonFaceBox.width / comparisonImgRef.current!.width) * 100}%`,
                        height: `${(comparisonFaceBox.height / comparisonImgRef.current!.height) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Face Detected
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-8">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No image selected</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => comparisonInputRef.current?.click()}
                variant="outline"
                className="font-semibold"
              >
                <Upload className="mr-2 w-4 h-4" />
                Upload
              </Button>
              <Button
                onClick={() => startCamera("comparison")}
                variant="outline"
                className="font-semibold"
              >
                <Camera className="mr-2 w-4 h-4" />
                Capture
              </Button>
            </div>
            <input
              ref={comparisonInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "comparison")}
              className="hidden"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={performComparison}
            disabled={isComparing || modelsLoading || !referenceImage || !comparisonImage}
            className="gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth"
            size="lg"
          >
            {modelsLoading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Loading AI Models...
              </>
            ) : isComparing ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Analyzing Faces...
              </>
            ) : (
              "Compare Faces with AI"
            )}
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            size="lg"
          >
            <RotateCcw className="mr-2 w-5 h-5" />
            Reset
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="max-w-6xl mx-auto animate-fade-in space-y-6">
            {/* Match Result Card */}
            <div className={`bg-card rounded-2xl p-8 shadow-elegant border-2 ${
              result.match ? "border-green-500/50" : "border-red-500/50"
            }`}>
              <div className="text-center">
                {result.match ? (
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                )}
                
                <h3 className="text-3xl font-bold mb-2">
                  {result.match ? "Match Found!" : "No Match"}
                </h3>
                
                <p className="text-lg text-muted-foreground mb-4">
                  {result.match 
                    ? "The faces appear to belong to the same person."
                    : "The faces appear to belong to different people."
                  }
                </p>
                
                <div className="bg-background rounded-xl p-6 inline-block">
                  <div className="text-sm text-muted-foreground mb-2">Similarity Score</div>
                  <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                    {result.confidence}%
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            {result.referenceAnalysis && result.comparisonAnalysis && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Reference Face Analysis */}
                <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                  <h4 className="text-xl font-bold mb-4 text-primary">Reference Face Analysis</h4>
                  
                  {/* Demographics */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="text-muted-foreground">Estimated Age</span>
                      <span className="font-semibold">{Math.round(result.referenceAnalysis.age)} years</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="text-muted-foreground">Gender</span>
                      <span className="font-semibold capitalize">
                        {result.referenceAnalysis.gender} ({Math.round(result.referenceAnalysis.genderProbability * 100)}%)
                      </span>
                    </div>
                  </div>

                  {/* Facial Features */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-3">Facial Measurements</h5>
                    <div className="space-y-2 text-sm">
                      {(() => {
                        const features = getFacialFeatures(result.referenceAnalysis.landmarks);
                        return (
                          <>
                            <div className="flex justify-between p-2 bg-background rounded">
                              <span className="text-muted-foreground">Face Ratio</span>
                              <span className="font-mono">{features.faceRatio}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-background rounded">
                              <span className="text-muted-foreground">Eye Distance</span>
                              <span className="font-mono">{features.eyeDistance}px</span>
                            </div>
                            <div className="flex justify-between p-2 bg-background rounded">
                              <span className="text-muted-foreground">Landmarks Detected</span>
                              <span className="font-mono">{features.totalLandmarks} points</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Ethnicity Analysis */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-3">Facial Structure Analysis</h5>
                    {(() => {
                      const ethnicity = estimateEthnicity(result.referenceAnalysis);
                      return (
                        <div className="space-y-2">
                          <div className="p-3 bg-background rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Analysis Result</div>
                            <div className="font-semibold">{ethnicity.primary}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Confidence: {Math.round(ethnicity.confidence)}%
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            {ethnicity.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Expressions */}
                  <div>
                    <h5 className="font-semibold mb-3">Detected Expressions</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(result.referenceAnalysis.expressions)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(([expr, val]) => (
                          <div key={expr} className="p-2 bg-background rounded">
                            <div className="capitalize text-muted-foreground">{expr}</div>
                            <div className="font-semibold">{Math.round(val * 100)}%</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Comparison Face Analysis */}
                <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                  <h4 className="text-xl font-bold mb-4 text-primary">Comparison Face Analysis</h4>
                  
                  {/* Demographics */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="text-muted-foreground">Estimated Age</span>
                      <span className="font-semibold">{Math.round(result.comparisonAnalysis.age)} years</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="text-muted-foreground">Gender</span>
                      <span className="font-semibold capitalize">
                        {result.comparisonAnalysis.gender} ({Math.round(result.comparisonAnalysis.genderProbability * 100)}%)
                      </span>
                    </div>
                  </div>

                  {/* Facial Features */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-3">Facial Measurements</h5>
                    <div className="space-y-2 text-sm">
                      {(() => {
                        const features = getFacialFeatures(result.comparisonAnalysis.landmarks);
                        return (
                          <>
                            <div className="flex justify-between p-2 bg-background rounded">
                              <span className="text-muted-foreground">Face Ratio</span>
                              <span className="font-mono">{features.faceRatio}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-background rounded">
                              <span className="text-muted-foreground">Eye Distance</span>
                              <span className="font-mono">{features.eyeDistance}px</span>
                            </div>
                            <div className="flex justify-between p-2 bg-background rounded">
                              <span className="text-muted-foreground">Landmarks Detected</span>
                              <span className="font-mono">{features.totalLandmarks} points</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Ethnicity Analysis */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-3">Facial Structure Analysis</h5>
                    {(() => {
                      const ethnicity = estimateEthnicity(result.comparisonAnalysis);
                      return (
                        <div className="space-y-2">
                          <div className="p-3 bg-background rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Analysis Result</div>
                            <div className="font-semibold">{ethnicity.primary}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Confidence: {Math.round(ethnicity.confidence)}%
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            {ethnicity.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Expressions */}
                  <div>
                    <h5 className="font-semibold mb-3">Detected Expressions</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(result.comparisonAnalysis.expressions)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(([expr, val]) => (
                          <div key={expr} className="p-2 bg-background rounded">
                            <div className="capitalize text-muted-foreground">{expr}</div>
                            <div className="font-semibold">{Math.round(val * 100)}%</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
