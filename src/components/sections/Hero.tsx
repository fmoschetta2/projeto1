
import { Button } from "@/components/ui/button";
import { Smartphone, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <Smartphone className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          DexterCell
          <span className="block text-primary">Smart Quotes</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Faça seu orçamento online agora! Envie uma foto e veja o custo estimado 
          para reparos de tela, bateria e conectores em segundos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/quote-simulator">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg">
              <Zap className="mr-2 h-5 w-5" />
              Fazer Orçamento Online
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/services">
            <Button variant="outline" size="lg" className="font-semibold px-8 py-4 text-lg">
              Ver Serviços
            </Button>
          </Link>
        </div>

        <div className="bg-accent/20 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-sm font-medium text-foreground">
            💡 <strong>Dica:</strong> Tire uma foto do problema para um orçamento mais preciso!
          </p>
        </div>
      </div>
    </section>
  );
};
