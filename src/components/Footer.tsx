const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="text-2xl font-bold mb-4">Rekognize</div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Eliminating bias in facial recognition and creating an accurate,
              inclusive, and equitable future with advanced AI technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#hero" className="hover:text-primary-foreground transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-primary-foreground transition-smooth">
                  Mission
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-primary-foreground transition-smooth">
                  Technology
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-primary-foreground transition-smooth">
                  Impact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>ab@rekognize.com</li>
              <li>United States</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} Rekognize. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-primary-foreground/80">
              <a href="#" className="hover:text-primary-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground transition-smooth">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
