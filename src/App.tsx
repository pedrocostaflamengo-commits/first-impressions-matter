import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CpfCollection from "./pages/CpfCollection";
import Verification from "./pages/Verification";
import BirthYearConfirmation from "./pages/BirthYearConfirmation";
import OfferResult from "./pages/OfferResult";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CpfCollection />} />
          <Route path="/verificacao" element={<Verification />} />
          <Route path="/confirmacao" element={<BirthYearConfirmation />} />
          <Route path="/resultado" element={<OfferResult />} />
          <Route path="/pagamento" element={<Payment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
