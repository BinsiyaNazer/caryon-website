import { motion } from "framer-motion";
import { MonitorSmartphone, Cpu, BrainCircuit, Server, Palette, Package, Check, ArrowRight } from "lucide-react";

const scrollToContact = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

const services = [
  {
    icon: MonitorSmartphone,
    title: "Smart Classroom Solutions",
    points: ["Interactive Panels", "Digital Teaching Tools", "Installation & Training"],
  },
  {
    icon: Cpu,
    title: "AV Solutions",
    points: ["LED Walls & Signage", "Conference Room Systems", "Integrated Display Networks"],
  },
  {
    icon: BrainCircuit,
    title: "Robotics & AI Learning",
    points: ["Hands-on Robotics Kits", "AI Curriculum Integration", "Innovation Labs"],
  },
  {
    icon: Server,
    title: "IT Integration Services",
    points: ["Networking & Servers", "Security & ERP Systems", "Cloud Infrastructure"],
  },
  {
    icon: Palette,
    title: "Content Creation Lab",
    points: ["Branding & Strategy", "Social Media Management", "Digital Marketing"],
  },
  {
    icon: Package,
    title: "Rental Services",
    points: ["Interactive Panels on Rent", "LED Screens & AV Systems", "Complete Setup Included"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">What We Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            End-to-end technology solutions tailored for schools, colleges, and corporates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group bg-card border border-border rounded-xl p-7 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="text-3xl font-display font-bold text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-16 h-16 rounded-xl bg-gradient-orange flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <service.icon className="text-primary-foreground" size={32} />
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <ul className="space-y-2 mb-5 flex-1">
                {service.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <Check className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all"
              >
                Learn More <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
