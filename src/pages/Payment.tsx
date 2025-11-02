import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, QrCode, CheckCircle2, HelpCircle, ChevronDown, AlertCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TrustBadge } from "@/components/TrustBadge";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Payment() {
  const navigate = useNavigate();
  const [pixCopied, setPixCopied] = useState(false);
  // Removemos os states que não serão mais usados dinamicamente
  // const [userName, setUserName] = useState("");
  // const [userCpf, setUserCpf] = useState("");
  // const [userWhatsApp, setUserWhatsApp] = useState("");
  const pixCode = "00020126330014BR.GOV.BCB.PIX0114+55119999999990204000053039865802BR5913NOME EMPRESA6009SAO PAULO62070503***63041D3D";

  useEffect(() => {
    // Verificação de segurança, mas não precisamos mais guardar os dados no estado
    const userData = sessionStorage.getItem("userData");
    const whatsapp = sessionStorage.getItem("whatsapp");
    if (!userData || !whatsapp) {
      navigate("/");
      return;
    }
    // const { name, cpf } = JSON.parse(userData);
    // setUserName(name);
    // setUserCpf(cpf);
    // setUserWhatsApp(whatsapp);
  }, [navigate]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    toast.success("PIX copiado! Abra seu app e cole para pagar.", {
      duration: 3000,
    });
    setTimeout(() => setPixCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-warning rounded-full mb-2">
            <p className="text-xs md:text-sm font-bold text-foreground">🎯 Oferta Especial de Novembro</p>
          </div>
          
          {/* Texto do Header Alterado */}
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            PEDRO, confirme as informações e
            <br />
            finalize o pagamento abaixo
          </h1>
          
          <div className="flex items-center justify-center">
            <span className="text-6xl md:text-7xl font-bold text-primary">R$ 39,90</span>
          </div>
        </div>

        {/* User Confirmation */}
        <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 border border-border animate-slide-up">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Confirme seus dados
          </h3>
          {/* Dados Estáticos Alterados */}
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-semibold text-foreground">PEDRO HENRIQUE COSTA SOUSA</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CPF:</span>
              <span className="font-semibold text-foreground">111.097.675-52</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">WhatsApp:</span>
              <span className="font-semibold text-foreground">(73) 99927-6645</span>
            </div>
            {/* Valor Removido */}
          </div>
          {/* Texto de Quitação Alterado */}
          <div className="mt-4 p-5 bg-success/10 rounded-lg border-2 border-success/30">
            <p className="text-lg md:text-xl text-foreground font-bold text-center">
              ✓ Todas as suas dívidas serão quitadas por este valor único
            </p>
          </div>
        </div>

        {/* Urgency Alert Alterado */}
        <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-6 md:p-8 animate-slide-up">
          <div className="text-center space-y-4">
            <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-destructive mx-auto" />
            <p className="font-bold text-destructive text-xl md:text-2xl">
              ⚠️ Última chance de garantir o desconto de R$ 50,00!
            </p>
            {/* Novo Texto de Oferta */}
            <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-warning/20 border-2 border-warning rounded-full">
               <Target className="w-6 h-6 text-foreground" />
               <p className="text-xl md:text-2xl font-bold text-foreground">
                 Oferta Especial de Novembro
               </p>
            </div>
          </div>
        </div>

        {/* PIX Payment Card */}
        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-border animate-slide-up">
          {/* QR Code Placeholder */}
          <div className="bg-muted rounded-xl p-6 md:p-8 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-card rounded-xl border-2 border-border">
                <QrCode className="w-28 h-28 md:w-32 md:h-32 text-muted-foreground" />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Escaneie o QR Code com seu app de pagamento</p>
            </div>
          </div>

          {/* PIX Copy-Paste */}
          <div className="space-y-3">
            <p className="text-sm md:text-base font-semibold text-foreground text-center">
              Ou copie o código PIX copia e cola:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 bg-muted rounded-lg p-3 text-xs md:text-sm text-muted-foreground font-mono break-all">
                {pixCode.substring(0, 50)}...
              </div>
              <Button
                onClick={handleCopyPix}
                size="lg"
                className="bg-primary hover:bg-primary-hover font-bold whitespace-nowrap transition-all duration-300 h-auto py-3"
              >
                {pixCopied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copiar PIX
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-border">
            <TrustBadge variant="security" text="Pagamento seguro" />
            <TrustBadge variant="verified" text="Confirmação automática" />
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4">
            <div className="text-center p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success mx-auto mb-2" />
              <p className="text-xs md:text-sm font-medium text-foreground">Liberação automática</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success mx-auto mb-2" />
              <p className="text-xs md:text-sm font-medium text-foreground">Consulta imediata</p>
            </div>
          </div>
        </div>

        {/* How to Pay Tutorial */}
        <Collapsible className="bg-card rounded-xl shadow-lg border border-border animate-slide-up">
          <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-xl">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Como pagar com PIX?</span>
            </div>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6 pb-6">
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Abra o app do seu banco</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Selecione a opção PIX</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Cole o código copiado ou escaneie o QR Code</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Confirme o pagamento de R$ 39,90</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">5.</span>
                <span>Pronto! A liberação é automática</span>
              </li>
            </ol>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Button */}
        <div className="animate-slide-up">
          <Button 
            size="lg"
            className="w-full h-14 md:h-16 text-lg md:text-xl font-bold bg-success hover:bg-success/90"
          >
            Já realizei o pagamento
          </Button>
        </div>
      </div>
    </div>
  );
}
