import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Anitha Kumari",
    role: "Principal, St. Mary's School",
    text: "Caryon transformed our classrooms with their smart panels. The students are more engaged and our teachers love the ease of use. Truly a game-changer for our institution.",
    rating: 5,
  },
  {
    name: "Prof. Rajesh Menon",
    role: "Director, KCT Engineering College",
    text: "Their AV solutions and support are outstanding. We've equipped 200+ classrooms and the ROI has been phenomenal. Highly recommend Caryon Technologies.",
    rating: 5,
  },
  {
    name: "Smt. Lakshmi Nair",
    role: "Founder, Vidya International School",
    text: "From consultation to installation and training, the entire experience was seamless. Caryon's team is professional, responsive, and truly understands education.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Partners Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading educational institutions across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 text-primary/15" size={40} />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
