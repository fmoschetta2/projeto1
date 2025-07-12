
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Smartphone, Battery, Cable, Volume2, Camera, Wifi, Zap, AlertTriangle } from "lucide-react";
import { RepairProblem } from "@/types/quote";

interface QuoteStep2Props {
  onNext: (data: { problems: string[] }) => void;
  onBack: () => void;
  initialProblems: string[];
}

const repairProblems: RepairProblem[] = [
  {
    id: "broken-screen",
    name: "Tela quebrada ou trincada",
    description: "Display danificado, touch não funciona",
    basePrice: 200,
    icon: "smartphone"
  },
  {
    id: "battery-issue",
    name: "Bateria viciada",
    description: "Descarrega rápido, não segura carga",
    basePrice: 120,
    icon: "battery"
  },
  {
    id: "charging-port",
    name: "Conector de carga",
    description: "Não carrega, cabo não encaixa",
    basePrice: 150,
    icon: "cable"
  },
  {
    id: "audio-issues",
    name: "Problemas de som",
    description: "Não toca, microfone mudo",
    basePrice: 100,
    icon: "volume"
  },
  {
    id: "camera-broken",
    name: "Câmera não funciona",
    description: "Imagem borrada, não abre",
    basePrice: 180,
    icon: "camera"
  },
  {
    id: "network-issues",
    name: "Sem sinal ou WiFi",
    description: "Não pega rede, WiFi não conecta",
    basePrice: 200,
    icon: "wifi"
  },
  {
    id: "power-button",
    name: "Botão de ligar/desligar",
    description: "Não liga, botão travado",
    basePrice: 90,
    icon: "zap"
  },
  {
    id: "water-damage",
    name: "Molhou / Caiu na água",
    description: "Celular molhado, não liga",
    basePrice: 250,
    icon: "alert"
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "smartphone": return Smartphone;
    case "battery": return Battery;
    case "cable": return Cable;
    case "volume": return Volume2;
    case "camera": return Camera;
    case "wifi": return Wifi;
    case "zap": return Zap;
    case "alert": return AlertTriangle;
    default: return Smartphone;
  }
};

export const QuoteStep2 = ({ onNext, onBack, initialProblems }: QuoteStep2Props) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>(initialProblems);

  const handleProblemToggle = (problemId: string) => {
    setSelectedProblems(prev =>
      prev.includes(problemId)
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleNext = () => {
    if (selectedProblems.length > 0) {
      onNext({ problems: selectedProblems });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Qual é o problema?
        </h2>
        <p className="text-muted-foreground">
          Marque todos os problemas que você identificou
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repairProblems.map((problem) => {
          const IconComponent = getIcon(problem.icon);
          const isSelected = selectedProblems.includes(problem.id);
          
          return (
            <Card
              key={problem.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => handleProblemToggle(problem.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleProblemToggle(problem.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-sm">
                        {problem.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {problem.description}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      A partir de R$ {problem.basePrice}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedProblems.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✅ {selectedProblems.length} problema{selectedProblems.length > 1 ? 's' : ''} selecionado{selectedProblems.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="flex space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedProblems.length === 0}
          className="flex-1 bg-primary hover:bg-primary/90 text-white"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
