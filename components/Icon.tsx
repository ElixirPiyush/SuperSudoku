import {
  Sparkles,
  Gauge,
  WifiOff,
  Brain,
  Palette,
  Trophy,
  CalendarDays,
  BarChart3,
  Save,
  PencilLine,
  Lightbulb,
  Award,
  Gamepad2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Sparkles,
  Gauge,
  WifiOff,
  Brain,
  Palette,
  Trophy,
  CalendarDays,
  BarChart3,
  Save,
  PencilLine,
  Lightbulb,
  Award,
  Gamepad2,
  TrendingUp,
};

export default function Icon({
  name,
  className,
  size = 22,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp className={className} size={size} aria-hidden="true" />;
}
