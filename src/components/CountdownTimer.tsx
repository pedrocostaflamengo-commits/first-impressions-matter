import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialMinutes?: number;
  onExpire?: () => void;
  className?: string;
}

export const CountdownTimer = ({ 
  initialMinutes = 60, 
  onExpire,
  className 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isUrgent = timeLeft < 300; // Menos de 5 minutos

  return (
    <div className={cn(
      "inline-flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg",
      "font-bold text-2xl transition-all duration-300 border-2",
      isUrgent 
        ? "bg-destructive/10 border-destructive text-destructive animate-pulse" 
        : "bg-background border-primary/20 text-primary",
      className
    )}>
      <Clock className="w-6 h-6" />
      <span className="font-mono tracking-widest">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
