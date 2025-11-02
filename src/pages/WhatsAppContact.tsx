import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function WhatsAppContact() {
  const navigate = useNavigate();
  const [whatsapp, setWhatsapp] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (!userData) {
      navigate("/");
      return;
    }
    const { name } = JSON.parse(userData);
    setUserName(name.split(" ")[0]);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("whatsapp", whatsapp);
    toast.success("Solicitação enviada! Redirecionando para o pagamento...", {
      duration: 2000,
    });
    setTimeout(() => {
      navigate("/pagamento");
    }, 2000);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-slide-up">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-2">
            <MessageCircle className="w-8 h-8 text-success" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Ótimo, {userName}! 🎉
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Para facilitar o atendimento e acompanhar seu processo de renegociação, 
            precisamos de um número de WhatsApp para contato.
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-left">
            <p className="text-sm text-foreground">
              <strong>Por que precisamos do seu WhatsApp?</strong>
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Confirmar o recebimento do pagamento</li>
              <li>• Enviar atualizações sobre sua renegociação</li>
              <li>• Oferecer suporte rápido se necessário</li>
            </ul>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-base font-semibold flex items-center gap-2">
                <Phone className="w-5 h-5 text-success" />
                Número do WhatsApp
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(00) 00000-0000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                required
                maxLength={15}
                className="h-14 text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Digite um número com WhatsApp ativo para receber atualizações
              </p>
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full h-14 text-lg font-bold bg-success hover:bg-success/90 transition-all duration-300 transform hover:scale-105"
              disabled={whatsapp.length < 14}
            >
              Continuar para o pagamento
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Seus dados estão protegidos e não serão compartilhados
          </p>
        </div>
      </div>
    </div>
  );
}
