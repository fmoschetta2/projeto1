
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Battery, Cable, Volume2, Camera, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const repairTypes = [
  {
    icon: Smartphone,
    title: "Tela Quebrada",
    description: "Conserto de display, touch e vidro protetor",
    price: "A partir de R$ 150",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Battery,
    title: "Bateria Viciada",
    description: "Substituição de bateria com garantia",
    price: "A partir de R$ 80",
    color: "text-green-600",
    bg: "bg-green-50"
  },
  {
    icon: Cable,
    title: "Conector de Carga",
    description: "Reparo do conector USB/Lightning",
    price: "A partir de R$ 120",
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    icon: Volume2,
    title: "Problemas de Som",
    description: "Alto-falante, microfone e fones",
    price: "A partir de R$ 90",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: Camera,
    title: "Câmera",
    description: "Reparo de câmera frontal e traseira",
    price: "A partir de R$ 180",
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    icon: Wifi,
    title: "Problemas de Rede",
    description: "WiFi, Bluetooth e dados móveis",
    price: "A partir de R$ 200",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  }
];

export const RepairTypes = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tipos de Reparo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Especializamos nos principais problemas de smartphones. 
            Veja nossos serviços mais solicitados:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {repairTypes.map((repair, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className={`${repair.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <repair.icon className={`h-8 w-8 ${repair.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold">
                  {repair.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {repair.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold text-primary mb-4">
                  {repair.price}
                </p>
                <Link to="/quote-simulator">
                  <Button variant="outline" className="w-full">
                    Fazer Orçamento
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/quote-simulator">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4">
              Simular Orçamento Completo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
