import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, LogOut, Upload, Eye, Search, Edit2, Save, Video, Star, Loader2, Package, Users, Phone, Mail, Building2, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
}

interface VideoItem {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  is_active: boolean;
}

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  institute: string;
  message: string | null;
  status: "new" | "contacted" | "converted";
  created_at: string;
}

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  display_order: number | null;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  contacted: "bg-yellow-500/20 text-yellow-400",
  converted: "bg-green-500/20 text-green-400",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ type: "product" | "video" | "lead" | "brand"; id: string; name: string } | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);

  // Brands state
  const [brandName, setBrandName] = useState("");
  const [brandLogoFile, setBrandLogoFile] = useState<File | null>(null);
  const [brandUploading, setBrandUploading] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [editBrandName, setEditBrandName] = useState("");

  const [activeTab, setActiveTab] = useState<"products" | "videos" | "leads" | "brands">("products");
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin-login"); return; }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (!data) { navigate("/admin-login"); return; }
      fetchAll();
    };
    check();
  }, [navigate]);

  const fetchAll = async () => {
    const [p, v, l, b] = await Promise.all([
      supabase.from("products").select("*").order("display_order"),
      supabase.from("videos").select("*").order("created_at", { ascending: false }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("brands").select("*").order("display_order", { ascending: true }),
    ]);
    setProducts(p.data || []);
    setVideos(v.data || []);
    setLeads((l.data as Lead[]) || []);
    setBrands((b.data as Brand[]) || []);
    setLoading(false);
  };

  // PRODUCT CRUD
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) { toast.error("Title and description are required"); return; }
    setUploading(true);
    let imageUrl: string | null = null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(path, imageFile);
      if (uploadError) { toast.error("Upload failed: " + uploadError.message); setUploading(false); return; }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    }
    const { error } = await supabase.from("products").insert({ title, description, image_url: imageUrl, display_order: products.length });
    if (error) toast.error("Failed: " + error.message);
    else { toast.success("Product added successfully!"); setTitle(""); setDescription(""); setImageFile(null); fetchAll(); }
    setUploading(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const table =
      deleteTarget.type === "product" ? "products" :
      deleteTarget.type === "video" ? "videos" :
      deleteTarget.type === "brand" ? "brands" :
      "leads";
    const { error } = await supabase.from(table).delete().eq("id", deleteTarget.id);
    if (error) toast.error(error.message);
    else { toast.success(`${deleteTarget.type} deleted`); fetchAll(); }
    setDeleteTarget(null);
  };

  // BRAND CRUD
  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) { toast.error("Brand name is required"); return; }
    setBrandUploading(true);
    let logoUrl: string | null = null;
    if (brandLogoFile) {
      const ext = brandLogoFile.name.split(".").pop();
      const path = `${Date.now()}-${brandName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("brand-logos").upload(path, brandLogoFile);
      if (uploadError) { toast.error("Upload failed: " + uploadError.message); setBrandUploading(false); return; }
      const { data: urlData } = supabase.storage.from("brand-logos").getPublicUrl(path);
      logoUrl = urlData.publicUrl;
    }
    const { error } = await supabase.from("brands").insert({ name: brandName.trim(), logo_url: logoUrl, display_order: brands.length + 1 });
    if (error) toast.error("Failed: " + error.message);
    else { toast.success("Brand added!"); setBrandName(""); setBrandLogoFile(null); fetchAll(); }
    setBrandUploading(false);
  };

  const handleUpdateBrandLogo = async (id: string, file: File, name: string) => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("brand-logos").upload(path, file);
    if (uploadError) { toast.error(uploadError.message); return; }
    const { data: urlData } = supabase.storage.from("brand-logos").getPublicUrl(path);
    const { error } = await supabase.from("brands").update({ logo_url: urlData.publicUrl }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Logo updated"); fetchAll(); }
  };

  const handleSaveBrandName = async () => {
    if (!editBrand) return;
    const { error } = await supabase.from("brands").update({ name: editBrandName }).eq("id", editBrand.id);
    if (error) toast.error(error.message);
    else { toast.success("Brand updated"); setEditBrand(null); fetchAll(); }
  };

  const handleUpdateProduct = async () => {
    if (!editProduct) return;
    const { error } = await supabase.from("products").update({ title: editTitle, description: editDesc }).eq("id", editProduct.id);
    if (error) toast.error(error.message);
    else { toast.success("Product updated"); setEditProduct(null); fetchAll(); }
  };

  const handleUpdateImage = async (id: string, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file);
    if (uploadError) { toast.error(uploadError.message); return; }
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
    const { error } = await supabase.from("products").update({ image_url: urlData.publicUrl }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Image updated"); fetchAll(); }
  };

  // VIDEO CRUD
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle) { toast.error("Video title is required"); return; }
    if (!videoUrl && !videoFile) { toast.error("Provide a video URL or upload a file"); return; }
    setVideoUploading(true);
    let finalUrl = videoUrl;
    if (videoFile) {
      const ext = videoFile.name.split(".").pop();
      const path = `videos/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(path, videoFile);
      if (uploadError) { toast.error(uploadError.message); setVideoUploading(false); return; }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      finalUrl = urlData.publicUrl;
    }
    const { error } = await supabase.from("videos").insert({ title: videoTitle, video_url: finalUrl });
    if (error) toast.error(error.message);
    else { toast.success("Video added!"); setVideoTitle(""); setVideoUrl(""); setVideoFile(null); fetchAll(); }
    setVideoUploading(false);
  };

  const handleSetActive = async (id: string) => {
    await supabase.from("videos").update({ is_active: false }).neq("id", "00000000-0000-0000-0000-000000000000");
    const { error } = await supabase.from("videos").update({ is_active: true }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Video set as active"); fetchAll(); }
  };

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status: status as "new" | "contacted" | "converted" }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Status updated"); fetchAll(); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin-login"); };

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const filteredLeads = leads
    .filter(l => leadFilter === "all" || l.status === leadFilter)
    .filter(l => `${l.first_name} ${l.last_name} ${l.email} ${l.institute}`.toLowerCase().includes(leadSearch.toLowerCase()));

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-6xl">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button variant={activeTab === "products" ? "default" : "outline"} onClick={() => setActiveTab("products")} className="gap-2">
            <Package size={16} /> Products
          </Button>
          <Button variant={activeTab === "videos" ? "default" : "outline"} onClick={() => setActiveTab("videos")} className="gap-2">
            <Video size={16} /> Videos
          </Button>
          <Button variant={activeTab === "leads" ? "default" : "outline"} onClick={() => setActiveTab("leads")} className="gap-2">
            <Users size={16} /> Leads ({leads.length})
          </Button>
          <Button variant={activeTab === "brands" ? "default" : "outline"} onClick={() => setActiveTab("brands")} className="gap-2">
            <Award size={16} /> Brands ({brands.length})
          </Button>
        </div>

        {/* ============ PRODUCTS TAB ============ */}
        {activeTab === "products" && (
          <>
            <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Plus size={20} /> Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Product Title *</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted border-border text-foreground" placeholder="e.g. Interactive Panel" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Product Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="bg-muted border-border text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Description *</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="bg-muted border-border text-foreground" placeholder="Product description..." />
                </div>
                <Button type="submit" disabled={uploading} className="gap-2">
                  {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Plus size={16} /> Add Product</>}
                </Button>
              </form>
            </div>

            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-10 bg-muted border-border text-foreground" />
            </div>

            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Products ({filteredProducts.length})</h2>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <Package className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 overflow-hidden bg-muted relative group">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Package size={32} /></div>
                      )}
                      <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Upload size={20} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpdateImage(product.id, file);
                        }} />
                      </label>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate">{product.title}</h3>
                      <p className="text-muted-foreground text-sm truncate mb-3">{product.description || "No description"}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => setViewProduct(product)}><Eye size={14} /> View</Button>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => { setEditProduct(product); setEditTitle(product.title); setEditDesc(product.description || ""); }}><Edit2 size={14} /> Edit</Button>
                        <Button size="sm" variant="destructive" className="gap-1" onClick={() => setDeleteTarget({ type: "product", id: product.id, name: product.title })}><Trash2 size={14} /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ============ VIDEOS TAB ============ */}
        {activeTab === "videos" && (
          <>
            <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Video size={20} /> Add New Video</h2>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Video Title *</Label>
                  <Input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="bg-muted border-border text-foreground" placeholder="e.g. Product Demo" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Video URL (YouTube/Vimeo)</Label>
                  <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="bg-muted border-border text-foreground" placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Or Upload Video File</Label>
                  <Input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="bg-muted border-border text-foreground" />
                </div>
                <Button type="submit" disabled={videoUploading} className="gap-2">
                  {videoUploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Plus size={16} /> Add Video</>}
                </Button>
              </form>
            </div>

            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Videos ({videos.length})</h2>
            {videos.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <Video className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No videos yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div key={video.id} className={`bg-card border rounded-xl p-4 flex items-center gap-4 transition-all ${video.is_active ? "border-primary shadow-md" : "border-border"}`}>
                    <Video size={24} className={video.is_active ? "text-primary" : "text-muted-foreground"} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {video.title}
                        {video.is_active && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Active</span>}
                      </h3>
                      <p className="text-muted-foreground text-sm truncate">{video.video_url}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!video.is_active && (
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => handleSetActive(video.id)}><Star size={14} /> Set Active</Button>
                      )}
                      <Button size="sm" variant="destructive" className="gap-1" onClick={() => setDeleteTarget({ type: "video", id: video.id, name: video.title })}><Trash2 size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ============ LEADS TAB ============ */}
        {activeTab === "leads" && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={leadSearch} onChange={(e) => setLeadSearch(e.target.value)} placeholder="Search leads..." className="pl-10 bg-muted border-border text-foreground" />
              </div>
              <Select value={leadFilter} onValueChange={setLeadFilter}>
                <SelectTrigger className="w-[160px] bg-muted border-border">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Demo Leads ({filteredLeads.length})</h2>
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <Users className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No leads yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{lead.first_name} {lead.last_name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[lead.status]}`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Mail size={13} /> {lead.email}</span>
                          <span className="flex items-center gap-1.5"><Phone size={13} /> {lead.phone}</span>
                          <span className="flex items-center gap-1.5"><Building2 size={13} /> {lead.institute}, {lead.city}</span>
                        </div>
                        {lead.message && <p className="text-muted-foreground text-sm mt-2 italic">"{lead.message}"</p>}
                        <p className="text-muted-foreground/60 text-xs mt-1">{new Date(lead.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Select value={lead.status} onValueChange={(v) => handleUpdateLeadStatus(lead.id, v)}>
                          <SelectTrigger className="w-[130px] bg-muted border-border text-sm h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="destructive" className="gap-1" onClick={() => setDeleteTarget({ type: "lead", id: lead.id, name: `${lead.first_name} ${lead.last_name}` })}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ============ BRANDS TAB ============ */}
        {activeTab === "brands" && (
          <>
            <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Plus size={20} /> Add New Brand</h2>
              <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Brand Name *</Label>
                    <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} className="bg-muted border-border text-foreground" placeholder="e.g. Samsung" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Brand Logo (PNG/SVG, transparent preferred)</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setBrandLogoFile(e.target.files?.[0] || null)} className="bg-muted border-border text-foreground" />
                  </div>
                </div>
                <Button type="submit" disabled={brandUploading} className="gap-2">
                  {brandUploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Plus size={16} /> Add Brand</>}
                </Button>
              </form>
            </div>

            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Brands ({brands.length})</h2>
            {brands.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-xl">
                <Award className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground">No brands yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {brands.map((brand) => (
                  <div key={brand.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-28 bg-muted relative group flex items-center justify-center p-3">
                      {brand.logo_url ? (
                        <img src={brand.logo_url} alt={brand.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <div className="text-muted-foreground text-sm font-semibold">{brand.name}</div>
                      )}
                      <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Upload size={20} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpdateBrandLogo(brand.id, file, brand.name);
                        }} />
                      </label>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground truncate text-sm mb-2">{brand.name}</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1 flex-1" onClick={() => { setEditBrand(brand); setEditBrandName(brand.name); }}>
                          <Edit2 size={14} /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1" onClick={() => setDeleteTarget({ type: "brand", id: brand.id, name: brand.name })}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.type}?</DialogTitle>
            <DialogDescription>Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Modal */}
      <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{viewProduct?.title}</DialogTitle>
          </DialogHeader>
          {viewProduct?.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img src={viewProduct.image_url} alt={viewProduct.title} className="w-full h-auto max-h-[400px] object-cover" />
            </div>
          )}
          <p className="text-muted-foreground leading-relaxed">{viewProduct?.description || "No description"}</p>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProduct(null)}>Cancel</Button>
            <Button onClick={handleUpdateProduct} className="gap-1"><Save size={14} /> Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Brand Modal */}
      <Dialog open={!!editBrand} onOpenChange={() => setEditBrand(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
            <DialogDescription>Update the brand name. Use the upload icon on the card to change the logo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Brand Name</Label>
              <Input value={editBrandName} onChange={(e) => setEditBrandName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditBrand(null)}>Cancel</Button>
            <Button onClick={handleSaveBrandName} className="gap-1"><Save size={14} /> Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
