import { CategorySection } from "./components/moleculs/CategorySection";
import { CustomBouquet } from "./components/moleculs/CustomBuequaet";
import { HeroSection } from "./components/moleculs/HeroSection";
import { InstagramHighlights } from "./components/moleculs/InstagramHighlights";
import { ProductGrid } from "./components/moleculs/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <ProductGrid />
      <InstagramHighlights />
      <CustomBouquet />
    </div>
  );
}
