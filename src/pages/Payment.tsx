import { useState } from "react";
import { Copy, QrCode, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";
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
  const [pixCopied, setPixCopied] = useState(false);
  const pixCode = "00020126330014BR.GOV.BCB.PIX0114+55119999999990204000053039865802BR5913NOME EMPRESA6009SAO PAULO62070503***63041D3D";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    toast.success("PIX copiado! Abra seu app e cole para pagar.", {
      duration: 3000,
    });
    setTimeout(() => setPixCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-warning rounded-full mb-2">
            <p className="text-sm font-bold text-foreground">🎯 Oferta Especial de Novembro</p>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground">
            Quase pronto — confirme seu pagamento
          </h1>
          
          <div className="flex items-center justify-center gap-4">
            <span className="text-xl text-muted-foreground line-through">R$ 89,90</span>
            <span className="text-5xl font-bold text-primary">R$ 39,90</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex justify-center animate-slide-up">
          <CountdownTimer initialMinutes={60} />
        </div>

        {/* PIX Payment Card */}
        <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6 border border-border animate-slide-up">
          {/* QR Code Placeholder */}
          <div className="bg-muted rounded-xl p-8 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-48 h-48 bg-card rounded-xl border-2 border-border">
                <QrCode className="w-32 h-32 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Escaneie o QR Code com seu app de pagamento</p>
            </div>
          </div>

          {/* PIX Copy-Paste */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground text-center">
              Ou copie o código PIX copia e cola:
            </p>
            
            <div className="flex gap-2">
              <div className="flex-1 bg-muted rounded-lg p-3 text-sm text-muted-foreground font-mono break-all">
                {pixCode.substring(0, 50)}...
              </div>
              <Button
                onClick={handleCopyPix}
                size="lg"
                className="bg-primary hover:bg-primary-hover font-bold whitespace-nowrap transition-all duration-300"
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
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
              <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Liberação automática</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
              <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Consulta imediata</p>
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

        {/* Action Buttons */}
        <div className="grid gap-3 animate-slide-up">
          <Button 
            size="lg"
            className="w-full h-14 font-bold bg-success hover:bg-success/90"
          >
            Já realizei o pagamento
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="w-full h-14 font-bold"
          >
            Preciso de ajuda
          </Button>
        </div>

        {/* Final Urgency */}
        <div className="text-center text-sm space-y-2 animate-slide-up">
          <p className="font-bold text-destructive">
            ⚠️ Última chance de garantir o desconto de R$ 50,00!
          </p>
          <p className="text-muted-foreground">
            Após o pagamento, sua consulta será liberada automaticamente em poucos minutos
          </p>
        </div>
      </div>
    </div>
  );
}
