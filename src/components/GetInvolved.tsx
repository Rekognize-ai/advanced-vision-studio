import { Building2, TrendingUp, Code, HeartHandshake, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const GetInvolved = () => {
  const engagementPaths = [
    {
      icon: Building2,
      title: "For Governments",
      description: "Deploy secure, fair facial recognition systems with comprehensive pilot programs and integration support.",
      features: [
        "Pilot programs with success metrics",
        "Secure on-premise deployment options",
        "Compliance with local regulations",
        "Training and community engagement support"
      ],
      cta: "Schedule a Demo",
      mailto: "mailto:Info@rekognize.ai?subject=Government Partnership Inquiry"
    },
    {
      icon: TrendingUp,
      title: "For Investors",
      description: "Join us in building technology that creates both social impact and sustainable business value.",
      features: [
        "Series A funding opportunities",
        "Proven product-market fit",
        "Strong growth trajectory",
        "Mission-driven leadership team"
      ],
      cta: "Investment Inquiry",
      mailto: "mailto:Info@rekognize.ai?subject=Investment Inquiry"
    },
    {
      icon: Code,
      title: "For Developers",
      description: "Build fair AI applications with our comprehensive API and development tools.",
      features: [
        "RESTful API with extensive docs",
        "SDKs for major languages",
        "Sandbox environment for testing",
        "Technical support and integration help"
      ],
      cta: "Join API Waitlist",
      mailto: "mailto:Info@rekognize.ai?subject=Developer API Access Request"
    },
    {
      icon: HeartHandshake,
      title: "For NGOs & Advocacy Groups",
      description: "Partner with us on fairness research and community-centered AI development.",
      features: [
        "Collaborative fairness studies",
        "Community impact assessment",
        "Pro-bono or discounted access",
        "Joint advocacy initiatives"
      ],
      cta: "Partner with Us",
      mailto: "mailto:Info@rekognize.ai?subject=NGO Partnership Inquiry"
    }
  ];

  return (
    <section id="get-involved" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              GET INVOLVED
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Work With RekognizeAI
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're a government agency, investor, developer, or advocacy organization, we have a path for you to join our mission of building fair AI.
            </p>
          </div>

          {/* Engagement Paths */}
          <div className="grid md:grid-cols-2 gap-8">
            {engagementPaths.map((path, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 shadow-elegant hover:shadow-glow transition-smooth border border-border"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-glow">
                    <path.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {path.description}
                </p>

                <div className="bg-background/50 rounded-2xl p-5 mb-6">
                  <ul className="space-y-3">
                    {path.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => window.location.href = path.mailto}
                  className="w-full gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth"
                  size="lg"
                >
                  {path.cta}
                  <Mail className="ml-2 w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* General Contact CTA */}
          <div className="mt-16 bg-gradient-to-br from-card to-background rounded-3xl p-8 md:p-12 shadow-elegant border border-border text-center">
            <h3 className="text-3xl font-bold mb-4">
              Don't See Your Organization Type?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're open to exploring partnerships with organizations committed to fair and ethical AI. Reach out to discuss how we can work together.
            </p>
            <Button
              onClick={() => window.location.href = "mailto:Info@rekognize.ai?subject=General Partnership Inquiry"}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              Get in Touch
              <Mail className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
