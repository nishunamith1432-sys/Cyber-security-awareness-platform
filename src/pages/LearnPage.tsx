import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  AlertTriangle,
  Check,
  X,
  Info,
  Fish,
  ShieldAlert,
  Smartphone,
  Briefcase,
  TrendingUp,
  UserX,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { SCAM_TOPICS } from '@/data/scamTopics';

const TOPIC_ICONS: Record<string, typeof Fish> = {
  phishing: Fish,
  'digital-arrest': ShieldAlert,
  'malicious-apk': Smartphone,
  'fake-jobs': Briefcase,
  investment: TrendingUp,
  'social-media': UserX,
};

export function LearnPage() {
  const [expanded, setExpanded] = useState<string | null>('phishing');

  const toggle = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<BookOpen className="text-cyber-300" size={32} />}
        title="Learn About Scams"
        subtitle="Understanding how scams work is the first step to staying safe. Explore each type to learn what to watch for and how to protect yourself."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {SCAM_TOPICS.map((topic, i) => {
          const Icon = TOPIC_ICONS[topic.id] ?? BookOpen;
          const isOpen = expanded === topic.id;

          return (
            <div
              key={topic.id}
              className={`card overflow-hidden transition-all duration-300 animate-fade-in-up ${
                isOpen ? 'border-cyber-400/30' : ''
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Header */}
              <button
                onClick={() => toggle(topic.id)}
                className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center border border-white/10`}>
                  <Icon className="text-cyber-300" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white text-lg">{topic.title}</h3>
                  <p className="text-sm text-ink-400 truncate">{topic.tagline}</p>
                </div>
                <ChevronDown
                  className={`flex-shrink-0 text-ink-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  size={22}
                />
              </button>

              {/* Content */}
              {isOpen && (
                <div className="px-5 pb-6 space-y-6 animate-fade-in">
                  <div className="h-px bg-white/5" />

                  {/* What it is */}
                  <div>
                    <h4 className="flex items-center gap-2 font-display font-semibold text-cyber-300 text-sm uppercase tracking-wider mb-2">
                      <Info size={16} /> What It Is
                    </h4>
                    <p className="text-ink-200 text-sm leading-relaxed">{topic.whatItIs}</p>
                  </div>

                  {/* How they approach */}
                  <div>
                    <h4 className="flex items-center gap-2 font-display font-semibold text-cyber-300 text-sm uppercase tracking-wider mb-2">
                      How Scammers Approach People
                    </h4>
                    <ul className="space-y-1.5">
                      {topic.howTheyApproach.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-ink-200">
                          <span className="text-cyber-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyber-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warning signs */}
                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 p-4">
                    <h4 className="flex items-center gap-2 font-display font-semibold text-amber-300 text-sm uppercase tracking-wider mb-2">
                      <AlertTriangle size={16} /> Warning Signs
                    </h4>
                    <ul className="space-y-1.5">
                      {topic.warningSigns.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-ink-200">
                          <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What to do / not do */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                      <h4 className="flex items-center gap-2 font-display font-semibold text-emerald-300 text-sm uppercase tracking-wider mb-2">
                        <Check size={16} /> What You Should Do
                      </h4>
                      <ul className="space-y-1.5">
                        {topic.whatToDo.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-ink-200">
                            <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-4">
                      <h4 className="flex items-center gap-2 font-display font-semibold text-red-300 text-sm uppercase tracking-wider mb-2">
                        <X size={16} /> What You Should NOT Do
                      </h4>
                      <ul className="space-y-1.5">
                        {topic.whatNotToDo.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-ink-200">
                            <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Fictional example */}
                  <div className="rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-4">
                    <h4 className="flex items-center gap-2 font-display font-semibold text-cyber-300 text-sm uppercase tracking-wider mb-2">
                      Fictional Example
                    </h4>
                    <p className="text-sm text-ink-200 leading-relaxed italic">{topic.example}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
