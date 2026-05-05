import { motion } from "framer-motion";
import { Shield, Headphones, Settings, Award, Zap, Users } from "lucide-react";

const reasons = [
  { icon: Award, title: "Free Demo Across Kerala", description: "Get a free on-site demo anywhere in Kerala." },
  { icon: Headphones, title: "24/7 Support", description: "Quick assistance whenever you need." },
  { icon: Settings, title: "Expert Installation", description: "Professional setup with zero hassle." },
  { icon: Shield, title: "Proven Quality", description: "Trusted by schools & institutions." },
  { icon: Zap, title: "Quick Installation", description: "Fast deployment with minimal disruption." },
  { icon: Users, title: "Training Included", description: "Complete staff training provided." },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">Why Choose Caryon?</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Trusted partners for institutions across Kerala.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group glass rounded-xl p-7 hover:bg-primary-foreground/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/30 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <reason.icon className="text-primary-foreground" size={26} />
              </div>
              <h3 className="font-display text-base font-semibold text-primary-foreground mb-1.5">{reason.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
