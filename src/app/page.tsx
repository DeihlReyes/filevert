import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import HowItWorksSection from "@/components/sections/howitworks";
import FileTypesSection from "@/components/sections/filetypes";
import CallToActionSection from "@/components/sections/cta";
import TestimonialsSection from "@/components/sections/testimonials";
import BenefitsSection from "@/components/sections/benefits";
import FaqsSection from "@/components/sections/faqs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FileTypesSection />
      <BenefitsSection />
      <FaqsSection />
      <CallToActionSection />
      <TestimonialsSection />
    </div>
  );
}
