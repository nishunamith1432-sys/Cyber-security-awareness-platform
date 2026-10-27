import {
  ShieldCheck,
  Search,
  MessageSquare,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  Lock,
  Eye,
  Brain,
  Fish,
  ShieldAlert,
  Smartphone,
  Briefcase,
  TrendingUp,
  UserX,
} from 'lucide-react';
import type { PageId } from '@/components/Navbar';
import { SCAM_TOPICS } from '@/data/scamTopics';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

const TOPIC_ICONS: Record<string, typeof Fish> = {
  phishing: Fish,
  'digital-arrest': ShieldAlert,
  'malicious-apk': Smartphone,
  'fake-jobs': Briefcase,
  investment: TrendingUp,
  'social-media': UserX,
};

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background grid + glow */}
        <div className="absolute inset-0 grid-bg animate-grid-move opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyber-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-400/20 text-cyber-300 text-sm font-medium mb-6 animate-fade-in">
            <Lock size={14} />
            Cyber Safety Awareness
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-in-up">
            C4G
          </h1>
          <p className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-cyber-300 to-cyber-500 bg-clip-text text-transparent animate-fade-in-up">
            Cyber Safety Awareness Platform
          </p>

          <p className="mt-6 text-base sm:text-lg text-ink-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Every day, thousands of people lose money and personal data to online scams.
            This platform helps you recognise fraud before it happens — through education,
            interactive checks, scenarios, and quizzes. Learn to spot the signs. Protect
            yourself and others.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <button onClick={() => onNavigate('check')} className="btn-primary w-full sm:w-auto text-base">
              <Search size={20} />
              Check Before You Trust
            </button>
            <button onClick={() => onNavigate('test')} className="btn-secondary w-full sm:w-auto text-base">
              <Brain size={20} />
              Test Your Awareness
            </button>
            <button onClick={() => onNavigate('learn')} className="btn-secondary w-full sm:w-auto text-base">
              <BookOpen size={20} />
              Learn About Scams
            </button>
          </div>

          {/* Safety reminder */}
          <div className="mt-12 inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyber-500/10 to-transparent border border-cyber-400/20 animate-scale-in">
            <ShieldCheck className="text-cyber-400 flex-shrink-0" size={28} />
            <p className="font-display text-lg sm:text-xl font-semibold text-white tracking-wide">
              Stop. <span className="text-cyber-300">Think.</span> Verify. <span className="text-cyber-300">Then Act.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats / intro */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: AlertTriangle, value: '6', label: 'Scam Types Covered' },
            { icon: BookOpen, value: '10+', label: 'Learning Topics' },
            { icon: Brain, value: '10', label: 'Quiz Questions' },
            { icon: Eye, value: '4+', label: 'Interactive Activities' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="card card-hover p-5 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <stat.icon className="mx-auto text-cyber-400 mb-2" size={24} />
              <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-ink-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics overview */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            What You'll Learn
          </h2>
          <p className="text-ink-400 text-center mb-10 max-w-2xl mx-auto">
            Six major categories of online fraud — what they look like, how scammers
            approach people, and how to stay safe.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCAM_TOPICS.map((topic, i) => {
              const Icon = TOPIC_ICONS[topic.id] ?? BookOpen;
              return (
                <button
                  key={topic.id}
                  onClick={() => onNavigate('learn')}
                  className="card card-hover p-6 text-left group animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 border border-white/10`}>
                    <Icon className="text-cyber-300" size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-1.5 group-hover:text-cyber-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-ink-400 leading-relaxed">{topic.tagline}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm text-cyber-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features showcase */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            How This Platform Helps You
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Search,
                title: 'Check Before You Trust',
                desc: 'Paste a suspicious message or link and get a preliminary risk assessment with detected warning signs.',
                page: 'check' as PageId,
              },
              {
                icon: MessageSquare,
                title: 'Chat Assistant',
                desc: 'Describe what happened in a guided chat and get safety guidance tailored to your situation.',
                page: 'chat' as PageId,
              },
              {
                icon: Brain,
                title: 'Test Your Awareness',
                desc: 'Face realistic scam scenarios and learn whether your response would keep you safe.',
                page: 'test' as PageId,
              },
              {
                icon: Eye,
                title: 'Spot the Scam Game',
                desc: 'Read fake messages and click the suspicious parts to train your eye for warning signs.',
                page: 'game' as PageId,
              },
            ].map((feat, i) => (
              <button
                key={feat.title}
                onClick={() => onNavigate(feat.page)}
                className="card card-hover p-6 flex items-start gap-4 text-left group animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyber-500/10 border border-cyber-400/20 flex items-center justify-center">
                  <feat.icon className="text-cyber-300" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white text-lg mb-1 group-hover:text-cyber-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-ink-400 leading-relaxed">{feat.desc}</p>
                </div>
                <ArrowRight className="text-ink-500 group-hover:text-cyber-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" size={18} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="card p-6 border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-ink-300 leading-relaxed">
                <span className="font-semibold text-amber-300">Important:</span> This platform
                is for educational awareness only. It cannot guarantee that any link or message
                is safe or fraudulent. Always verify through official channels. If you suspect
                fraud, report it to the official cybercrime reporting authority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
