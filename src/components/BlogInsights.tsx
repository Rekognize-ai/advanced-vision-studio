import { BookOpen, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogInsights = () => {
  const articles = [
    {
      category: "AI Ethics",
      title: "Why Diversity in Training Data Matters: The Science Behind Fair AI",
      excerpt: "Exploring how diverse datasets directly impact model accuracy and fairness across different demographic groups.",
      date: "November 15, 2024",
      readTime: "6 min read"
    },
    {
      category: "Policy & Regulation",
      title: "Navigating AI Regulations: GDPR, CCPA, and the Future of Facial Recognition",
      excerpt: "Understanding the regulatory landscape and how RekognizeAI ensures compliance while maintaining innovation.",
      date: "November 8, 2024",
      readTime: "8 min read"
    },
    {
      category: "Success Story",
      title: "How Detroit PD Improved Community Trust with Fair Facial Recognition",
      excerpt: "A deep dive into our partnership with law enforcement and the measurable improvements in accuracy and community relations.",
      date: "October 28, 2024",
      readTime: "5 min read"
    },
    {
      category: "Research",
      title: "Measuring Fairness: New Metrics for Evaluating AI Bias",
      excerpt: "Introducing our proprietary fairness evaluation framework and why traditional accuracy metrics aren't enough.",
      date: "October 15, 2024",
      readTime: "10 min read"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-card" aria-labelledby="blog-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block gradient-primary text-white font-semibold px-4 py-2 rounded-full mb-4 text-sm">
              INSIGHTS & INNOVATION
            </div>
            <h2 id="blog-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Latest from RekognizeAI
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed about the latest developments in fair AI, ethical policy, research breakthroughs, and real-world success stories.
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-card rounded-3xl overflow-hidden shadow-elegant hover:shadow-glow transition-smooth border border-border mb-12">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 p-12 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-20 h-20 text-secondary mx-auto mb-4" />
                  <div className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                    FEATURED
                  </div>
                  <div className="text-2xl font-bold">Latest Research</div>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {articles[0].category}
                </div>
                <h3 className="text-3xl font-bold mb-4">{articles[0].title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{articles[0].date}</span>
                  </div>
                  <span>•</span>
                  <span>{articles[0].readTime}</span>
                </div>
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {articles.slice(1).map((article, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-smooth border border-border group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-secondary transition-smooth">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center text-secondary font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 text-primary-foreground shadow-glow text-center">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated on Fair AI
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest research, insights, and updates on ethical facial recognition technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button
                className="bg-white text-primary hover:bg-primary-foreground font-semibold"
                size="lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogInsights;
