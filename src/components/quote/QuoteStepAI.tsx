
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Camera, Upload, X, Bot, ArrowRight } from "lucide-react";

interface QuoteStepAIProps {
  onNext: (data: { description: string; photo: File | null; useAI: boolean }) => void;
  onBack: () => void;
  onManualSelection: () => void;
  initialDescription: string;
  initialPhoto: File | null;
}

export const QuoteStepAI = ({ 
  onNext, 
  onBack, 
  onManualSelection, 
  initialDescription, 
  initialPhoto 
}: QuoteStepAIProps) => {
  const [description, setDescription] = useState(initialDescription);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(initialPhoto);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialPhoto ? URL.createObjectURL(initialPhoto) : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAIAnalysis = () => {
    onNext({ description, photo: selectedPhoto, useAI: true });
  };

  const canProceedWithAI = description.trim().length > 10 || selectedPhoto;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Descreva o problema do seu celular
        </h2>
        <p className="text-muted-foreground">
          Nossa IA analisará sua descrição e foto para identificar o problema automaticamente
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="photo-upload" className="text-sm font-medium">
            Foto do problema (recomendado)
          </Label>
          <div className="mt-2">
            {photoPreview ? (
              <div className="relative max-w-sm mx-auto">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemovePhoto}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Clique para adicionar uma foto do problema
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG até 10MB
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Descreva o problema
          </Label>
          <Textarea
            id="description"
            placeholder="Ex: A tela está completamente preta, mas o celular ainda vibra quando recebe chamadas. Não consigo ver nada no display..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Mínimo 10 caracteres para análise por IA
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              💡 Análise Inteligente
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Nossa IA analisará sua foto e descrição para identificar automaticamente o problema e dar um orçamento preciso!
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleAIAnalysis}
          disabled={!canProceedWithAI}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          size="lg"
        >
          <Bot className="mr-2 h-5 w-5" />
          Analisar com IA
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted-foreground/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <Button
          onClick={onManualSelection}
          variant="outline"
          className="w-full"
          size="lg"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Eu sei qual é o problema
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    </div>
  );
};
