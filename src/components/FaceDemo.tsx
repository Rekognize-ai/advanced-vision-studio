import { useState, useEffect } from "react";
import { FaceRecognitionOverlay } from "./FaceRecognitionOverlay";
import face1 from "@/assets/face1.jpg";
import face2 from "@/assets/face2.jpg";
import face3 from "@/assets/face3.jpg";

const FaceDemo = () => {
  const faces = [face1, face2, face3];
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFaceIndex((prev) => (prev + 1) % faces.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [faces.length]);

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See Our Technology in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how our advanced AI analyzes facial features with precision and accuracy across all demographics.
            </p>
          </div>

          {/* Demo Area */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant border-2 border-border bg-muted/30">
              {/* Face Image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-card">
                <img 
                  src={faces[currentFaceIndex]} 
                  alt="Face being analyzed" 
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>

              {/* Recognition Overlay */}
              <FaceRecognitionOverlay isActive={true} />

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm font-semibold">Analyzing...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                label: "Detection Points",
                value: "68+",
                description: "Facial landmarks tracked"
              },
              {
                label: "Processing Speed",
                value: "<100ms",
                description: "Real-time analysis"
              },
              {
                label: "Accuracy",
                value: "99.9%",
                description: "Across all skin tones"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                <div className="text-3xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaceDemo;
