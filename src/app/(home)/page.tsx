import HeroSection from "@/components/home/hero-section";
import FeatureSection from "@/components/home/feature-section";
import CategorySection from "@/components/home/categories-section";
import ProductsSection from "@/components/home/products-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/organisms/footer";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <CategorySection />
      <ProductsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
