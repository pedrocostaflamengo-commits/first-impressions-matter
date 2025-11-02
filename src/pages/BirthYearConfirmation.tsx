import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BirthYearConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Skip this page and go directly to result
    const userData = sessionStorage.getItem("userData");
    if (!userData) {
      navigate("/");
      return;
    }
    navigate("/resultado");
  }, [navigate]);

  return null;
}
