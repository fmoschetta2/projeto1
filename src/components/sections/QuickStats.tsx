
import { Clock, Shield, Star, Users } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "30min",
    label: "Tempo médio de reparo"
  },
  {
    icon: Shield,
    value: "90 dias",
    label: "Garantia dos serviços"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Avaliação dos clientes"
  },
  {
    icon: Users,
    value: "2000+",
    label: "Celulares reparados"
  }
];

export const QuickStats = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
