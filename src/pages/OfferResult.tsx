import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, CreditCard, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TrustBadge } from "@/components/TrustBadge";

export default function OfferResult() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    const birthYear = sessionStorage.getItem("birthYear");
    if (!userData || !birthYear) {
      navigate("/");
    }
  }, [navigate]);

  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const cpfMasked = userData.cpf?.replace(/(\d{3})\.\d{3}\.\d{3}-(\d{2})/, "$1.***.***-$2");

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Confirmation Header */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 animate-slide-up">
          <div className="flex items-center gap-3 text-secondary">
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-semibold">Dados confirmados para o CPF {cpfMasked}</p>
              <p className="text-sm">Nasc.: {sessionStorage.getItem("birthYear")}</p>
            </div>
          </div>
        </div>

        {/* Problem Discovery */}
        <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6 border-l-4 border-destructive animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Encontramos registros que podem estar negativando seu nome!
              </h2>
              <p className="text-lg text-muted-foreground">
                Você pode estar impedido de financiar, parcelar e pegar crédito. Mas isso pode ser resolvido{" "}
                <span className="font-bold text-primary">AGORA com até 90% de desconto.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6 border border-border animate-slide-up">
          <h3 className="text-2xl font-bold text-foreground">Agora você pode:</h3>
          
          <div className="grid gap-4">
            {[
              { icon: CheckCircle2, text: "Negociar todas as suas dívidas com até 90% de desconto" },
              { icon: CreditCard, text: "Parcelar com condições exclusivas" },
              { icon: Clock, text: "Voltar a ter crédito em até 72h" },
              { icon: Zap, text: "Eliminar restrições no seu CPF automaticamente" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
                <benefit.icon className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <p className="text-foreground font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Offer */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-xl p-8 space-y-6 border-2 border-primary animate-slide-up">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-warning rounded-full">
              <p className="text-sm font-bold text-foreground">🎯 Oferta de Lançamento - Novembro</p>
            </div>
            
            <h3 className="text-3xl font-bold text-foreground">
              Oferta liberada com desconto especial
            </h3>
            
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl text-muted-foreground line-through">R$ 89,90</span>
              <span className="text-5xl font-bold text-primary">R$ 39,90</span>
            </div>
            
            <p className="text-lg font-semibold text-destructive">
              Somente para pagamentos feitos em até 1 hora
            </p>
            
            <div className="flex justify-center">
              <CountdownTimer initialMinutes={60} />
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => navigate("/pagamento")}
            className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Quero limpar meu nome agora por R$ 39,90
          </Button>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <TrustBadge variant="security" text="Pagamento seguro" />
            <TrustBadge variant="verified" text="Confirmação automática" />
            <TrustBadge variant="guarantee" text="Garantia 100%" />
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center text-sm text-muted-foreground animate-slide-up">
          <p>✨ +10.000 pessoas já recuperaram seu crédito conosco</p>
        </div>
      </div>
    </div>
  );
}
