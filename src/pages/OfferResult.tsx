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
        {/* Problem Discovery - More Prominent */}
        <div className="bg-destructive/10 border-2 border-destructive rounded-2xl shadow-xl p-6 md:p-8 space-y-4 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-destructive/20 rounded-full">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-destructive mb-3">
                {userName}, Encontramos registros no CPF {userCpf} que estão negativando seu nome!
              </h2>
              <p className="text-base md:text-lg text-foreground">
                Seu CPF está impedido de fazer financiamentos, parcelamentos e pegar crédito. 
                Mas você pode resolver isso{" "}
                <span className="font-bold text-destructive text-xl md:text-2xl">AGORA com 90% de desconto.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits - Green Themed Solution */}
        <div className="bg-success/5 border-2 border-success/30 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-slide-up">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">Agora você pode:</h3>
          
          <div className="grid gap-4 md:gap-5">
            {[
              { icon: CheckCircle2, text: "Negociar todas as suas dívidas com 90% de desconto" },
              { icon: Clock, text: "Voltar a ter crédito em até 72h" },
              { icon: Zap, text: "Eliminar restrições no seu CPF automaticamente" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-success/10 rounded-lg border-2 border-success/30">
                <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-success flex-shrink-0 mt-0.5 md:mt-1" />
                <p className="text-base md:text-lg text-foreground font-semibold">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="animate-slide-up">
          <Testimonials />
        </div>

        {/* Urgent Offer */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border-2 border-primary animate-slide-up">
          <div className="text-center space-y-4">
            <div className="inline-block px-5 py-2 bg-warning rounded-full">
              <p className="text-sm md:text-base font-bold text-foreground">🎯 Oferta SOMENTE em Novembro</p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {userName}, sua oferta foi liberada com desconto especial!
            </h3>
            
            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
              <span className="text-xl md:text-2xl text-muted-foreground line-through">R$ 89,90</span>
              <span className="text-5xl md:text-6xl font-bold text-primary">R$ 39,90</span>
            </div>
            
            <p className="text-lg md:text-xl font-bold text-destructive bg-destructive/10 py-3 px-4 rounded-lg border border-destructive/30">
              Somente para pagamentos feitos em até 1 hora
            </p>
            
            <div className="flex justify-center">
              <CountdownTimer initialMinutes={60} />
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => navigate("/contato-whatsapp")}
            className="w-full h-16 md:h-20 text-xl md:text-2xl font-bold bg-primary hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse-subtle"
          >
            Limpar meu nome agora por R$ 39,90!!!
          </Button>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4">
            <TrustBadge variant="security" text="Pagamento seguro" />
            <TrustBadge variant="verified" text="Confirmação automática" />
            <TrustBadge variant="guarantee" text="Garantia" />
          </div>
        </div>

        {/* Testimonials with Ratings */}
        <div className="animate-slide-up">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              O que nossos clientes dizem
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl md:text-5xl font-bold text-primary">4.9</span>
              <div>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-warning text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">(4.667 avaliações)</p>
              </div>
            </div>
          </div>
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
