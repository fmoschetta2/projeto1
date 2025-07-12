
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, Zap } from "lucide-react";
import { AIAnalysisResult, DeviceModel } from "@/types/quote";

interface AIAnalysisStepProps {
  photos: File[];
  description: string;
  selectedModel: DeviceModel;
  onAnalysisComplete: (analysis: AIAnalysisResult) => void;
  onBack: () => void;
}

export const AIAnalysisStep = ({ photos, description, selectedModel, onAnalysisComplete, onBack }: AIAnalysisStepProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with more sophisticated problem detection
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const symptoms = description.toLowerCase();
    const hasPhotos = photos.length > 0;
    
    let analysis: AIAnalysisResult;
    
    // Advanced symptom analysis with probabilities
    if (symptoms.includes('não liga') && symptoms.includes('não carrega')) {
      // Multiple potential problems
      analysis = {
        primaryProblem: {
          problemType: 'Bateria',
          description: 'Bateria não segura carga ou está viciada',
          probability: 95,
          estimatedPrice: selectedModel.prices.battery,
          severity: 'high'
        },
        alternativeScenarios: [
          {
            problemType: 'Conector de Carga',
            description: 'Possível problema no conector de carga',
            probability: 25,
            estimatedPrice: selectedModel.prices.chargePort,
            severity: 'medium'
          },
          {
            problemType: 'Botão Power',
            description: 'Botão power pode estar danificado',
            probability: 20,
            estimatedPrice: selectedModel.prices.powerButton,
            severity: 'low'
          }
        ],
        confidence: 85,
        recommendedAction: 'Avaliação presencial recomendada para diagnóstico preciso',
        totalScenarios: {
          mostLikely: {
            problems: ['Bateria'],
            totalPrice: selectedModel.prices.battery,
            probability: 95
          },
          alternative: {
            problems: ['Bateria', 'Botão Power'],
            totalPrice: selectedModel.prices.battery + selectedModel.prices.powerButton,
            probability: 20
          }
        }
      };
    } else if (symptoms.includes('tela quebrada') || symptoms.includes('display')) {
      analysis = {
        primaryProblem: {
          problemType: 'Tela',
          description: 'Display danificado precisa ser substituído',
          probability: 98,
          estimatedPrice: selectedModel.prices.screen,
          severity: 'high'
        },
        alternativeScenarios: [
          {
            problemType: 'Touch não funciona',
            description: 'Possível problema apenas no touch',
            probability: 15,
            estimatedPrice: selectedModel.prices.screen * 0.7,
            severity: 'medium'
          }
        ],
        confidence: 95,
        recommendedAction: 'Reparo da tela necessário',
        totalScenarios: {
          mostLikely: {
            problems: ['Tela'],
            totalPrice: selectedModel.prices.screen,
            probability: 98
          },
          alternative: {
            problems: ['Touch'],
            totalPrice: Math.round(selectedModel.prices.screen * 0.7),
            probability: 15
          }
        }
      };
    } else if (symptoms.includes('bateria') || symptoms.includes('carrega')) {
      analysis = {
        primaryProblem: {
          problemType: 'Bateria',
          description: 'Problema relacionado à bateria',
          probability: 90,
          estimatedPrice: selectedModel.prices.battery,
          severity: 'medium'
        },
        alternativeScenarios: [
          {
            problemType: 'Conector de Carga',
            description: 'Possível problema no conector',
            probability: 30,
            estimatedPrice: selectedModel.prices.chargePort,
            severity: 'medium'
          }
        ],
        confidence: 80,
        recommendedAction: 'Teste da bateria recomendado',
        totalScenarios: {
          mostLikely: {
            problems: ['Bateria'],
            totalPrice: selectedModel.prices.battery,
            probability: 90
          },
          alternative: {
            problems: ['Bateria', 'Conector de Carga'],
            totalPrice: selectedModel.prices.battery + selectedModel.prices.chargePort,
            probability: 30
          }
        }
      };
    } else {
      // Generic analysis for unclear symptoms
      analysis = {
        primaryProblem: {
          problemType: 'Diagnóstico Necessário',
          description: 'Múltiplos problemas possíveis identificados',
          probability: 60,
          estimatedPrice: 50, // Diagnostic fee
          severity: 'medium'
        },
        alternativeScenarios: [
          {
            problemType: 'Problema de Software',
            description: 'Possível solução via software',
            probability: 40,
            estimatedPrice: 80,
            severity: 'low'
          }
        ],
        confidence: 50,
        recommendedAction: 'Avaliação técnica presencial necessária',
        totalScenarios: {
          mostLikely: {
            problems: ['Diagnóstico'],
            totalPrice: 50,
            probability: 60
          },
          alternative: {
            problems: ['Software'],
            totalPrice: 80,
            probability: 40
          }
        }
      };
    }
    
    setAnalysisResult(analysis);
    setIsAnalyzing(false);
  };

  const handleAcceptAnalysis = () => {
    if (analysisResult) {
      onAnalysisComplete(analysisResult);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Análise Inteligente</h2>
        <p className="text-muted-foreground">
          Nossa IA está analisando o problema do seu {selectedModel.name}
        </p>
      </div>

      {!analysisResult && !isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Pronto para Análise
            </CardTitle>
            <CardDescription>
              Clique para iniciar a análise inteligente baseada na descrição e fotos enviadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Informações para análise:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Modelo:</strong> {selectedModel.name}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Descrição:</strong> {description}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Fotos:</strong> {photos.length} imagem(ns) anexada(s)
                </p>
              </div>
              <Button onClick={analyzeWithAI} className="w-full" size="lg">
                <Zap className="mr-2 h-4 w-4" />
                Iniciar Análise IA
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <h3 className="font-medium">Analisando...</h3>
              <p className="text-sm text-muted-foreground">
                Processando imagens e descrição do problema
              </p>
              <Progress value={75} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Análise Concluída
              </CardTitle>
              <CardDescription>
                Confiança da análise: {analysisResult.confidence}%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Primary Problem */}
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{analysisResult.primaryProblem.problemType}</h4>
                  <Badge variant="default">
                    {analysisResult.primaryProblem.probability}% provável
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {analysisResult.primaryProblem.description}
                </p>
                <p className="font-bold text-primary">
                  R$ {analysisResult.primaryProblem.estimatedPrice}
                </p>
              </div>

              {/* Scenarios */}
              <div>
                <h4 className="font-medium mb-3">Cenários Possíveis:</h4>
                
                <div className="space-y-3">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Cenário Mais Provável</span>
                        <Badge className="bg-green-100 text-green-800">
                          {analysisResult.totalScenarios.mostLikely.probability}%
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">
                        {analysisResult.totalScenarios.mostLikely.problems.join(' + ')}
                      </p>
                      <p className="font-bold text-green-700">
                        R$ {analysisResult.totalScenarios.mostLikely.totalPrice}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Cenário Alternativo</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {analysisResult.totalScenarios.alternative.probability}%
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">
                        {analysisResult.totalScenarios.alternative.problems.join(' + ')}
                      </p>
                      <p className="font-bold text-yellow-700">
                        R$ {analysisResult.totalScenarios.alternative.totalPrice}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Recomendação:</h4>
                    <p className="text-sm text-blue-800">
                      {analysisResult.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Voltar
            </Button>
            <Button onClick={handleAcceptAnalysis} className="flex-1">
              <Clock className="mr-2 h-4 w-4" />
              Agendar Avaliação
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
