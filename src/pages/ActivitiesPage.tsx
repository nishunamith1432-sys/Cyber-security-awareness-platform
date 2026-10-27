import { useState } from 'react';
import {
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Video,
  Phone,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { DIGITAL_ARREST_SCENARIO, APK_SCENARIOS } from '@/data/apkAndArrest';

export function DigitalArrestPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const scenario = DIGITAL_ARREST_SCENARIO;
  const selectedChoice = scenario.choices.find((c) => c.id === selected);

  const handleSubmit = () => {
    if (!selected) return;
    setAnswered(true);
  };

  const handleReset = () => {
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<ShieldAlert className="text-cyber-300" size={32} />}
        title="Digital Arrest Awareness"
        subtitle="A safe, fictional simulation to help you recognise and respond to digital arrest scams. This is educational only — it does not recreate a real threatening experience."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Fictional disclaimer */}
        <div className="mb-6 rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-ink-300 leading-relaxed">
            <span className="font-semibold text-amber-300">Fictional scenario:</span> The following
            situation is completely made up for learning purposes. It is designed to help you
            recognise the pattern — not to frighten you.
          </p>
        </div>

        {/* Scenario */}
        <div className="card p-6 animate-fade-in-up">
          {/* Scene */}
          <div className="rounded-xl bg-ink-900/60 border border-white/10 p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Video className="text-cyber-400" size={18} />
              <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">Video Call Simulation</span>
            </div>
            <p className="text-sm text-ink-200 leading-relaxed mb-3">{scenario.scene}</p>
            <div className="rounded-lg bg-red-500/5 border border-red-500/15 p-4">
              <p className="text-sm text-ink-100 leading-relaxed italic">{scenario.message}</p>
            </div>
          </div>

          <p className="font-display font-semibold text-white text-lg mb-4">{scenario.question}</p>

          {/* Choices */}
          <div className="space-y-2.5">
            {scenario.choices.map((choice) => {
              const isSelected = selected === choice.id;
              const showCorrect = answered && choice.isCorrect;
              const showWrong = answered && isSelected && !choice.isCorrect;

              return (
                <button
                  key={choice.id}
                  onClick={() => !answered && setSelected(choice.id)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    showCorrect
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : showWrong
                      ? 'border-red-500/40 bg-red-500/10'
                      : isSelected
                      ? 'border-cyber-400/40 bg-cyber-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    showCorrect
                      ? 'border-emerald-500 bg-emerald-500 text-ink-950'
                      : showWrong
                      ? 'border-red-500 bg-red-500 text-ink-950'
                      : isSelected
                      ? 'border-cyber-400 bg-cyber-500/20 text-cyber-300'
                      : 'border-white/20 text-ink-400'
                  }`}>
                    {choice.id.toUpperCase()}
                  </div>
                  <span className="text-sm text-ink-100 leading-relaxed flex-1">{choice.text}</span>
                  {showCorrect && <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />}
                  {showWrong && <XCircle className="text-red-400 flex-shrink-0" size={18} />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && selectedChoice && (
            <div className="mt-5 space-y-4 animate-fade-in-up">
              <div className={`rounded-xl p-4 border ${
                selectedChoice.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedChoice.isCorrect ? <CheckCircle2 className="text-emerald-400" size={18} /> : <XCircle className="text-red-400" size={18} />}
                  <p className={`font-display font-semibold text-sm uppercase tracking-wider ${selectedChoice.isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                    {selectedChoice.isCorrect ? 'Safer Response' : 'Risky Response'}
                  </p>
                </div>
                <p className="text-sm text-ink-200 leading-relaxed">{selectedChoice.explanation}</p>
              </div>

              {/* Key facts */}
              <div className="rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-4">
                <h4 className="flex items-center gap-2 font-display font-semibold text-cyber-300 text-sm uppercase tracking-wider mb-3">
                  <ShieldCheck size={16} /> Key Facts About Digital Arrest
                </h4>
                <ul className="space-y-2">
                  {scenario.keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-200">
                      <CheckCircle2 size={14} className="text-cyber-400 mt-0.5 flex-shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to do */}
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                <h4 className="flex items-center gap-2 font-display font-semibold text-emerald-300 text-sm uppercase tracking-wider mb-3">
                  <Phone size={16} /> What You Should Do
                </h4>
                <ul className="space-y-2">
                  {scenario.whatToDo.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-200">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            {!answered ? (
              <button onClick={handleSubmit} disabled={!selected} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Answer
              </button>
            ) : (
              <button onClick={handleReset} className="btn-secondary">
                <RotateCcw size={18} /> Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApkAwarenessPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const scenario = APK_SCENARIOS[currentIdx];
  const selectedOpt = scenario.options.find((o) => o.id === selected);

  const handleSubmit = () => {
    if (!selected) return;
    const opt = scenario.options.find((o) => o.id === selected);
    setResults((prev) => [...prev, opt?.isCorrect ?? false]);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx < APK_SCENARIOS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      // Loop back to first or could show results
      setCurrentIdx(0);
      setSelected(null);
      setAnswered(false);
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<Smartphone className="text-cyber-300" size={32} />}
        title="Malicious APK Awareness"
        subtitle="Learn to recognise dangerous app installation requests through fictional situations. Never install apps from messages or unofficial sources."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-400">
              Situation {currentIdx + 1} of {APK_SCENARIOS.length}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-500/10 text-cyber-300 border border-cyber-400/20">
              {scenario.situation}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-cyber-500 transition-all duration-300"
              style={{ width: `${((currentIdx + (answered ? 1 : 0)) / APK_SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario card */}
        <div className="card p-6 animate-fade-in-up" key={scenario.id}>
          {/* Message */}
          <div className="rounded-xl bg-ink-900/60 border border-white/10 p-4 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="text-cyber-400" size={16} />
              <span className="text-xs font-medium text-ink-400">{scenario.sender}</span>
            </div>
            <p className="text-sm text-ink-100 leading-relaxed italic">{scenario.message}</p>
          </div>

          <p className="font-display font-semibold text-white text-lg mb-4">{scenario.question}</p>

          {/* Options */}
          <div className="space-y-2.5">
            {scenario.options.map((opt) => {
              const isSelected = selected === opt.id;
              const showCorrect = answered && opt.isCorrect;
              const showWrong = answered && isSelected && !opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => !answered && setSelected(opt.id)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    showCorrect
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : showWrong
                      ? 'border-red-500/40 bg-red-500/10'
                      : isSelected
                      ? 'border-cyber-400/40 bg-cyber-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    showCorrect ? 'border-emerald-500 bg-emerald-500 text-ink-950'
                    : showWrong ? 'border-red-500 bg-red-500 text-ink-950'
                    : isSelected ? 'border-cyber-400 bg-cyber-500/20 text-cyber-300'
                    : 'border-white/20 text-ink-400'
                  }`}>
                    {opt.id.toUpperCase()}
                  </div>
                  <span className="text-sm text-ink-100 leading-relaxed flex-1">{opt.text}</span>
                  {showCorrect && <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />}
                  {showWrong && <XCircle className="text-red-400 flex-shrink-0" size={18} />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && selectedOpt && (
            <div className="mt-5 space-y-4 animate-fade-in-up">
              {/* Result */}
              <div className={`rounded-xl p-4 border ${
                selectedOpt.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedOpt.isCorrect ? <CheckCircle2 className="text-emerald-400" size={18} /> : <XCircle className="text-red-400" size={18} />}
                  <p className={`font-display font-semibold text-sm uppercase tracking-wider ${selectedOpt.isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                    {selectedOpt.isCorrect ? 'Safer Choice' : 'Risky Choice'}
                  </p>
                </div>
                <p className="text-sm text-ink-200 leading-relaxed">{selectedOpt.explanation}</p>
              </div>

              {/* Risks */}
              <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-4">
                <h4 className="flex items-center gap-2 font-display font-semibold text-red-300 text-sm uppercase tracking-wider mb-2">
                  <AlertTriangle size={16} /> Risks of Installing This App
                </h4>
                <ul className="space-y-1.5">
                  {scenario.risks.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink-200">
                      <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safer alternative */}
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                <h4 className="flex items-center gap-2 font-display font-semibold text-emerald-300 text-sm uppercase tracking-wider mb-2">
                  <Lightbulb size={16} /> Safer Alternative
                </h4>
                <p className="text-sm text-ink-200 leading-relaxed">{scenario.saferAlternative}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            {!answered ? (
              <button onClick={handleSubmit} disabled={!selected} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                {currentIdx < APK_SCENARIOS.length - 1 ? 'Next Situation' : 'Start Over'}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
