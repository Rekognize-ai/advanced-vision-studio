import { Database, Brain, CheckCircle2 } from "lucide-react";

const Solution = () => {
  const features = [
    {
      icon: Database,
      title: "Proprietary Database",
      description:
        "Access to one of the world's most comprehensive and diverse facial image databases, with strong emphasis on people of color.",
    },
    {
      icon: Brain,
      title: "Advanced AI Training",
      description:
        "Our models are trained to handle nuances of different facial features and skin tones, setting new benchmarks in fairness.",
    },
    {
      icon: CheckCircle2,
      title: "Extensive Research",
      description:
        "Years of dedicated research ensuring our algorithm eliminates racial bias and provides reliable, accurate results.",
    },
  ];

  return (
    <section id="technology" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              OUR SOLUTION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bias-Free, Reliable Technology
            </h2>
            <p className="text-lg text-muted-foreground">
              Rekognize's facial recognition algorithm uses a unique and diverse
              dataset to address and eliminate racial bias through cutting-edge
              approaches.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-smooth hover:-translate-y-2 border border-border"
              >
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-glow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technology Showcase */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elegant border border-border">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Revolutionary Technology Stack
                </h3>
                <ul className="space-y-4">
                  {[
                    "Deep learning neural networks trained on 50M+ diverse faces",
                    "Real-time bias detection and correction algorithms",
                    "Multi-factor authentication for enhanced security",
                    "Privacy-first architecture with encrypted data storage",
                    "Continuous learning system that improves over time",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl shadow-glow flex items-center justify-center">
                  <div className="text-center p-8">
                    <Brain className="w-32 h-32 text-secondary mx-auto mb-6 animate-pulse" />
                    <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                      99.9%
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Accuracy Across All Demographics
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
