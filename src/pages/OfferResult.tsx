import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TrustBadge } from "@/components/TrustBadge";
import { Testimonials } from "@/components/Testimonials";

export default function OfferResult() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userCpf, setUserCpf] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (!userData) {
      navigate("/");
      return;
    }
    const { name, cpf } = JSON.parse(userData);
    setUserName(name.split(" ")[0]);
    setUserCpf(cpf);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Confirmation Header */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 md:p-6 animate-slide-up">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-secondary">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-foreground mb-1">✅ Dados confirmados e encontrados diretamente pelo SERASA</p>
              <p className="text-sm">CPF: {userCpf}</p>
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
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {userName}, encontramos registros que estão negativando seu nome!
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Seu CPF está impedido de fazer financiamentos, parcelamentos e pegar crédito. 
                Mas você pode resolver isso{" "}
                <span className="font-bold text-primary">AGORA com até 90% de desconto.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-border animate-slide-up">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">{userName}, agora você pode:</h3>
          
          <div className="grid gap-3 md:gap-4">
            {[
              { icon: CheckCircle2, text: "Negociar todas as suas dívidas com até 90% de desconto" },
              { icon: Clock, text: "Voltar a ter crédito em até 72h" },
              { icon: Zap, text: "Eliminar restrições no seu CPF automaticamente" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
                <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-success flex-shrink-0 mt-0.5 md:mt-1" />
                <p className="text-sm md:text-base text-foreground font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="animate-slide-up">
          <Testimonials />
        </div>

        {/* Urgent Offer */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border-2 border-primary animate-slide-up">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-warning rounded-full">
              <p className="text-xs md:text-sm font-bold text-foreground">🎯 Oferta de Lançamento - Novembro</p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {userName}, sua oferta foi liberada com desconto especial!
            </h3>
            
            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
              <span className="text-xl md:text-2xl text-muted-foreground line-through">R$ 89,90</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">R$ 39,90</span>
            </div>
            
            <p className="text-base md:text-lg font-semibold text-destructive">
              Somente para pagamentos feitos em até 1 hora
            </p>
            
            <div className="flex justify-center">
              <CountdownTimer initialMinutes={60} />
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => navigate("/contato-whatsapp")}
            className="w-full h-14 md:h-16 text-lg md:text-xl font-bold bg-primary hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Limpar meu nome agora por R$ 39,90
          </Button>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4">
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
