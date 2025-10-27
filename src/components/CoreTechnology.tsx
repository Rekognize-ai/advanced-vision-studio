import { Shield, Zap, Database, Lock, Activity, GitBranch } from "lucide-react";

const CoreTechnology = () => {
  const techFeatures = [
    {
      icon: GitBranch,
      title: "Proprietary Model Architecture",
      description: "Custom-built neural networks designed specifically for fairness and accuracy across diverse populations."
    },
    {
      icon: Activity,
      title: "Fairness Metrics & Benchmarks",
      description: "Continuous monitoring against industry-leading fairness standards, with transparent reporting of performance metrics."
    },
    {
      icon: Shield,
      title: "Data Security & Compliance",
      description: "GDPR compliant, ISO/IEC 42001 certified AI management systems ensuring the highest security standards."
    },
    {
      icon: Lock,
      title: "Privacy-First Design",
      description: "End-to-end encryption, on-device processing options, and strict data minimization principles."
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Lightning-fast inference with sub-second response times without compromising accuracy or fairness."
    },
    {
      icon: Database,
      title: "Flexible Deployment",
      description: "Available via REST API, SDK integration, or on-premise deployment to meet your specific security requirements."
    }
  ];

  return (
    <section id="technology" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              CORE TECHNOLOGY
            </div>
            <h2 id="technology-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Inside RekognizeAI
            </h2>
            <p className="text-lg text-muted-foreground">
              Enterprise-grade technology built on a foundation of fairness, security, and transparency. Designed for partners who demand the highest standards.
            </p>
          </div>

          {/* Tech Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {techFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-smooth border border-border"
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-glow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Specs */}
          <div className="bg-gradient-to-br from-card to-background rounded-3xl p-8 md:p-12 shadow-elegant border border-border">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Technical Specifications
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 text-secondary">Performance Metrics</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 99.9% accuracy across all demographics</li>
                  <li>• &lt;0.3s average response time</li>
                  <li>• 60% reduction in false positives for dark skin tones</li>
                  <li>• Equal error rates across ethnic groups</li>
                  <li>• Real-time processing up to 30 fps</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 text-secondary">Integration & Security</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• RESTful API with comprehensive documentation</li>
                  <li>• SDKs for Python, JavaScript, Java, and C++</li>
                  <li>• On-premise deployment options available</li>
                  <li>• GDPR, CCPA, and BIPA compliant</li>
                  <li>• ISO/IEC 42001 AI management certified</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnology;
