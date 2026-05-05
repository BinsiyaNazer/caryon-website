import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import heroDisplay from "@/assets/hero-display.jpg";
import BookDemoDialog from "@/components/BookDemoDialog";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Hero structure: Headline → Offer → Trust → Urgency → CTA

const smoothScroll = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    supabase.from("videos").select("video_url").eq("is_active", true).maybeSingle().then(({ data }) => {
      if (data) setActiveVideoUrl(data.video_url);
    });
  }, []);

  const getEmbedUrl = (url: string) => {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    return url;
  };

  return (
    <section id="home" className="relative bg-gradient-hero min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
        >
          Smart Classroom & <span className="text-gradient-blue">Interactive Display</span>
          <br className="hidden md:block" /> Solutions in Kerala
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-4"
        >
          Free Demo Available <span className="text-primary-foreground/40 mx-2">|</span> Installation & Support Across Kerala
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-primary-foreground/60 text-sm md:text-base mb-3"
        >
          Trusted by Schools & Institutions
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary text-sm md:text-base font-semibold mb-10 animate-pulse"
        >
          ⚡ Limited demo slots available this month
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center mb-16">
          <a href="#contact" onClick={smoothScroll("contact")} className="bg-gradient-orange text-primary-foreground px-12 py-4 rounded-full text-lg font-bold hover:opacity-95 transition-opacity animate-pulse-glow">
            Book a Free Demo
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="relative max-w-4xl mx-auto">
          <div className="relative rounded-lg overflow-hidden glow-blue">
            <img src={heroDisplay} alt="Interactive Smart Panel Display" width={1280} height={800} className="w-full h-auto" />
            {activeVideoUrl && (
              <button onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-orange flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="text-primary-foreground ml-1" size={32} fill="currentColor" />
                </div>
              </button>
            )}
          </div>
          <p className="text-primary-foreground/70 text-sm mt-4 font-medium">
            Empowering the Future of Learning with AI
          </p>
        </motion.div>
      </div>

      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          {activeVideoUrl && (
            activeVideoUrl.match(/youtube|youtu\.be|vimeo/) ? (
              <iframe src={getEmbedUrl(activeVideoUrl)} className="w-full aspect-video" allow="autoplay; fullscreen" allowFullScreen />
            ) : (
              <video src={activeVideoUrl} controls autoPlay className="w-full aspect-video" />
            )
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
