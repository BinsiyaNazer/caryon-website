import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
}

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("id, title, description, image_url").order("display_order");
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();

    const channel = supabase
      .channel("products-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <section id="products" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology products designed for modern education and enterprise environments.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground text-lg">No products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(product)}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 overflow-hidden bg-muted">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package size={40} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{product.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{product.description || "No description"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selected?.title}</DialogTitle>
          </DialogHeader>
          <AnimatePresence>
            {selected && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                {selected.image_url && (
                  <div className="rounded-lg overflow-hidden">
                    <img src={selected.image_url} alt={selected.title} className="w-full h-auto max-h-[400px] object-cover" />
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed">{selected.description || "No description available."}</p>
                <a href="#contact" onClick={() => setSelected(null)} className="inline-block bg-gradient-orange text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                  Book a Demo
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsSection;
