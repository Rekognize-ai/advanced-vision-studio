import { TrendingUp, Globe, Award, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: 99.9,
      suffix: "%",
      label: "Accuracy Rate",
      description: "Consistent across all demographics",
    },
    {
      icon: Globe,
      value: 50,
      suffix: "M+",
      label: "Diverse Dataset",
      description: "Facial images for training",
    },
    {
      icon: Award,
      value: 100,
      suffix: "%",
      label: "Bias-Free",
      description: "Verified by independent audits",
    },
    {
      icon: Clock,
      value: 0.3,
      suffix: "s",
      label: "Response Time",
      description: "Lightning-fast authentication",
    },
  ];

  const CountUp = ({
    end,
    suffix,
    isVisible,
  }: {
    end: number;
    suffix: string;
    isVisible: boolean;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, [end, isVisible]);

    return (
      <span>
        {count.toFixed(end < 10 ? 1 : 0)}
        {suffix}
      </span>
    );
  };

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
            OUR IMPACT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Making a Real Difference
          </h2>
          <p className="text-lg text-muted-foreground">
            Our technology is setting new standards in facial recognition,
            providing equitable solutions for everyone.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-smooth border border-border text-center"
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="bg-gradient-to-br from-card to-background rounded-3xl p-8 md:p-12 shadow-elegant border border-border max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">
            Transforming the Future of Authentication
          </h3>
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-8">
            Rekognize is revolutionizing how we think about facial recognition
            technology. By prioritizing diversity, equity, and inclusion, we're
            building a future where everyone can benefit from secure, accurate,
            and fair authentication solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Banking", "Healthcare", "Government", "Retail", "Education"].map(
              (industry, index) => (
                <span
                  key={index}
                  className="bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm border border-secondary/20"
                >
                  {industry}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
