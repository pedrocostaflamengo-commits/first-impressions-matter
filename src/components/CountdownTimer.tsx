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
  const isUrgent = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={cn(
      "inline-flex items-center gap-3 px-6 py-4 rounded-xl",
      "bg-gradient-to-r font-bold text-lg transition-all duration-300",
      isUrgent 
        ? "from-destructive to-destructive/80 text-destructive-foreground animate-pulse-soft" 
        : "from-secondary to-secondary/80 text-secondary-foreground",
      className
    )}>
      <Clock className="w-5 h-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
