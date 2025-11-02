import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingVerification } from "@/components/LoadingVerification";

export default function Verification() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  const handleVerificationComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      navigate("/confirmacao");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <LoadingVerification onComplete={handleVerificationComplete} />
    </div>
  );
}
