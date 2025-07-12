
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Camera, Upload, X } from "lucide-react";

interface QuoteStep3Props {
  onNext: (data: { description: string; photo: File | null }) => void;
  onBack: () => void;
  initialDescription: string;
  initialPhoto: File | null;
}

export const QuoteStep3 = ({ onNext, onBack, initialDescription, initialPhoto }: QuoteStep3Props) => {
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

  const handleNext = () => {
    onNext({ description, photo: selectedPhoto });
  };

  const handleSkip = () => {
    onNext({ description: "", photo: null });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="h-8 w-8 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Quer enviar uma foto do problema?
        </h2>
        <p className="text-muted-foreground">
          Uma foto nos ajuda a dar um orçamento mais preciso (opcional)
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="photo-upload" className="text-sm font-medium">
            Foto do problema
          </Label>
          <div className="mt-2">
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full max-w-xs mx-auto rounded-lg border"
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
                  Clique para selecionar uma foto
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
            Descreva o problema (opcional)
          </Label>
          <Textarea
            id="description"
            placeholder="Ex: A tela está completamente preta, mas o celular ainda vibra quando recebe chamadas..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-2"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Dica:</strong> Quanto mais detalhes você fornecer, mais preciso será o orçamento!
        </p>
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
        
        <Button
          onClick={handleSkip}
          variant="outline"
          className="flex-1"
        >
          Pular Etapa
        </Button>
        
        <Button
          onClick={handleNext}
          className="flex-1 bg-primary hover:bg-primary/90 text-white"
        >
          Ver Orçamento
        </Button>
      </div>
    </div>
  );
};
