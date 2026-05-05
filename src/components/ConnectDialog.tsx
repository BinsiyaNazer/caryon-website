import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin } from "lucide-react";

interface ConnectDialogProps {
  children: React.ReactNode;
}

const ConnectDialog = ({ children }: ConnectDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">Get In Touch</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <p className="text-muted-foreground text-sm">Reach out to us through any of the following channels:</p>
          <div className="space-y-4">
            <a href="mailto:caryontechnologiesllp@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">caryontechnologiesllp@gmail.com</p>
              </div>
            </a>
            <a href="tel:+919746462846" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">+91 9746462846</p>
              </div>
            </a>
            <a href="tel:+919746466846" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">+91 9746466846</p>
              </div>
            </a>
            <div className="flex items-start gap-3 text-foreground">
              <div className="w-10 h-10 rounded-lg bg-gradient-orange flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium">Caryon Technologies LLP<br />62/1963/A8, Ground Floor, Mukkam Muslim Orphanage Building<br />YMCA Cross Road, Opp. IDBI Bank, Calicut, Kerala 673001</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectDialog;
