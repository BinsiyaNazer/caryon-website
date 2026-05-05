import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  display_order: number | null;
}

const TrustSection = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data } = await supabase
        .from("brands")
        .select("id, name, logo_url, display_order")
        .order("display_order", { ascending: true });
      setBrands(data || []);
    };
    fetchBrands();

    const channel = supabase
      .channel("brands-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "brands" },
        () => fetchBrands()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (brands.length === 0) return null;

  // Duplicate list for seamless infinite scroll
  const loop = [...brands, ...brands];

  return (
    <section className="py-16 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Our Technology Partners
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            We collaborate with leading global technology brands.
          </p>
        </motion.div>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="marquee">
          {loop.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="group mx-3 md:mx-4 flex-shrink-0 w-40 md:w-52 h-28 md:h-32 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 px-4"
            >
              {brand.logo_url ? (
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-12 md:max-h-14 max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              ) : (
                <Building2 size={28} className="text-primary opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              )}
              <span className="text-xs md:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
