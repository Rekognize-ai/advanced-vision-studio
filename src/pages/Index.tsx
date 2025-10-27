import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import CoreTechnology from "@/components/CoreTechnology";
import ImpactStories from "@/components/ImpactStories";
import Team from "@/components/Team";
import ResearchEthics from "@/components/ResearchEthics";
import GetInvolved from "@/components/GetInvolved";
import BlogInsights from "@/components/BlogInsights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <CoreTechnology />
      <ImpactStories />
      <Team />
      <ResearchEthics />
      <GetInvolved />
      <BlogInsights />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
