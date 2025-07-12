
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Navigation, Car } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const Location = () => {
  const handleDirections = (app: 'google' | 'waze') => {
    const address = "Rua das Palmeiras, 123 - Centro, São Paulo - SP";
    const encodedAddress = encodeURIComponent(address);
    
    const urls = {
      google: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      waze: `https://waze.com/ul?q=${encodedAddress}`
    };
    
    window.open(urls[app], '_blank');
  };

  const handleCall = () => {
    window.location.href = "tel:+5511999999999";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossa Localização
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Venha nos visitar! Estamos localizados no centro da cidade com fácil acesso
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="order-2 lg:order-1">
            <Card className="h-96 lg:h-full">
              <CardContent className="p-0 h-full">
                <div className="bg-muted/30 h-full rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      Mapa Interativo
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Visualize nossa localização exata
                    </p>
                    <div className="space-x-2">
                      <Button
                        onClick={() => handleDirections('google')}
                        variant="outline"
                        size="sm"
                      >
                        Google Maps
                      </Button>
                      <Button
                        onClick={() => handleDirections('waze')}
                        variant="outline"
                        size="sm"
                      >
                        Waze
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Info */}
          <div className="order-1 lg:order-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Endereço</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">DexterCell - Assistência Técnica</p>
                <p className="text-muted-foreground">
                  Rua das Palmeiras, 123 - Centro<br />
                  São Paulo - SP, 01234-000
                </p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => handleDirections('google')}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Como Chegar
                  </Button>
                  <Button
                    onClick={() => handleDirections('waze')}
                    variant="outline"
                    size="sm"
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Waze
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Horário de Funcionamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span className="font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="font-medium">08:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-green-800">
                    ✅ <strong>Aberto agora!</strong> Fechamos às 18:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Contato Direto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-muted-foreground">(11) 99999-9999</p>
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-muted-foreground">(11) 99999-9999</p>
                </div>
                <Button
                  onClick={handleCall}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Estacionamento</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Acessível</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>WiFi Grátis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Sala de Espera</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Location;
