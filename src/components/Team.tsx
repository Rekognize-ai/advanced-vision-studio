import { Linkedin, Mail } from "lucide-react";

const Team = () => {
  const team = [
    {
      name: "Opeyemi Adeyemo",
      role: "CEO & Founder",
      bio: "Visionary leader committed to building equitable AI systems. Former researcher in algorithmic fairness with a passion for social impact.",
      linkedin: "#",
      email: "Info@rekognize.ai"
    },
    {
      name: "Kabiru Okeleye",
      role: "Chief Technology Officer",
      bio: "AI systems architect with 10+ years experience in machine learning and computer vision. Specializes in bias detection and mitigation.",
      linkedin: "#",
      email: "Info@rekognize.ai"
    },
    {
      name: "Ridwan Amure",
      role: "Lead AI/ML Engineer",
      bio: "Expert in deep learning and neural network optimization. Published researcher in fairness-aware machine learning algorithms.",
      linkedin: "#",
      email: "Info@rekognize.ai"
    },
    {
      name: "Adedapo Adeniyi",
      role: "Community Manager",
      bio: "Bridge between technology and community impact. Ensures our solutions serve the needs of diverse communities authentically.",
      linkedin: "#",
      email: "Info@rekognize.ai"
    }
  ];

  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              ABOUT US
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A diverse team of AI researchers, engineers, and community advocates united by a mission to eliminate bias in facial recognition technology.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
              <h3 className="text-2xl font-bold mb-4 text-secondary">Mission</h3>
              <p className="text-muted-foreground">
                To create facial recognition technology that serves all people with equal accuracy and respect, eliminating the biases that have plagued the industry.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
              <h3 className="text-2xl font-bold mb-4 text-secondary">Vision</h3>
              <p className="text-muted-foreground">
                A world where AI technology enhances safety and convenience for everyone, regardless of race, gender, or background.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
              <h3 className="text-2xl font-bold mb-4 text-secondary">Values</h3>
              <p className="text-muted-foreground">
                Fairness, transparency, inclusivity, and accountability guide every decision we make and every line of code we write.
              </p>
            </div>
          </div>

          {/* Team Members */}
          <h3 className="text-3xl font-bold mb-10 text-center">Meet the Team</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-smooth border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                    <p className="text-secondary font-semibold">{member.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-white transition-smooth"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-white transition-smooth"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Advisory Board Section */}
          <div className="mt-16 bg-gradient-to-br from-card to-background rounded-3xl p-8 md:p-12 shadow-elegant border border-border text-center">
            <h3 className="text-2xl font-bold mb-4">Advisory Board & Partners</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We work closely with leading experts in AI ethics, civil rights organizations, and academic institutions to ensure our technology meets the highest standards of fairness and accountability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["AI Ethics Institute", "Stanford AI Lab", "ACLU Tech", "MIT Media Lab"].map((partner, index) => (
                <span
                  key={index}
                  className="bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-full text-sm border border-secondary/20"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
