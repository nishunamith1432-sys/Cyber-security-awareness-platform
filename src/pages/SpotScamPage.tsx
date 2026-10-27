import { useState } from 'react';
import {
  Eye,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  AlertTriangle,
  MessageSquare,
  Mail,
  Smartphone,
  Share2,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { SPOT_SCAM_MESSAGES } from '@/data/spotScam';
import type { SpotScamMessage } from '@/data/spotScam';

const TYPE_ICONS: Record<string, typeof MessageSquare> = {
  SMS: MessageSquare,
  Email: Mail,
  WhatsApp: Smartphone,
  'Social Media': Share2,
};

const CATEGORY_LABELS: Record<string, string> = {
  link: 'Suspicious Link',
  urgency: 'Urgency',
  reward: 'Fake Reward',
  'personal-info': 'Personal Info Request',
  authority: 'Fake Authority',
  payment: 'Payment Request',
};

export function SpotScamPage() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);

  const msg = SPOT_SCAM_MESSAGES[msgIdx];

  const handleSegmentClick = (segId: number) => {
    if (revealed) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(segId)) next.delete(segId);
      else next.add(segId);
      return next;
    });
  };

  const handleCheck = () => {
    setRevealed(true);
    const suspiciousIds = msg.segments.filter((s) => s.isSuspicious).map((s) => s.id);
    const correct = suspiciousIds.filter((id) => selected.has(id)).length;
    const wrong = [...selected].filter((id) => !suspiciousIds.includes(id)).length;
    const score = Math.max(0, correct - wrong);
    setScores((prev) => [...prev, score]);
  };

  const handleNext = () => {
    if (msgIdx < SPOT_SCAM_MESSAGES.length - 1) {
      setMsgIdx((prev) => prev + 1);
      setSelected(new Set());
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setMsgIdx(0);
    setSelected(new Set());
    setRevealed(false);
    setCompleted(false);
    setScores([]);
  };

  if (completed) {
    const totalPossible = SPOT_SCAM_MESSAGES.reduce(
      (sum, m) => sum + m.segments.filter((s) => s.isSuspicious).length,
      0
    );
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const pct = Math.round((totalScore / totalPossible) * 100);

    return (
      <div className="min-h-screen">
        <PageHeader
          icon={<Eye className="text-cyber-300" size={32} />}
          title="Spot the Scam"
          subtitle="Read fictional messages and identify the suspicious parts. Train your eye to recognise warning signs."
        />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="card p-8 text-center animate-scale-in">
            <div className="inline-flex w-20 h-20 rounded-full bg-cyber-500/10 border border-cyber-400/20 items-center justify-center mb-4">
              <Eye className="text-cyber-300" size={40} />
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              {totalScore}/{totalPossible} correct
            </h2>
            <p className="mt-3 text-ink-400">
              {pct >= 80
                ? 'Sharp eyes! You can spot scam warning signs with confidence.'
                : pct >= 50
                ? 'Good instincts. Review the warning signs you missed to sharpen your skills.'
                : 'Practice makes perfect — try again and look for urgency, links, rewards, and payment requests.'}
            </p>
            <button onClick={handleRestart} className="btn-primary mt-8">
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const Icon = TYPE_ICONS[msg.type] ?? MessageSquare;
  const suspiciousIds = msg.segments.filter((s) => s.isSuspicious).map((s) => s.id);
  const allFound = suspiciousIds.every((id) => selected.has(id));
  const hasWrong = [...selected].some((id) => !suspiciousIds.includes(id));

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<Eye className="text-cyber-300" size={32} />}
        title="Spot the Scam"
        subtitle="Click on the parts of the message you think are suspicious. Then check your answers and learn why each part is a warning sign."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-400">
              Message {msgIdx + 1} of {SPOT_SCAM_MESSAGES.length}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-500/10 text-cyber-300 border border-cyber-400/20">
              {msg.type}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-cyber-500 transition-all duration-300"
              style={{ width: `${((msgIdx + (revealed ? 1 : 0)) / SPOT_SCAM_MESSAGES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Message card */}
        <div className="card p-6 animate-fade-in-up" key={msg.id}>
          {/* Sender */}
          <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-white/5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon className="text-cyber-300" size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{msg.sender}</p>
              <p className="text-xs text-ink-500">{msg.type}</p>
            </div>
          </div>

          {/* Clickable message */}
          <div className="rounded-xl bg-ink-900/60 border border-white/10 p-5 mb-4">
            <p className="text-sm leading-loose">
              {msg.segments.map((seg) => {
                const isSelected = selected.has(seg.id);
                const showCorrect = revealed && seg.isSuspicious;
                const showWrong = revealed && isSelected && !seg.isSuspicious;
                const showMissed = revealed && seg.isSuspicious && !isSelected;

                return (
                  <button
                    key={seg.id}
                    onClick={() => handleSegmentClick(seg.id)}
                    disabled={revealed}
                    className={`inline rounded px-1 py-0.5 transition-all ${
                      showCorrect
                        ? 'bg-emerald-500/20 text-emerald-200 underline decoration-emerald-400/50'
                        : showWrong
                        ? 'bg-red-500/20 text-red-200 line-through'
                        : showMissed
                        ? 'bg-amber-500/15 text-amber-200 underline decoration-amber-400/50'
                        : isSelected
                        ? 'bg-cyber-500/20 text-cyber-200'
                        : 'text-ink-100 hover:bg-white/5'
                    } ${!revealed ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {seg.text}
                  </button>
                );
              })}
            </p>
          </div>

          {/* Instructions */}
          {!revealed && (
            <p className="text-xs text-ink-500 mb-4 text-center">
              Click on words or phrases you think are suspicious. Click again to deselect.
              {selected.size > 0 && ` (${selected.size} selected)`}
            </p>
          )}

          {/* Results */}
          {revealed && (
            <div className="space-y-4 animate-fade-in-up">
              {/* Score for this message */}
              <div className={`rounded-xl p-4 border flex items-center gap-3 ${
                allFound && !hasWrong
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-amber-500/5 border-amber-500/20'
              }`}>
                {allFound && !hasWrong ? (
                  <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={20} />
                ) : (
                  <AlertTriangle className="text-amber-400 flex-shrink-0" size={20} />
                )}
                <p className="text-sm text-ink-200">
                  {allFound && !hasWrong
                    ? 'You found all the warning signs!'
                    : hasWrong && allFound
                    ? 'You found all the signs, but also marked some safe parts. See below.'
                    : 'Some warning signs were missed. See the highlighted parts above and the explanations below.'}
                </p>
              </div>

              {/* Explanation per suspicious segment */}
              <div className="space-y-2">
                <h4 className="font-display font-semibold text-white text-sm flex items-center gap-2">
                  <Lightbulb size={16} className="text-cyber-300" />
                  Warning Signs Explained
                </h4>
                {msg.segments
                  .filter((s) => s.isSuspicious)
                  .map((seg) => (
                    <div key={seg.id} className="rounded-lg bg-white/[0.02] border border-white/5 p-3">
                      <div className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-cyber-500/10 text-cyber-300 border border-cyber-400/20">
                          {CATEGORY_LABELS[seg.category] ?? 'Warning'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium italic">"{seg.text.trim()}"</p>
                          <p className="text-xs text-ink-400 mt-1 leading-relaxed">{seg.reason}</p>
                        </div>
                        {selected.has(seg.id) ? (
                          <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={16} />
                        ) : (
                          <XCircle className="text-red-400 flex-shrink-0" size={16} />
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-4">
                <p className="text-sm text-ink-200 leading-relaxed">{msg.afterText}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            {!revealed ? (
              <button onClick={handleCheck} disabled={selected.size === 0} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                <Eye size={18} /> Check Answers
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                {msgIdx < SPOT_SCAM_MESSAGES.length - 1 ? 'Next Message' : 'See Results'}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
