import { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { SCENARIOS } from '@/data/scenarios';
import type { Scenario } from '@/data/scenarios';

export function TestAwarenessPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const scenario = SCENARIOS[currentIndex];
  const selectedOpt = scenario.options.find((o) => o.id === selectedOption);

  const handleSelect = (optId: string) => {
    if (answered) return;
    setSelectedOption(optId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    const opt = scenario.options.find((o) => o.id === selectedOption);
    const isCorrect = opt?.isCorrect ?? false;
    setResults((prev) => [...prev, isCorrect]);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setCompleted(false);
    setResults([]);
  };

  if (completed) {
    const correctCount = results.filter(Boolean).length;
    return (
      <div className="min-h-screen">
        <PageHeader
          icon={<Brain className="text-cyber-300" size={32} />}
          title="Test Your Awareness"
          subtitle="Scenario-based challenges to help you recognise scams and practice safe responses."
        />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="card p-8 text-center animate-scale-in">
            <div className="inline-flex w-20 h-20 rounded-full bg-cyber-500/10 border border-cyber-400/20 items-center justify-center mb-4">
              <Brain className="text-cyber-300" size={40} />
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              You scored {correctCount}/{SCENARIOS.length}
            </h2>
            <p className="mt-3 text-ink-400">
              {correctCount === SCENARIOS.length
                ? 'Excellent! You have strong scam awareness. Keep it up and help others stay safe too.'
                : correctCount >= Math.ceil(SCENARIOS.length * 0.6)
                ? 'Good work! You spotted most scams. Review the ones you missed to strengthen your awareness.'
                : 'You\'re on the right track — reviewing the Learn section will help you recognise more warning signs.'}
            </p>

            {/* Per-scenario breakdown */}
            <div className="mt-8 space-y-2 text-left">
              {SCENARIOS.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  {results[i] ? (
                    <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
                  ) : (
                    <XCircle className="text-red-400 flex-shrink-0" size={18} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{s.topicLabel}</p>
                    <p className="text-xs text-ink-400 truncate">{s.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleRestart} className="btn-primary mt-8">
              <RotateCcw size={18} /> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<Brain className="text-cyber-300" size={32} />}
        title="Test Your Awareness"
        subtitle="Read each fictional scenario and choose what you would do. You'll get immediate feedback and an explanation."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-400">
              Scenario {currentIndex + 1} of {SCENARIOS.length}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-500/10 text-cyber-300 border border-cyber-400/20">
              {scenario.topicLabel}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-cyber-500 transition-all duration-300"
              style={{ width: `${((currentIndex + (answered ? 1 : 0)) / SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario card */}
        <div className="card p-6 animate-fade-in-up" key={scenario.id}>
          {/* Message */}
          <div className="rounded-xl bg-ink-900/60 border border-white/10 p-4 mb-5">
            <div className="flex items-start gap-2.5">
              <MessageSquare className="text-cyber-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-ink-100 leading-relaxed italic">{scenario.message}</p>
            </div>
          </div>

          <p className="font-display font-semibold text-white text-lg mb-4">{scenario.question}</p>

          {/* Options */}
          <div className="space-y-2.5">
            {scenario.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const showResult = answered && isSelected;
              const showCorrect = answered && opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    showCorrect
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : showResult && !opt.isCorrect
                      ? 'border-red-500/40 bg-red-500/10'
                      : isSelected
                      ? 'border-cyber-400/40 bg-cyber-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    showCorrect
                      ? 'border-emerald-500 bg-emerald-500 text-ink-950'
                      : showResult && !opt.isCorrect
                      ? 'border-red-500 bg-red-500 text-ink-950'
                      : isSelected
                      ? 'border-cyber-400 bg-cyber-500/20 text-cyber-300'
                      : 'border-white/20 text-ink-400'
                  }`}>
                    {opt.id.toUpperCase()}
                  </div>
                  <span className="text-sm text-ink-100 leading-relaxed flex-1">{opt.text}</span>
                  {showCorrect && <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />}
                  {showResult && !opt.isCorrect && <XCircle className="text-red-400 flex-shrink-0" size={18} />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && selectedOpt && (
            <div className="mt-5 space-y-4 animate-fade-in-up">
              {/* Result */}
              <div className={`rounded-xl p-4 border ${
                selectedOpt.isCorrect
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedOpt.isCorrect ? (
                    <CheckCircle2 className="text-emerald-400" size={18} />
                  ) : (
                    <XCircle className="text-red-400" size={18} />
                  )}
                  <p className={`font-display font-semibold text-sm uppercase tracking-wider ${
                    selectedOpt.isCorrect ? 'text-emerald-300' : 'text-red-300'
                  }`}>
                    {selectedOpt.isCorrect ? 'Safer Response' : 'Risky Response'}
                  </p>
                </div>
                <p className="text-sm text-ink-200 leading-relaxed">{selectedOpt.explanation}</p>
              </div>

              {/* Warning signs */}
              <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 p-4">
                <h4 className="flex items-center gap-2 font-display font-semibold text-amber-300 text-sm uppercase tracking-wider mb-2">
                  <AlertTriangle size={16} /> Warning Signs in This Scenario
                </h4>
                <ul className="space-y-1.5">
                  {scenario.warningSigns.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-200">
                      <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lesson */}
              <div className="rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-4">
                <h4 className="flex items-center gap-2 font-display font-semibold text-cyber-300 text-sm uppercase tracking-wider mb-2">
                  <Lightbulb size={16} /> Key Takeaway
                </h4>
                <p className="text-sm text-ink-200 leading-relaxed">{scenario.lesson}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            {!answered ? (
              <button onClick={handleSubmit} disabled={!selectedOption} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                {currentIndex < SCENARIOS.length - 1 ? 'Next Scenario' : 'See Results'}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
