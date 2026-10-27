import { ClipboardList, ExternalLink, AlertTriangle, FileText } from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';

const SURVEY_PLACEHOLDER_URL = 'https://forms.gle/YOUR_FORM_ID_HERE';

export function SurveyPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<ClipboardList className="text-cyber-300" size={32} />}
        title="Cyber Awareness Survey"
        subtitle="Help us understand public awareness of online scams. Your responses help improve cyber safety education for everyone."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* What the survey covers */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <FileText size={18} className="text-cyber-300" />
            What This Survey Covers
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Awareness of phishing and fraudulent links',
              'Knowledge of digital arrest scams',
              'Understanding of malicious APK risks',
              'Awareness of social-media fraud',
              'General online safety habits',
              'Experience with reporting cybercrime',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyber-500/10 text-cyber-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm text-ink-200 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Google Form embed placeholder */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-display font-semibold text-white text-lg mb-2">Survey Form</h3>
          <p className="text-sm text-ink-400 mb-4">
            The survey is hosted on Google Forms. Once the form is published, replace the
            placeholder URL below and embed it here.
          </p>

          {/* Embed area */}
          <div className="rounded-xl bg-ink-900/60 border border-dashed border-cyber-400/20 p-8 text-center">
            <div className="inline-flex w-14 h-14 rounded-xl bg-cyber-500/10 border border-cyber-400/20 items-center justify-center mb-3">
              <ClipboardList className="text-cyber-300" size={28} />
            </div>
            <p className="font-display font-semibold text-white mb-1">Google Form Will Appear Here</p>
            <p className="text-sm text-ink-400 mb-4 max-w-md mx-auto">
              The cyber awareness survey form will appear in this space once published.
              The responses help improve cyber safety awareness education.
            </p>

            {/* Placeholder link */}
            <a
              href={SURVEY_PLACEHOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <ExternalLink size={18} />
              Open Survey Form
            </a>

            <p className="mt-4 text-xs text-ink-500 font-mono">
              Placeholder URL: {SURVEY_PLACEHOLDER_URL}
            </p>
          </div>

          {/* Instructions for the team */}
          <div className="mt-4 rounded-xl bg-amber-500/5 border border-amber-500/15 p-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={16} />
              <div className="text-sm text-ink-300">
                <p className="font-medium text-amber-300 mb-1">Setup note:</p>
                <p className="leading-relaxed">
                  Replace the placeholder URL with your published Google Form link. To embed
                  the form directly on this page, replace the placeholder section above with
                  an iframe pointing to your form's embed URL.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy note */}
        <div className="rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-4 flex items-start gap-3">
          <AlertTriangle className="text-cyber-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-ink-300 leading-relaxed">
            The survey does not collect passwords, OTPs, or banking information. Please do not
            share any sensitive personal data in the survey responses.
          </p>
        </div>
      </div>
    </div>
  );
}
