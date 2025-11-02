import { useEffect, useState } from "react";
import { Search, Database, Shield, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingVerificationProps {
  onComplete: () => void;
}

const verificationSteps = [
  { icon: Search, text: "Consultando base de dados..." },
  { icon: Database, text: "Verificando registros ativos..." },
  { icon: Shield, text: "Confirmando informações de segurança..." },
  { icon: CheckCircle2, text: "Análise concluída!" },
];

export const LoadingVerification = ({ onComplete }: LoadingVerificationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const stepIndex = Math.floor(progress / 25);
    if (stepIndex < verificationSteps.length) {
      setCurrentStep(stepIndex);
    }
  }, [progress]);

  const CurrentIcon = verificationSteps[currentStep]?.icon || Search;

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-slide-up">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-soft" />
          <div className="relative bg-card p-8 rounded-full shadow-lg border-4 border-primary/20">
            <CurrentIcon className="w-16 h-16 text-primary animate-bounce-subtle" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Verificando suas informações
          </h3>
          <p className="text-muted-foreground animate-pulse-soft">
            {verificationSteps[currentStep]?.text}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Progress value={progress} className="h-3" />
        <p className="text-center text-sm font-medium text-primary">
          {progress}% concluído
        </p>
      </div>
    </div>
  );
};
