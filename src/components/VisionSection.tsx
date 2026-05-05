import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const VisionSection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Life of Caryon</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Advanced AV, ICT, ELV & ITES solutions — purpose-built for education and corporate environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-8"
          >
            <div className="w-14 h-14 rounded-lg bg-gradient-orange flex items-center justify-center mb-6">
              <Eye className="text-primary-foreground" size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">Vision</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              To be a leading technology partner for institutions and enterprises across India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-8"
          >
            <div className="w-14 h-14 rounded-lg bg-gradient-orange flex items-center justify-center mb-6">
              <Target className="text-primary-foreground" size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">Mission</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Deliver innovative solutions that empower institutions with world-class learning experiences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
