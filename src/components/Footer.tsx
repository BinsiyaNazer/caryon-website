import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/caryon-logo.jpg";
import instagramIcon from "@/assets/instagram-icon.png";

const INSTAGRAM_URL = "https://www.instagram.com/caryontechnologies/";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="bg-dark-section text-primary-foreground/70 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Caryon Technologies LLP" className="h-10 rounded-md" />
              <span className="font-display font-bold text-primary-foreground">Caryon Technologies LLP</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Smart classroom & interactive display solutions across Kerala.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center hover:scale-110 hover:opacity-90 transition-transform duration-300"
            >
              <img src={instagramIcon} alt="Instagram" className="w-9 h-9 rounded-lg" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => smoothScroll(e, l.href)} className="hover:text-primary-foreground transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              {["Interactive Panels", "Smart Projectors", "LED Video Walls", "Digital Signage", "PA Systems", "Video Conferencing"].map((l) => (
                <li key={l}>
                  <a href="#products" onClick={(e) => smoothScroll(e, "#products")} className="hover:text-primary-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm">
              <a href="tel:+919746462846" className="flex items-center gap-2 hover:text-primary-foreground transition-colors"><Phone size={14} /> +91 9746462846</a>
              <a href="tel:+919746466846" className="flex items-center gap-2 hover:text-primary-foreground transition-colors"><Phone size={14} /> +91 9746466846</a>
              <a href="mailto:caryontechnologiesllp@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors break-all"><Mail size={14} /> caryontechnologiesllp@gmail.com</a>
              <div className="flex items-start gap-2 pt-1"><MapPin size={14} className="mt-0.5 flex-shrink-0" /> Calicut, Kerala 673001, India</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Caryon Technologies LLP. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
