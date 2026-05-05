import { useState, useEffect } from "react";
import { CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import whatsappIcon from "@/assets/whatsapp-icon.png";

const FloatingButtons = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBookDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <TooltipProvider delayDuration={200}>
      {/* WhatsApp FAB */}
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://wa.me/919746462846?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform animate-pulse-soft"
            aria-label="Chat with us on WhatsApp"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="w-9 h-9 object-contain" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">Chat with us on WhatsApp</TooltipContent>
      </Tooltip>

      {/* Sticky Book Demo */}
      <AnimatePresence>
        {showSticky && (
          <motion.a
            href="#contact"
            onClick={handleBookDemo}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50 bg-gradient-orange text-primary-foreground px-5 py-3 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2 hover:opacity-90 transition-opacity glow-orange"
          >
            <CalendarCheck size={18} /> Book Demo
          </motion.a>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default FloatingButtons;
