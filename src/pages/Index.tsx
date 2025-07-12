
import { Hero } from "@/components/sections/Hero";
import { RepairTypes } from "@/components/sections/RepairTypes";
import { QuickStats } from "@/components/sections/QuickStats";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <QuickStats />
      <RepairTypes />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
