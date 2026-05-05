import { motion } from "framer-motion";

const WannaTalkSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Wanna Talk To Us?
          </h2>
          <p className="text-muted-foreground mb-8">
            Please feel free to contact us. We're super happy to talk to you. Feel free to ask anything.
          </p>
          <a
            href="#contact"
            className="inline-block bg-gradient-orange text-primary-foreground px-10 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity glow-orange"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WannaTalkSection;
