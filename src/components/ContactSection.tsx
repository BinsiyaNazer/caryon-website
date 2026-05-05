import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", city: "", institute: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.city || !form.institute) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      toast({ title: "Invalid phone number", description: "Please enter a valid 10-digit phone number.", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      institute: form.institute,
      message: form.message || null,
    });

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    toast({ title: "✅ Thank you! Redirecting to WhatsApp...", description: "Our team will reach out to you shortly." });
    const msg = `New Demo Request:\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nCity: ${form.city}\nInstitute: ${form.institute}${form.message ? `\nMessage: ${form.message}` : ""}`;
    setForm({ firstName: "", lastName: "", email: "", phone: "", city: "", institute: "", message: "" });
    setTimeout(() => {
      window.open(`https://wa.me/919746462846?text=${encodeURIComponent(msg)}`, "_blank");
    }, 800);
    setSubmitting(false);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Free Demo</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill the form and our team will reach out immediately.
          </p>
          <p className="text-primary text-sm font-semibold mt-2 animate-pulse">⚡ Limited slots available this month!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">First Name *</Label>
                <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="bg-muted border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Last Name *</Label>
                <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="bg-muted border-border text-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Email ID *</Label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-muted border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Phone Number *</Label>
                <Input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={15} value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/[^\d+\s-]/g, ""))} className="bg-muted border-border text-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">City *</Label>
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="bg-muted border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Institute Name *</Label>
                <Input value={form.institute} onChange={(e) => update("institute", e.target.value)} className="bg-muted border-border text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Additional Information</Label>
              <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} className="bg-muted border-border text-foreground" />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-orange text-primary-foreground py-3.5 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Demo Request"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Get in Touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Caryon Technologies LLP<br />
                62/1963/A8, Ground Floor,<br />
                Mukkam Muslim Orphanage Building,<br />
                YMCA Cross Road, Opposite IDBI Bank,<br />
                Calicut, Kerala 673001, India
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-3">Sales Enquiries</h4>
              <div className="space-y-3">
                <a href="tel:+919746462846" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm">
                  <Phone size={16} /> +91 9746462846
                </a>
                <a href="tel:+919746466846" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm">
                  <Phone size={16} /> +91 9746466846
                </a>
                <a href="mailto:caryontechnologiesllp@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm">
                  <Mail size={16} /> caryontechnologiesllp@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
