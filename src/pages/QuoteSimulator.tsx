
import { useState } from "react";
import { QuoteStep1 } from "@/components/quote/QuoteStep1";
import { QuoteStepAI } from "@/components/quote/QuoteStepAI";
import { AIAnalysisStep } from "@/components/quote/AIAnalysisStep";
import { QuoteStep2 } from "@/components/quote/QuoteStep2";
import { QuoteStep3 } from "@/components/quote/QuoteStep3";
import { QuoteResult } from "@/components/quote/QuoteResult";
import { QuoteData, AIAnalysis } from "@/types/quote";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const QuoteSimulator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    deviceModel: "",
    problems: [],
    description: "",
    photo: null,
    useAI: false
  });

  const handleStepComplete = (stepData: Partial<QuoteData>) => {
    setQuoteData(prev => ({ ...prev, ...stepData }));
    
    // Se escolheu usar IA, pular para análise
    if (stepData.useAI) {
      setCurrentStep(3); // Vai para AIAnalysisStep
    } else if (currentStep === 2 && !stepData.useAI) {
      setCurrentStep(4); // Pular análise IA e ir para seleção manual
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleAIAnalysisComplete = (analysis: AIAnalysis) => {
    setQuoteData(prev => ({ 
      ...prev, 
      aiAnalysis: analysis,
      problems: analysis.suggestedProblems 
    }));
    setCurrentStep(6); // Ir direto para resultado
  };

  const handleManualSelection = () => {
    setQuoteData(prev => ({ ...prev, useAI: false }));
    setCurrentStep(4); // Ir para seleção manual de problemas
  };

  const handleBack = () => {
    if (currentStep === 3 && quoteData.useAI) {
      // Voltando da análise IA para descrição
      setCurrentStep(2);
    } else if (currentStep === 4 && !quoteData.useAI) {
      // Voltando da seleção manual para descrição
      setCurrentStep(2);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuoteStep1
            onNext={handleStepComplete}
            initialValue={quoteData.deviceModel}
          />
        );
      case 2:
        return (
          <QuoteStepAI
            onNext={handleStepComplete}
            onBack={handleBack}
            onManualSelection={handleManualSelection}
            initialDescription={quoteData.description}
            initialPhoto={quoteData.photo}
          />
        );
      case 3:
        return (
          <AIAnalysisStep
            quoteData={quoteData}
            onNext={handleAIAnalysisComplete}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <QuoteStep2
            onNext={handleStepComplete}
            onBack={handleBack}
            initialProblems={quoteData.problems}
          />
        );
      case 5:
        return (
          <QuoteStep3
            onNext={handleStepComplete}
            onBack={handleBack}
            initialDescription={quoteData.description}
            initialPhoto={quoteData.photo}
          />
        );
      case 6:
        return (
          <QuoteResult
            quoteData={quoteData}
            onBack={handleBack}
            onRestart={() => {
              setCurrentStep(1);
              setQuoteData({
                deviceModel: "",
                problems: [],
                description: "",
                photo: null,
                useAI: false
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  const getStepCount = () => {
    if (quoteData.useAI) {
      return 4; // Modelo -> Descrição -> Análise IA -> Resultado
    }
    return 5; // Modelo -> Descrição -> Problemas -> Foto -> Resultado
  };

  const getCurrentStepForDisplay = () => {
    if (currentStep <= 2) return currentStep;
    if (quoteData.useAI) {
      if (currentStep === 3) return 3; // Análise IA
      if (currentStep === 6) return 4; // Resultado
    } else {
      if (currentStep === 4) return 3; // Seleção problemas
      if (currentStep === 5) return 4; // Foto
      if (currentStep === 6) return 5; // Resultado
    }
    return currentStep;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simulador de Orçamento
            </h1>
            <div className="flex justify-center items-center space-x-2 mb-6">
              {Array.from({ length: getStepCount() }, (_, i) => i + 1).map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === getCurrentStepForDisplay()
                      ? "bg-primary text-white"
                      : step < getCurrentStepForDisplay()
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < getCurrentStepForDisplay() ? "✓" : step}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {renderStep()}
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default QuoteSimulator;
