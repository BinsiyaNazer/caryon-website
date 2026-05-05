import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import VisionSection from "@/components/VisionSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import InstagramSection from "@/components/InstagramSection";

import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <VisionSection />
      <ServicesSection />
      <AboutSection />
      <FeaturedProductsSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <InstagramSection />

      <ContactSection />
      <CTASection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
