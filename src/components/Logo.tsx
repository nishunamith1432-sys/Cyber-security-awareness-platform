import { ShieldCheck } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = {
    sm: { box: 'w-8 h-8', icon: 18, text: 'text-lg' },
    md: { box: 'w-10 h-10', icon: 22, text: 'text-xl' },
    lg: { box: 'w-14 h-14', icon: 30, text: 'text-2xl' },
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${dims.box} rounded-xl bg-gradient-to-br from-cyber-500 to-cyber-700 flex items-center justify-center glow`}>
        <ShieldCheck size={dims.icon} className="text-ink-950" strokeWidth={2.5} />
      </div>
      <div className="leading-none">
        <span className={`font-display font-bold ${dims.text} text-white tracking-tight`}>C4G</span>
      </div>
    </div>
  );
}
