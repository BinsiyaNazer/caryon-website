import { motion } from "framer-motion";
import { Monitor, Tv, LayoutPanelTop } from "lucide-react";

const featured = [
  {
    icon: Monitor,
    title: "Interactive Panels",
    description: "Touch-enabled smart displays with built-in collaboration tools for modern classrooms.",
  },
  {
    icon: Tv,
    title: "LED Display Walls",
    description: "Seamless high-brightness video walls for auditoriums, lobbies, and conference halls.",
  },
  {
    icon: LayoutPanelTop,
    title: "Digital Signage",
    description: "Centrally managed signage to broadcast announcements and branding across campuses.",
  },
];

const scrollToProducts = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
};

const FeaturedProductsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Best-selling solutions trusted across Kerala's institutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featured.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-orange flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <item.icon className="text-primary-foreground" size={26} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.description}</p>
              <a
                href="#products"
                onClick={scrollToProducts}
                className="inline-flex items-center text-primary font-semibold text-sm hover:underline"
              >
                View More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
