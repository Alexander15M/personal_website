import { ChartLine, Mic, PenLine, Puzzle, ShieldCheck, Sparkles, Store, type LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  mic: Mic,
  store: Store,
  'line-chart': ChartLine,
  shield: ShieldCheck,
  puzzle: Puzzle,
  pen: PenLine,
}

export const ICON_NAMES = Object.keys(ICONS)

export function ProjectIcon({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Sparkles
  return <Icon />
}
