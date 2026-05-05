import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Ready to Upgrade Your Learning Experience?
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-10">
          Get in touch with our team and discover how Caryon Technologies can transform your institution.
        </p>
        <a href="#contact" className="inline-block bg-gradient-orange text-primary-foreground px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity glow-orange">
          Contact Us
        </a>
      </motion.div>
    </section>
  );
};

export default CTASection;
