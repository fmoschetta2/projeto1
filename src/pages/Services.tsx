
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Battery, Cable, Volume2, Camera, Wifi, Clock, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const services = [
  {
    icon: Smartphone,
    title: "Reparo de Tela",
    description: "Substituição completa de display, touch e vidro protetor",
    features: ["Display LCD/OLED novo", "Touch responsivo", "Vidro temperado incluso"],
    priceRange: "A partir de R$ 150,00",
    timeEstimate: "2-4 horas",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Battery,
    title: "Troca de Bateria",
    description: "Substituição de bateria com garantia estendida",
    features: ["Baterias novas", "Teste de capacidade", "Calibração incluída"],
    priceRange: "A partir de R$ 80,00",
    timeEstimate: "1-2 horas",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Cable,
    title: "Conector de Carga",
    description: "Reparo ou substituição do conector USB/Lightning",
    features: ["Limpeza completa", "Teste de carregamento", "Verificação de contatos"],
    priceRange: "A partir de R$ 120,00",
    timeEstimate: "2-3 horas",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Volume2,
    title: "Sistema de Áudio",
    description: "Reparo de alto-falantes, microfone e entrada de fone",
    features: ["Limpeza de componentes", "Teste de qualidade", "Ajuste de volume"],
    priceRange: "A partir de R$ 90,00",
    timeEstimate: "1-3 horas",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Camera,
    title: "Câmera",
    description: "Reparo de câmera frontal, traseira e flash",
    features: ["Lentes novas", "Teste de foco", "Calibração de cores"],
    priceRange: "A partir de R$ 180,00",
    timeEstimate: "2-4 horas",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Wifi,
    title: "Conectividade",
    description: "Reparo de WiFi, Bluetooth e rede móvel",
    features: ["Diagnóstico completo", "Reparo de antenas", "Teste de sinal"],
    priceRange: "A partir de R$ 200,00",
    timeEstimate: "3-5 horas",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  }
];

const guarantees = [
  {
    icon: Shield,
    title: "90 Dias de Garantia",
    description: "Garantia estendida para todos os serviços"
  },
  {
    icon: Clock,
    title: "Reparo Rápido",
    description: "Maioria dos reparos em até 4 horas"
  },
  {
    icon: Star,
    title: "Peças Originais",
    description: "Utilizamos apenas peças de qualidade"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Especialistas em reparo de smartphones com garantia e qualidade
          </p>
          <Link to="/quote-simulator">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Fazer Orçamento Gratuito
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`${service.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="font-semibold text-primary">{service.priceRange}</p>
                      <p className="text-xs text-muted-foreground">{service.timeEstimate}</p>
                    </div>
                    <Link to="/quote-simulator">
                      <Button variant="outline" size="sm">
                        Orçar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Por que escolher a DexterCell?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos mais do que apenas reparo - garantimos qualidade e confiança
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <guarantee.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{guarantee.title}</h3>
                <p className="text-muted-foreground">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para consertar seu celular?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Faça seu orçamento online em menos de 2 minutos
          </p>
          <Link to="/quote-simulator">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Começar Orçamento Agora
            </Button>
          </Link>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Services;
