import { AlertTriangle } from "lucide-react";

const Problem = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center space-x-2 bg-destructive/10 text-destructive font-semibold px-4 py-2 rounded-full mb-6 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>THE PROBLEM WE'RE SOLVING</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Addressing the Gaps in Traditional Systems
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Traditional facial recognition systems have historically
                struggled to accurately identify people of color, leading to
                alarming rates of misidentification and distrust in technology.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These biases have real, harmful impacts on individuals and
                communities, perpetuating inequality and undermining public
                confidence in AI systems.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-card rounded-xl p-4 border border-destructive/20">
                  <div className="text-3xl font-bold text-destructive mb-1">
                    35%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Higher error rates for darker skin tones
                  </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-destructive/20">
                  <div className="text-3xl font-bold text-destructive mb-1">
                    28%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Misidentification in people of color
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-destructive/20 to-card rounded-3xl shadow-elegant overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <AlertTriangle className="w-24 h-24 text-destructive mx-auto mb-6 animate-pulse" />
                      <h3 className="text-2xl font-bold mb-4">
                        Traditional Systems Fail
                      </h3>
                      <p className="text-muted-foreground">
                        Existing facial recognition technology perpetuates bias
                        and inequality
                      </p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-destructive/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-destructive/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
