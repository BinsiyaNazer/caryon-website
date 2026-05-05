import { motion } from "framer-motion";
import aboutImg from "@/assets/about-classroom.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={aboutImg}
              alt="Modern smart classroom"
              loading="lazy"
              width={800}
              height={600}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Transforming Education Through Technology
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Caryon Technologies LLP is a leading provider of smart classroom solutions and IT integration services. With a commitment to innovation and excellence, we empower educational institutions to deliver world-class learning experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of experts works closely with schools, colleges, and corporates to design and implement technology-driven environments that inspire collaboration, creativity, and growth. From interactive panels to AI-powered tools, we bring the future of education to your doorstep.
            </p>
            <a
              href="#products"
              onClick={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-block bg-gradient-orange text-primary-foreground px-8 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
