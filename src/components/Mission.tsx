import { Target, Users, Shield, Zap } from "lucide-react";

const Mission = () => {
  const values = [
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "Ensuring facial recognition works effectively for diverse users across all ethnicities, genders, and age groups.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Committed to the highest standards of security, protecting user data and financial transactions.",
    },
    {
      icon: Target,
      title: "Accuracy",
      description:
        "Unmatched precision in facial recognition, setting new standards for reliability and trust.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Leveraging cutting-edge AI technology to revolutionize digital authentication for the future.",
    },
  ];

  return (
    <section id="mission" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full mb-4 text-sm">
            OUR MISSION
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Equity in AI and Public Safety
          </h2>
          <p className="text-lg text-muted-foreground">
            At Rekognize, we are driven by a vision to create a more accurate
            and equitable future through advanced AI technology. Our
            groundbreaking facial recognition algorithm is engineered to serve
            people of color with unmatched precision, setting a new standard for
            inclusivity and fairness.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-smooth hover:-translate-y-2 border border-border"
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-glow">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
