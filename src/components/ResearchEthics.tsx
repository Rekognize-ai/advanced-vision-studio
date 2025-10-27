import { BookOpen, Shield, Users, FileText, Award, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResearchEthics = () => {
  const principles = [
    {
      icon: Shield,
      title: "Transparency First",
      description: "Open documentation of our training data, model architecture, and performance metrics across demographics."
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Active collaboration with affected communities to understand real-world impacts and concerns."
    },
    {
      icon: Award,
      title: "Independent Auditing",
      description: "Regular third-party fairness audits and public reporting of bias metrics and accuracy disparities."
    },
    {
      icon: GitBranch,
      title: "Continuous Improvement",
      description: "Ongoing research and development to address emerging fairness challenges and improve accuracy."
    }
  ];

  const research = [
    {
      title: "Fairness in Facial Recognition: A Comprehensive Audit",
      type: "Whitepaper",
      description: "Detailed analysis of bias mitigation techniques and performance across demographic groups.",
      link: "#"
    },
    {
      title: "Building Diverse Training Datasets",
      type: "Research Paper",
      description: "Methodology for creating representative datasets that reflect global demographic diversity.",
      link: "#"
    },
    {
      title: "Independent Bias Assessment Report 2024",
      type: "Audit Report",
      description: "Third-party evaluation by leading AI ethics researchers confirming fairness metrics.",
      link: "#"
    }
  ];

  return (
    <section id="research" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              RESEARCH & ETHICS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Responsible AI Is Our Foundation
            </h2>
            <p className="text-lg text-muted-foreground">
              We believe that ethical AI requires transparency, accountability, and continuous engagement with the communities we serve. Our research and governance practices reflect these commitments.
            </p>
          </div>

          {/* Ethical Principles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-smooth border border-border text-center"
              >
                <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                  <principle.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Governance & Compliance */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-elegant border border-border mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Governance & Compliance
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our AI management systems are certified to meet the most rigorous international standards. We work with regulatory bodies and civil rights organizations to ensure our technology is deployed responsibly.
                </p>
                <div className="space-y-3">
                  {[
                    "ISO/IEC 42001 AI Management System Certified",
                    "GDPR, CCPA, and BIPA Compliant",
                    "Regular fairness audits by independent researchers",
                    "Transparent reporting of demographic performance",
                    "Ethics review board oversight"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-8 text-center">
                <Shield className="w-20 h-20 text-secondary mx-auto mb-4" />
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-muted-foreground font-semibold">
                  Committed to Ethical AI
                </div>
              </div>
            </div>
          </div>

          {/* Research Publications */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center">
              Publications & Research
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {research.map((paper, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-smooth border border-border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      {paper.type === "Whitepaper" ? (
                        <FileText className="w-5 h-5 text-white" />
                      ) : paper.type === "Research Paper" ? (
                        <BookOpen className="w-5 h-5 text-white" />
                      ) : (
                        <Award className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {paper.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-3">{paper.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {paper.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
                  >
                    Read More
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* University Partnerships */}
          <div className="mt-16 bg-gradient-to-br from-card to-background rounded-3xl p-8 md:p-12 shadow-elegant border border-border text-center">
            <h3 className="text-2xl font-bold mb-4">University & Institutional Collaborations</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We partner with leading research institutions to advance the science of fair AI and contribute to open datasets that benefit the entire research community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["MIT", "Stanford", "Carnegie Mellon", "UC Berkeley", "Oxford"].map((university, index) => (
                <span
                  key={index}
                  className="bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm border border-secondary/20"
                >
                  {university}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchEthics;
