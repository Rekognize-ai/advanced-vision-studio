import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleInvestClick = () => {
    window.location.href = "mailto:Info@rekognize.ai?subject=Investment Inquiry";
  };

  const handleContactClick = () => {
    window.location.href = "mailto:Info@rekognize.ai?subject=General Inquiry";
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
              { icon: Mail, label: "Email", value: "Info@rekognize.ai" },
              { icon: Phone, label: "Phone", value: "(734) 472-7851" },
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

          {/* Social Media */}
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="https://x.com/rekognizeai?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:scale-110 transition-smooth shadow-elegant"
              aria-label="Follow us on X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/rekognizeai?igsh=ZzYzaHlpYnk3cHR5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:scale-110 transition-smooth shadow-elegant"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
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
