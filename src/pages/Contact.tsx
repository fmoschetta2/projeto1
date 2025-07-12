
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Phone, Mail, Clock, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    device: "",
    problem: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Olá! Gostaria de agendar um atendimento:

👤 Nome: ${formData.name}
📞 Telefone: ${formData.phone}
📧 Email: ${formData.email}
📱 Aparelho: ${formData.device}
🔧 Problema: ${formData.problem}

Mensagem: ${formData.message}

Quando posso levar meu aparelho?`;

    const phoneNumber = "5511999999999";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("Redirecionando para WhatsApp!");
  };

  const handleDirectContact = (type: 'whatsapp' | 'phone') => {
    if (type === 'whatsapp') {
      const message = "Olá! Gostaria de mais informações sobre os serviços de reparo.";
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      window.location.href = "tel:+5511999999999";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Agende seu atendimento ou tire suas dúvidas conosco
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Agendar Atendimento</CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário e entraremos em contato rapidamente
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="device">Modelo do Aparelho</Label>
                      <Input
                        id="device"
                        type="text"
                        value={formData.device}
                        onChange={(e) => handleInputChange('device', e.target.value)}
                        placeholder="Ex: iPhone 11, Galaxy S21..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="problem">Tipo de Problema</Label>
                      <Select value={formData.problem} onValueChange={(value) => handleInputChange('problem', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o problema..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tela-quebrada">Tela quebrada</SelectItem>
                          <SelectItem value="bateria">Problema de bateria</SelectItem>
                          <SelectItem value="carregador">Conector de carga</SelectItem>
                          <SelectItem value="audio">Problemas de som</SelectItem>
                          <SelectItem value="camera">Câmera não funciona</SelectItem>
                          <SelectItem value="agua">Caiu na água</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Descreva o Problema</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Descreva detalhadamente o que aconteceu com seu aparelho..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Enviar via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contato Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handleDirectContact('whatsapp')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => handleDirectContact('phone')}
                  variant="outline"
                  className="w-full"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      Rua das Palmeiras, 123<br />
                      Centro - São Paulo, SP
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Funcionamento</p>
                    <p className="text-sm text-muted-foreground">
                      Seg-Sex: 08:00 - 18:00<br />
                      Sáb: 08:00 - 14:00<br />
                      Dom: Fechado
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">
                      (11) 99999-9999
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      contato@dextercell.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempo de Resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WhatsApp</span>
                    <span className="text-sm font-medium text-green-600">Imediato</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Telefone</span>
                    <span className="text-sm font-medium text-blue-600">Imediato</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email</span>
                    <span className="text-sm font-medium text-orange-600">Até 2h</span>
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

export default Contact;
