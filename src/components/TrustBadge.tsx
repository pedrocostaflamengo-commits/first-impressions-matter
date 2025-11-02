import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  variant?: "security" | "verified" | "guarantee";
  text: string;
  className?: string;
}

export const TrustBadge = ({ variant = "security", text, className }: TrustBadgeProps) => {
  const icons = {
    security: Lock,
    verified: CheckCircle2,
    guarantee: Shield,
  };

  const Icon = icons[variant];

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-secondary/10 border border-secondary/20",
      // ALTERADO: Adicionado md:text-base para proporção
      "text-sm md:text-base font-medium text-secondary",
      className
    )}>
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </div>
  );
};
