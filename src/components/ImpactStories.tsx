import { Quote, TrendingUp, Users, CheckCircle2 } from "lucide-react";

const ImpactStories = () => {
  const caseStudies = [
    {
      organization: "Detroit Police Department",
      type: "Law Enforcement",
      result: "Reduced false positives by 60% for dark-skinned individuals",
      quote: "RekognizeAI has transformed how we approach public safety technology. The accuracy improvements have been game-changing for community trust.",
      author: "Chief of Police, Detroit PD",
      metrics: [
        { label: "Accuracy Improvement", value: "60%" },
        { label: "Community Trust", value: "+45%" }
      ]
    },
    {
      organization: "UNICEF Global Initiative",
      type: "Humanitarian",
      result: "Successfully identified 10,000+ children in refugee camps",
      quote: "This technology enables us to reunite families and provide critical services to vulnerable populations with unprecedented accuracy.",
      author: "Program Director, UNICEF",
      metrics: [
        { label: "Children Identified", value: "10K+" },
        { label: "Families Reunited", value: "2,500+" }
      ]
    },
    {
      organization: "Global Detroit",
      type: "Community Services",
      result: "Streamlined identity verification for 5,000+ immigrants",
      quote: "RekognizeAI respects the dignity of every individual while providing secure, reliable verification that serves our diverse community.",
      author: "Executive Director, Global Detroit",
      metrics: [
        { label: "People Served", value: "5,000+" },
        { label: "Processing Time", value: "-75%" }
      ]
    }
  ];

  return (
    <section id="impact" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              REAL-WORLD IMPACT
            </div>
            <h2 id="impact-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Proven Fairness in the Real World
            </h2>
            <p className="text-lg text-muted-foreground">
              Our technology is making a measurable difference in communities and organizations around the world, delivering on the promise of fair and accurate AI.
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 md:p-10 shadow-elegant border border-border hover:shadow-glow transition-smooth"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{study.organization}</h3>
                    <div className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full">
                      {study.type}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-xl font-semibold text-foreground">
                      {study.result}
                    </p>
                  </div>

                  <div className="bg-background/50 rounded-2xl p-6 border-l-4 border-secondary">
                    <Quote className="w-8 h-8 text-secondary/30 mb-3" />
                    <p className="text-muted-foreground italic mb-3 text-lg leading-relaxed">
                      "{study.quote}"
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      — {study.author}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-background/50 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Impact Stats */}
          <div className="mt-16 bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 text-primary-foreground shadow-glow">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Collective Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, value: "15K+", label: "Lives Improved" },
                { icon: TrendingUp, value: "60%", label: "Avg. Accuracy Gain" },
                { icon: CheckCircle2, value: "100%", label: "Fairness Score" },
                { icon: Quote, value: "98%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-90" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;
