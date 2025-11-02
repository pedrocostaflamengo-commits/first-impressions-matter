import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BirthYearConfirmation() {
  const navigate = useNavigate();
  const [birthYear, setBirthYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("birthYear", birthYear);
    navigate("/resultado");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center space-y-6 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10">
            <Shield className="w-8 h-8 text-secondary" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground">
            Confirmação de Identidade
          </h1>
          
          <p className="text-muted-foreground">
            Para confirmar sua identidade, por favor informe seu ano de nascimento
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 space-y-6 border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="birthYear" className="text-base font-semibold">
                Ano de nascimento (4 dígitos)
              </Label>
              <Input
                id="birthYear"
                type="text"
                placeholder="1989"
                value={birthYear}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) {
                    setBirthYear(value);
                  }
                }}
                required
                maxLength={4}
                className="h-14 text-center text-2xl font-bold"
              />
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary-hover transition-all duration-300"
              disabled={birthYear.length !== 4}
            >
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
