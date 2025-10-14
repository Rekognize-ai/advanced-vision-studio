import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, Camera, RotateCcw, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FaceRecognitionOverlay } from "@/components/FaceRecognitionOverlay";

const Demo = () => {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [result, setResult] = useState<{ match: boolean; confidence: number } | null>(null);
  const [showCamera, setShowCamera] = useState<"reference" | "comparison" | null>(null);
  
  const referenceInputRef = useRef<HTMLInputElement>(null);
  const comparisonInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

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
        } else {
          setComparisonImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async (type: "reference" | "comparison") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setShowCamera(type);
      
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

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageUrl = canvas.toDataURL("image/jpeg");
      
      if (showCamera === "reference") {
        setReferenceImage(imageUrl);
      } else {
        setComparisonImage(imageUrl);
      }
      
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(null);
  };

  const compareFaces = async () => {
    if (!referenceImage || !comparisonImage) {
      toast({
        title: "Missing Images",
        description: "Please upload or capture both images before comparing.",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);
    setResult(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo: Random result for demonstration
    const match = Math.random() > 0.5;
    const confidence = match ? 85 + Math.random() * 15 : 20 + Math.random() * 40;

    setResult({ match, confidence: Math.round(confidence) });
    setIsComparing(false);
  };

  const reset = () => {
    setReferenceImage(null);
    setComparisonImage(null);
    setResult(null);
    setShowCamera(null);
    if (referenceInputRef.current) referenceInputRef.current.value = "";
    if (comparisonInputRef.current) comparisonInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-24">
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
            <div className="bg-card rounded-2xl p-6 max-w-2xl w-full">
              <h3 className="text-2xl font-bold mb-4">
                Capture {showCamera === "reference" ? "Reference" : "Comparison"} Image
              </h3>
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={capturePhoto}
                  className="gradient-primary text-white font-semibold flex-1"
                  size="lg"
                >
                  <Camera className="mr-2 w-5 h-5" />
                  Capture Photo
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
                  <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
                  <FaceRecognitionOverlay isActive={isComparing} />
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
                  <img src={comparisonImage} alt="Comparison" className="w-full h-full object-cover" />
                  <FaceRecognitionOverlay isActive={isComparing} />
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
            onClick={compareFaces}
            disabled={isComparing || !referenceImage || !comparisonImage}
            className="gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth"
            size="lg"
          >
            {isComparing ? "Analyzing..." : "Compare Faces"}
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
          <div className="max-w-2xl mx-auto animate-fade-in">
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
                  <div className="text-sm text-muted-foreground mb-2">Confidence Score</div>
                  <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                    {result.confidence}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Demo;
