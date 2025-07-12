export interface DeviceModel {
  id: string;
  name: string;
  brand: string;
  prices: {
    screen: number;
    battery: number;
    chargePort: number;
    backCover: number;
    speaker: number;
    camera: number;
    powerButton: number;
    volumeButton: number;
    frontCamera: number;
    motherboard: number;
  };
}

export interface ProblemAnalysis {
  problemType: string;
  description: string;
  probability: number;
  estimatedPrice: number;
  severity: 'low' | 'medium' | 'high';
}

export interface AIAnalysisResult {
  primaryProblem: ProblemAnalysis;
  alternativeScenarios: ProblemAnalysis[];
  confidence: number;
  recommendedAction: string;
  totalScenarios: {
    mostLikely: {
      problems: string[];
      totalPrice: number;
      probability: number;
    };
    alternative: {
      problems: string[];
      totalPrice: number;
      probability: number;
    };
  };
}

export interface QuoteData {
  step: number;
  selectedModel?: DeviceModel;
  selectedProblems: string[];
  photos: File[];
  description: string;
  useAI: boolean;
  aiAnalysis?: AIAnalysisResult;
  customerInfo?: {
    name: string;
    phone: string;
    email: string;
    preferredTime: string;
  };
  totalPrice: number;
}

export const DEVICE_MODELS: DeviceModel[] = [
  {
    id: "iphone-11",
    name: "iPhone 11",
    brand: "Apple",
    prices: {
      screen: 350,
      battery: 180,
      chargePort: 150,
      backCover: 250,
      speaker: 120,
      camera: 280,
      powerButton: 100,
      volumeButton: 100,
      frontCamera: 200,
      motherboard: 500,
    },
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    brand: "Apple",
    prices: {
      screen: 400,
      battery: 200,
      chargePort: 170,
      backCover: 280,
      speaker: 140,
      camera: 320,
      powerButton: 110,
      volumeButton: 110,
      frontCamera: 220,
      motherboard: 550,
    },
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    brand: "Apple",
    prices: {
      screen: 450,
      battery: 220,
      chargePort: 190,
      backCover: 300,
      speaker: 160,
      camera: 350,
      powerButton: 120,
      volumeButton: 120,
      frontCamera: 240,
      motherboard: 600,
    },
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    brand: "Apple",
    prices: {
      screen: 500,
      battery: 250,
      chargePort: 220,
      backCover: 330,
      speaker: 180,
      camera: 380,
      powerButton: 130,
      volumeButton: 130,
      frontCamera: 260,
      motherboard: 650,
    },
  },
  {
    id: "galaxy-s20",
    name: "Galaxy S20",
    brand: "Samsung",
    prices: {
      screen: 320,
      battery: 160,
      chargePort: 130,
      backCover: 220,
      speaker: 100,
      camera: 250,
      powerButton: 90,
      volumeButton: 90,
      frontCamera: 180,
      motherboard: 450,
    },
  },
  {
    id: "galaxy-s21",
    name: "Galaxy S21",
    brand: "Samsung",
    prices: {
      screen: 370,
      battery: 180,
      chargePort: 150,
      backCover: 250,
      speaker: 120,
      camera: 280,
      powerButton: 100,
      volumeButton: 100,
      frontCamera: 200,
      motherboard: 500,
    },
  },
  {
    id: "galaxy-s22",
    name: "Galaxy S22",
    brand: "Samsung",
    prices: {
      screen: 420,
      battery: 200,
      chargePort: 170,
      backCover: 280,
      speaker: 140,
      camera: 320,
      powerButton: 110,
      volumeButton: 110,
      frontCamera: 220,
      motherboard: 550,
    },
  },
  {
    id: "galaxy-s23",
    name: "Galaxy S23",
    brand: "Samsung",
    prices: {
      screen: 470,
      battery: 220,
      chargePort: 190,
      backCover: 300,
      speaker: 160,
      camera: 350,
      powerButton: 120,
      volumeButton: 120,
      frontCamera: 240,
      motherboard: 600,
    },
  },
];

export const REPAIR_TYPES = [
  "Tela Quebrada",
  "Bateria Viciada",
  "Conector de Carga",
  "Câmera",
  "Alto-Falante",
  "Microfone",
  "Botões (Power/Volume)",
  "Carcaça Traseira",
  "Problemas de Software",
  "Outros",
];
