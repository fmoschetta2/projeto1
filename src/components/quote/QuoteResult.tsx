
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Phone, Smartphone, Star } from "lucide-react";
import { QuoteData } from "@/types/quote";

interface QuoteResultProps {
  quoteData: QuoteData;
  onSchedule: () => void;
  onNewQuote: () => void;
}

export const QuoteResult = ({ quoteData, onSchedule, onNewQuote }: QuoteResultProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "5511999999999";
    let message = `Olá! Gostaria de agendar um reparo para meu ${quoteData.selectedModel?.name}.`;
    
    if (quoteData.useAI && quoteData.aiAnalysis) {
      message += `\n\nAnálise IA realizada:`;
      message += `\n• Problema principal: ${quoteData.aiAnalysis.primaryProblem.problemType}`;
      message += `\n• Cenário mais provável: ${formatPrice(quoteData.aiAnalysis.totalScenarios.mostLikely.totalPrice)}`;
      message += `\n• Probabilidade: ${quoteData.aiAnalysis.totalScenarios.mostLikely.probability}%`;
    } else {
      message += `\n\nProblemas: ${quoteData.selectedProblems.join(', ')}`;
      message += `\n\nValor estimado: ${formatPrice(quoteData.totalPrice)}`;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Orçamento Pronto!</h2>
        <p className="text-muted-foreground">
          Confira os detalhes do seu orçamento personalizado
        </p>
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {quoteData.selectedModel?.name}
          </CardTitle>
          <CardDescription>
            {quoteData.selectedModel?.brand} - Orçamento detalhado
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {quoteData.useAI && quoteData.aiAnalysis ? (
            // AI Analysis Result
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Análise Inteligente Realizada</h3>
                <div className="grid gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Cenário Mais Provável</span>
                        <Badge className="bg-green-100 text-green-800">
                          {quoteData.aiAnalysis.totalScenarios.mostLikely.probability}% certeza
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {quoteData.aiAnalysis.totalScenarios.mostLikely.problems.join(' + ')}
                      </p>
                      <p className="text-2xl font-bold text-green-700">
                        {formatPrice(quoteData.aiAnalysis.totalScenarios.mostLikely.totalPrice)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Cenário Alternativo</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {quoteData.aiAnalysis.totalScenarios.alternative.probability}% certeza
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {quoteData.aiAnalysis.totalScenarios.alternative.problems.join(' + ')}
                      </p>
                      <p className="text-xl font-bold text-yellow-700">
                        {formatPrice(quoteData.aiAnalysis.totalScenarios.alternative.totalPrice)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Recomendação do Especialista:</h4>
                <p className="text-sm text-blue-800">
                  {quoteData.aiAnalysis.recommendedAction}
                </p>
              </div>
            </div>
          ) : (
            // Manual Selection Result
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Problemas Selecionados</h3>
                <div className="space-y-2">
                  {quoteData.selectedProblems.map((problem, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span>{problem}</span>
                      <Badge variant="secondary">Incluído</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Valor Total Estimado</p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(quoteData.totalPrice)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Tempo médio</p>
                <p className="text-sm text-muted-foreground">30-60 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Garantia</p>
                <p className="text-sm text-muted-foreground">90 dias</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Localização</p>
                <p className="text-sm text-muted-foreground">Centro da cidade</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={handleWhatsAppContact} size="lg" className="bg-green-600 hover:bg-green-700">
          <Phone className="mr-2 h-4 w-4" />
          Agendar via WhatsApp
        </Button>
        <Button onClick={onSchedule} size="lg" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Online
        </Button>
      </div>

      <div className="text-center">
        <Button onClick={onNewQuote} variant="ghost">
          Fazer Novo Orçamento
        </Button>
      </div>
    </div>
  );
};
