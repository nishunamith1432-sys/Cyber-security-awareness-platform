import {
  LifeBuoy,
  Phone,
  ShieldX,
  MessageSquareOff,
  Lock,
  Camera,
  FileSearch,
  Users,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';

const STEPS = [
  {
    icon: MessageSquareOff,
    title: 'Stop communicating with the scammer',
    desc: 'Do not reply, call back, or continue the conversation. Scammers are skilled at manipulation — any further contact gives them more opportunity.',
  },
  {
    icon: Lock,
    title: 'Do not share additional personal information',
    desc: 'Do not provide any more details — no OTPs, passwords, bank information, ID numbers, or anything else, even if they threaten you.',
  },
  {
    icon: Camera,
    title: 'Preserve evidence',
    desc: 'Take screenshots of messages, call logs, transaction records, and any other relevant information. Do not delete anything — it may be needed for reporting.',
  },
  {
    icon: FileSearch,
    title: 'Contact the official cybercrime reporting authority',
    desc: 'Report the incident through the official government cybercrime reporting portal. Use the button below — do not use any link sent by the scammer.',
  },
  {
    icon: Users,
    title: 'Inform a trusted adult, teacher, or family member',
    desc: 'You do not have to handle this alone. Tell someone you trust what happened. If money was lost, acting quickly with support increases chances of recovery.',
  },
];

export function EmergencyPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<LifeBuoy className="text-cyber-300" size={32} />}
        title="What To Do If You Are Scammed"
        subtitle="If you think you\'ve been targeted or have lost money to a scam, follow these steps. Acting quickly can make a difference."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Important banner */}
        <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5 flex items-start gap-3 animate-fade-in-up">
          <ShieldX className="text-red-400 flex-shrink-0 mt-0.5" size={22} />
          <div>
            <p className="font-display font-semibold text-red-300 text-base">If you are in immediate danger, call your local emergency number.</p>
            <p className="text-sm text-ink-300 mt-1 leading-relaxed">
              The steps below are for cyber fraud situations. If you feel physically threatened,
              contact local emergency services first.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="card card-hover p-5 flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyber-500/10 border border-cyber-400/20 flex items-center justify-center">
                <step.icon className="text-cyber-300" size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyber-500/15 text-cyber-300 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-display font-semibold text-white text-base">{step.title}</h3>
                </div>
                <p className="text-sm text-ink-300 leading-relaxed mt-1.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reporting button */}
        <div className="card p-6 text-center border-cyber-400/20 bg-cyber-500/5 animate-fade-in-up">
          <div className="inline-flex w-14 h-14 rounded-xl bg-cyber-500/10 border border-cyber-400/20 items-center justify-center mb-3">
            <Phone className="text-cyber-300" size={28} />
          </div>
          <h3 className="font-display font-semibold text-white text-lg mb-2">Report Cybercrime</h3>
          <p className="text-sm text-ink-300 mb-5 max-w-md mx-auto leading-relaxed">
            File a complaint through the official cybercrime reporting portal. Do not use any
            link provided by a suspected scammer — always use the official website.
          </p>

          {/* Placeholder for official reporting website */}
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <ExternalLink size={18} />
            Visit Official Cybercrime Portal
          </a>

          <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/15 p-3 flex items-start gap-2 text-left">
            <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={14} />
            <p className="text-xs text-ink-400 leading-relaxed">
              <span className="font-medium text-amber-300">Note:</span> The link above points to
              the official cybercrime reporting portal. Always verify you are on the correct
              government website before submitting any information. This is a placeholder —
              confirm the official URL for your region.
            </p>
          </div>
        </div>

        {/* Key helpline numbers */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <Phone size={18} className="text-cyber-300" />
            Important Contacts
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
              <p className="text-sm font-medium text-white">Cyber Crime Helpline</p>
              <p className="text-2xl font-display font-bold text-cyber-300 mt-1">1930</p>
              <p className="text-xs text-ink-400 mt-1">For reporting cyber fraud (India)</p>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
              <p className="text-sm font-medium text-white">Your Bank's Helpline</p>
              <p className="text-sm text-ink-300 mt-1 leading-relaxed">
                Call your bank's official customer care number immediately if you shared banking
                details or notice unauthorised transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-up">
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-5">
            <h4 className="flex items-center gap-2 font-display font-semibold text-emerald-300 text-sm uppercase tracking-wider mb-3">
              <CheckCircle2 size={16} /> Do
            </h4>
            <ul className="space-y-2">
              {[
                'Act quickly — early reporting can help',
                'Save all evidence (screenshots, messages)',
                'Contact your bank if money is involved',
                'Change passwords from a safe device',
                'Tell someone you trust',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-200">
                  <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-5">
            <h4 className="flex items-center gap-2 font-display font-semibold text-red-300 text-sm uppercase tracking-wider mb-3">
              <ShieldX size={16} /> Don't
            </h4>
            <ul className="space-y-2">
              {[
                'Don\'t continue talking to the scammer',
                'Don\'t pay more money to "recover" losses',
                'Don\'t delete evidence',
                'Don\'t keep it a secret out of shame',
                'Don\'t use links the scammer sent',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-200">
                  <ShieldX size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
