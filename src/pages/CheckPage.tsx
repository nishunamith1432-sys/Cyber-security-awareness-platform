import { useState } from 'react';
import {
  Search,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Lightbulb,
  Info,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { checkInput, CHECK_EXAMPLES } from '@/data/checker';
import type { CheckResult } from '@/data/checker';

const RISK_CONFIG = {
  high: {
    label: 'HIGH',
    color: 'text-red-300',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: ShieldAlert,
    bar: 'bg-red-500',
  },
  medium: {
    label: 'MEDIUM',
    color: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
    bar: 'bg-amber-500',
  },
  low: {
    label: 'LOW',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: ShieldCheck,
    bar: 'bg-emerald-500',
  },
};

export function CheckPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const handleCheck = () => {
    if (!input.trim()) return;
    setResult(checkInput(input));
    setHasChecked(true);
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setHasChecked(false);
  };

  const loadExample = (text: string) => {
    setInput(text);
    setResult(null);
    setHasChecked(false);
  };

  const config = result ? RISK_CONFIG[result.level] : null;

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<Search className="text-cyber-300" size={32} />}
        title="Check Before You Trust"
        subtitle="Paste a suspicious message or link below for a preliminary awareness check. The tool identifies possible warning signs — it does not guarantee that anything is safe or fraudulent."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Input */}
        <div className="card p-6 animate-fade-in-up">
          <label className="block text-sm font-medium text-ink-200 mb-2">
            Paste a suspicious message or link
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Congratulations! You have won a ₹5,000 reward. Claim it now: http://bit.ly/claim-reward"
            rows={4}
            className="w-full rounded-xl bg-ink-900/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-ink-500 focus:border-cyber-400/50 focus:outline-none focus:ring-2 focus:ring-cyber-500/20 transition-all resize-y"
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button onClick={handleCheck} disabled={!input.trim()} className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
              <Search size={18} />
              Run Awareness Check
            </button>
            {hasChecked && (
              <button onClick={handleReset} className="btn-secondary">
                <RotateCcw size={18} />
                Reset
              </button>
            )}
          </div>

          {/* Examples */}
          {!hasChecked && (
            <div className="mt-6">
              <p className="text-xs text-ink-500 mb-2 uppercase tracking-wider font-medium">Try a fictional example:</p>
              <div className="space-y-2">
                {CHECK_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(ex)}
                    className="w-full text-left p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyber-400/20 hover:bg-white/[0.04] transition-all text-xs text-ink-300 font-mono leading-relaxed"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {hasChecked && result && config && (
          <div className="mt-6 space-y-4 animate-fade-in-up">
            {/* Risk level */}
            <div className={`card p-6 ${config.border} ${config.bg}`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center flex-shrink-0`}>
                  <config.icon className={config.color} size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-ink-400 uppercase tracking-wider font-medium">Risk Level</p>
                  <p className={`font-display text-3xl font-bold ${config.color}`}>{config.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-400">Warning signs</p>
                  <p className="font-display text-2xl font-bold text-white">{result.score}</p>
                </div>
              </div>

              {/* Risk bar */}
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${config.bar} transition-all duration-500`}
                  style={{ width: `${result.level === 'high' ? 90 : result.level === 'medium' ? 55 : 20}%` }}
                />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex items-start gap-3">
              <Info className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-ink-300 leading-relaxed">
                This is a preliminary awareness check and cannot guarantee that a link or
                message is safe. Always verify through official channels before taking action.
              </p>
            </div>

            {/* Warning signs */}
            {result.signs.length > 0 && (
              <div className="card p-6">
                <h3 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-400" />
                  Detected Warning Signs
                </h3>
                <div className="space-y-3">
                  {result.signs.map((sign, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center text-xs font-bold text-amber-300">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{sign.sign}</p>
                        <p className="text-sm text-ink-400 mt-0.5">{sign.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className="card p-6 border-cyber-400/20 bg-cyber-500/5">
              <h3 className="font-display font-semibold text-white text-lg mb-3 flex items-center gap-2">
                <Lightbulb size={18} className="text-cyber-300" />
                Recommended Safe Action
              </h3>
              <p className="text-sm text-ink-200 leading-relaxed">{result.recommendation}</p>
            </div>

            {/* What to do next */}
            <div className="card p-6">
              <h3 className="font-display font-semibold text-white text-lg mb-4">
                What You Can Do Next
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Do not click any links in the message',
                  'Do not share personal or financial information',
                  'Verify through an official website or known phone number',
                  'Delete and report the message',
                  'If you already paid or shared details, contact your bank',
                  'Report to the official cybercrime reporting authority',
                ].map((action, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-ink-300">
                    <ChevronRight size={16} className="text-cyber-400 flex-shrink-0 mt-0.5" />
                    {action}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
