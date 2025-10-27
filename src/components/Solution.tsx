import { Database, Brain, CheckCircle2 } from "lucide-react";

const Solution = () => {
  const features = [
    {
      icon: Database,
      title: "Proprietary Dataset",
      description:
        "100M+ diverse facial images ensuring representation across all demographics, with particular focus on underrepresented communities.",
    },
    {
      icon: Brain,
      title: "Bias-Mitigating Algorithm",
      description:
        "Advanced neural networks specifically designed to improve accuracy across all skin tones and facial features, eliminating historical biases.",
    },
    {
      icon: CheckCircle2,
      title: "Ethical AI Framework",
      description:
        "Built on principles of transparency, inclusivity, and consent. Every decision prioritizes fairness and respect for individual privacy.",
    },
  ];

  return (
    <section id="solution" className="py-24 bg-card" aria-labelledby="solution-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              THE SOLUTION
            </div>
            <h2 id="solution-heading" className="text-4xl md:text-5xl font-bold mb-6">
              RekognizeAI: Designed for Fairness, Trained for Accuracy
            </h2>
            <p className="text-lg text-muted-foreground">
              Our proprietary technology addresses the fundamental flaws in traditional facial recognition systems, delivering unprecedented accuracy across all demographics.
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
                  How RekognizeAI Works
                </h3>
                <ul className="space-y-4">
                  {[
                    "Diverse training data spanning all ethnicities, ages, and genders",
                    "Advanced preprocessing to detect and correct lighting biases",
                    "Multi-layer neural networks optimized for dark skin tones",
                    "Real-time fairness metrics monitoring during inference",
                    "Continuous model updates based on fairness audits",
                    "End-to-end encryption and privacy-preserving architecture",
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
                      Fairness Verified by Independent Audits
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
