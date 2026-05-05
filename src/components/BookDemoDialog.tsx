import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookDemoDialogProps {
  children: React.ReactNode;
}

const BookDemoDialog = ({ children }: BookDemoDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", city: "", institute: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.city || !form.institute) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
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
    } else {
      toast({ title: "Demo request submitted! 🎉", description: "Our team will reach out shortly." });
      const msg = `New Demo Request:\nName: ${form.firstName} ${form.lastName}\nPhone: ${form.phone}\nCity: ${form.city}\nInstitute: ${form.institute}${form.message ? `\nInfo: ${form.message}` : ""}`;
      window.open(`https://wa.me/919746462846?text=${encodeURIComponent(msg)}`, "_blank");
      setOpen(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "", city: "", institute: "", message: "" });
    }
    setSubmitting(false);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">Book Your Demo</DialogTitle>
          <p className="text-muted-foreground text-sm">Fill the form and our team will reach out immediately.</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">First Name *</Label>
              <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Last Name *</Label>
              <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="bg-background border-border text-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Email ID *</Label>
              <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Phone Number *</Label>
              <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="bg-background border-border text-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">City *</Label>
              <Input value={form.city} onChange={(e) => update("city", e.target.value)} className="bg-background border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Institute Name *</Label>
              <Input value={form.institute} onChange={(e) => update("institute", e.target.value)} className="bg-background border-border text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Additional Information</Label>
            <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} className="bg-background border-border text-foreground" />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-orange text-primary-foreground py-3 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoDialog;
