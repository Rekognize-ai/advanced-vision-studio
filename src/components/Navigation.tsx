import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo-transparent.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string, id: string) => {
    setIsMobileMenuOpen(false);
    
    if (path === "/demo") {
      navigate("/demo");
    } else if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const navItems = [
    { label: "Home", id: "hero", path: "/" },
    { label: "Solution", id: "solution", path: "/" },
    { label: "Technology", id: "technology", path: "/" },
    { label: "Impact", id: "impact", path: "/" },
    { label: "Team", id: "team", path: "/" },
    { label: "Research", id: "research", path: "/" },
    { label: "Demo", id: "demo", path: "/demo" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="RekognizeAI - Fair Facial Recognition Technology" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path, item.id)}
                className="text-foreground hover:text-secondary transition-smooth font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick("/", "get-involved")}
              className="gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-smooth"
            >
              Get Involved
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path, item.id)}
                  className="text-foreground hover:text-secondary transition-smooth font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick("/", "get-involved")}
                className="gradient-primary text-white font-semibold w-full"
              >
                Get Involved
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
