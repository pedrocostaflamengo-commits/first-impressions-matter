import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Lock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function BirthYearConfirmation() {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");
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
    sessionStorage.setItem("userBirthDate", birthDate);
    toast.success("Autenticado com sucesso!", {
      description: "Estamos verificando suas ofertas...",
      duration: 2000,
    });
    // Navega para a página de verificação (loading)
    navigate("/verificacao");
  };

  const formatBirthDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2");
    }
    return value.substring(0, 10);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-2">
            <UserCheck className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Olá, {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Para sua segurança, precisamos confirmar que você é você mesmo.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="birthDate"
                className="text-base font-semibold flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-secondary" />
                Digite sua data de nascimento
              </Label>
              <Input
                id="birthDate"
                type="tel"
                placeholder="DD/MM/AAAA"
                value={birthDate}
                onChange={(e) => setBirthDate(formatBirthDate(e.target.value))}
                required
                maxLength={10}
                className="h-14 text-lg"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
              disabled={birthDate.length < 10}
            >
              Autenticar e verificar
            </Button>
          </form>

          <div className="flex items-start gap-3 text-sm text-muted-foreground mt-6">
            <Lock className="w-5 h-5 flex-shrink-0 mt-0.5 text-secondary" />
            <p>
              Esta é uma etapa de segurança para proteger seus dados e garantir
              que apenas você tenha acesso às suas informações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
