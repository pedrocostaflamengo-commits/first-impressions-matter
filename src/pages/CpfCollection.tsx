import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrustBadge } from "@/components/TrustBadge";

export default function CpfCollection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store data in sessionStorage for the funnel
    sessionStorage.setItem("userData", JSON.stringify(formData));
    navigate("/verificacao");
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center space-y-6 mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Renegocie suas dívidas com{" "}
            <span className="text-primary">90% de desconto!</span>
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Consulte agora as condições especiais para limpar seu nome e voltar a ter crédito.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6 border border-border animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-base font-semibold">
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                required
                maxLength={14}
                className="h-12 text-base"
              />
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
            >
              Verificar agora (grátis)
            </Button>
          </form>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Lock className="w-5 h-5 flex-shrink-0 mt-0.5 text-secondary" />
              <p>
                Ao continuar, você autoriza a análise dos seus dados conforme nossa Política de Privacidade.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TrustBadge variant="security" text="Pagamento seguro" />
          <TrustBadge variant="verified" text="Dados protegidos" />
          <TrustBadge variant="guarantee" text="+10 mil atendidos" />
        </div>
      </div>
    </div>
  );
}
