import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingVerification } from "@/components/LoadingVerification";

export default function Verification() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se os dados do CPF e da data de nascimento existem
    const userData = sessionStorage.getItem("userData");
    const birthDate = sessionStorage.getItem("userBirthDate");
    if (!userData || !birthDate) {
      navigate("/");
    }
  }, [navigate]);

  const handleVerificationComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      // ALTERADO: Navega para a página de resultado
      navigate("/resultado");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <LoadingVerification onComplete={handleVerificationComplete} />
    </div>
  );
}
