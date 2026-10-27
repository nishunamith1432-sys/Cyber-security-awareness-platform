import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

export function SectionHeader({ icon, title, subtitle, badge }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
      {badge && (
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium bg-cyber-500/10 text-cyber-300 border border-cyber-400/20">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
        {icon}
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-ink-400 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
}

export function PageHeader({ icon, title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-24 pb-8 text-center max-w-3xl mx-auto px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyber-500/10 border border-cyber-400/20 mb-4 animate-scale-in">
        {icon}
      </div>
      <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight animate-fade-in-up">
        {title}
      </h1>
      <p className="mt-4 text-ink-300 text-base sm:text-lg leading-relaxed animate-fade-in-up">
        {subtitle}
      </p>
    </div>
  );
}
