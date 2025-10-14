import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FaceDemo from "@/components/FaceDemo";
import Mission from "@/components/Mission";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FaceDemo />
      <Mission />
      <Problem />
      <Solution />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
