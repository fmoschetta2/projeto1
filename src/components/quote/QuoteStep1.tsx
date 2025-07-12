
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Search } from "lucide-react";
import { DeviceModel } from "@/types/quote";

interface QuoteStep1Props {
  onNext: (data: { deviceModel: string }) => void;
  initialValue: string;
}

const deviceModels: DeviceModel[] = [
  // iPhone (baseado na planilha)
  { id: "iphone-7", brand: "Apple", model: "iPhone 7", category: "iphone" },
  { id: "iphone-7-plus", brand: "Apple", model: "iPhone 7 Plus", category: "iphone" },
  { id: "iphone-8", brand: "Apple", model: "iPhone 8", category: "iphone" },
  { id: "iphone-8-plus", brand: "Apple", model: "iPhone 8 Plus", category: "iphone" },
  { id: "iphone-x", brand: "Apple", model: "iPhone X", category: "iphone" },
  { id: "iphone-xs", brand: "Apple", model: "iPhone XS", category: "iphone" },
  { id: "iphone-xr", brand: "Apple", model: "iPhone XR", category: "iphone" },
  { id: "iphone-xs-max", brand: "Apple", model: "iPhone XS Max", category: "iphone" },
  { id: "iphone-11", brand: "Apple", model: "iPhone 11", category: "iphone" },
  { id: "iphone-11-pro", brand: "Apple", model: "iPhone 11 Pro", category: "iphone" },
  { id: "iphone-11-pro-max", brand: "Apple", model: "iPhone 11 Pro Max", category: "iphone" },
  { id: "iphone-12", brand: "Apple", model: "iPhone 12", category: "iphone" },
  { id: "iphone-12-pro", brand: "Apple", model: "iPhone 12 Pro", category: "iphone" },
  { id: "iphone-12-pro-max", brand: "Apple", model: "iPhone 12 Pro Max", category: "iphone" },
  { id: "iphone-13", brand: "Apple", model: "iPhone 13", category: "iphone" },
  { id: "iphone-13-pro", brand: "Apple", model: "iPhone 13 Pro", category: "iphone" },
  { id: "iphone-13-pro-max", brand: "Apple", model: "iPhone 13 Pro Max", category: "iphone" },
  { id: "iphone-14", brand: "Apple", model: "iPhone 14", category: "iphone" },
  { id: "iphone-14-plus", brand: "Apple", model: "iPhone 14 Plus", category: "iphone" },
  { id: "iphone-14-pro", brand: "Apple", model: "iPhone 14 Pro", category: "iphone" },
  { id: "iphone-14-pro-max", brand: "Apple", model: "iPhone 14 Pro Max", category: "iphone" },
  { id: "iphone-15", brand: "Apple", model: "iPhone 15", category: "iphone" },
  { id: "iphone-15-pro", brand: "Apple", model: "iPhone 15 Pro", category: "iphone" },
  { id: "iphone-15-pro-max", brand: "Apple", model: "iPhone 15 Pro Max", category: "iphone" },
  
  // Samsung populares
  { id: "samsung-s21", brand: "Samsung", model: "Galaxy S21", category: "samsung" },
  { id: "samsung-s22", brand: "Samsung", model: "Galaxy S22", category: "samsung" },
  { id: "samsung-s23", brand: "Samsung", model: "Galaxy S23", category: "samsung" },
  { id: "samsung-s24", brand: "Samsung", model: "Galaxy S24", category: "samsung" },
  { id: "samsung-a54", brand: "Samsung", model: "Galaxy A54", category: "samsung" },
  { id: "samsung-a34", brand: "Samsung", model: "Galaxy A34", category: "samsung" },
  
  // Motorola populares
  { id: "moto-g84", brand: "Motorola", model: "Moto G84", category: "motorola" },
  { id: "moto-edge40", brand: "Motorola", model: "Edge 40", category: "motorola" },
  { id: "moto-g60", brand: "Motorola", model: "Moto G60", category: "motorola" },
  
  // Xiaomi populares
  { id: "xiaomi-13", brand: "Xiaomi", model: "Redmi Note 13", category: "xiaomi" },
  { id: "xiaomi-12", brand: "Xiaomi", model: "Redmi Note 12", category: "xiaomi" },
];

export const QuoteStep1 = ({ onNext, initialValue }: QuoteStep1Props) => {
  const [selectedModel, setSelectedModel] = useState(initialValue);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = deviceModels.filter(device =>
    device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (selectedModel) {
      onNext({ deviceModel: selectedModel });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Qual o modelo do seu celular?
        </h2>
        <p className="text-muted-foreground">
          Selecione o modelo exato para um orçamento mais preciso
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Pesquisar modelo
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Digite o modelo do seu celular..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="model-select" className="text-sm font-medium">
            Ou selecione da lista
          </Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o modelo..." />
            </SelectTrigger>
            <SelectContent>
              {filteredModels.map((device) => (
                <SelectItem key={device.id} value={device.model}>
                  {device.brand} {device.model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!filteredModels.length && searchTerm && (
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              Modelo não encontrado? Não se preocupe! 
              <br />
              <span className="text-sm">Você pode continuar e descrever seu aparelho na próxima etapa.</span>
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setSelectedModel(searchTerm)}
            >
              Continuar com "{searchTerm}"
            </Button>
          </div>
        )}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedModel}
        className="w-full bg-primary hover:bg-primary/90 text-white"
        size="lg"
      >
        Continuar
      </Button>
    </div>
  );
};
