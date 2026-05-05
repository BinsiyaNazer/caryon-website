import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/caryontechnologies/";

const InstagramSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Follow Us on Instagram
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity glow-orange"
          >
            <Instagram size={18} /> View More on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
