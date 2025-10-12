import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleInvestClick = () => {
    window.location.href = "mailto:ab@rekognize.com?subject=Investment Inquiry";
  };

  const handleContactClick = () => {
    window.location.href = "mailto:ab@rekognize.com?subject=General Inquiry";
  };

  return (
    <section id="contact" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              GET IN TOUCH
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join the Revolution?
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're interested in investing, partnering, or learning
              more about our technology, we'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Investment CTA */}
            <div className="bg-card rounded-3xl p-8 shadow-elegant border border-border hover:shadow-glow transition-smooth">
              <div className="text-center mb-6">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Invest in Rekognize</h3>
                <p className="text-muted-foreground mb-6">
                  Be part of creating a more equitable future with cutting-edge
                  AI technology. Join our mission to eliminate bias in facial
                  recognition.
                </p>
                <Button
                  onClick={handleInvestClick}
                  className="gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth w-full"
                  size="lg"
                >
                  Schedule a Meeting
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* General Contact */}
            <div className="bg-card rounded-3xl p-8 shadow-elegant border border-border hover:shadow-glow transition-smooth">
              <div className="text-center mb-6">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">General Inquiries</h3>
                <p className="text-muted-foreground mb-6">
                  Have questions about our technology, partnerships, or how
                  Rekognize can help your organization? Reach out to our team.
                </p>
                <Button
                  onClick={handleContactClick}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-smooth w-full"
                  size="lg"
                >
                  Contact Us
                  <Mail className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", value: "ab@rekognize.com" },
              { icon: Phone, label: "Phone", value: "Contact for details" },
              { icon: MapPin, label: "Location", value: "United States" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-elegant border border-border"
              >
                <item.icon className="w-6 h-6 text-secondary mx-auto mb-3" />
                <div className="text-sm font-semibold mb-1">{item.label}</div>
                <div className="text-muted-foreground text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrendingUp = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default Contact;
