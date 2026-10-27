export interface ChatOption {
  id: string;
  label: string;
  flowId: string;
}

export interface ChatStep {
  id: string;
  botMessage: string;
  question?: string;
  followUp?: {
    prompt: string;
    responses: string[];
  };
  guidance: string[];
  warningSigns?: string[];
  endMessage?: string;
}

export interface ChatFlow {
  id: string;
  label: string;
  steps: ChatStep[];
}

export const CHAT_OPTIONS: ChatOption[] = [
  { id: 'link', label: 'I received a suspicious link', flowId: 'suspicious-link' },
  { id: 'message', label: 'I received a suspicious message', flowId: 'suspicious-message' },
  { id: 'apk', label: 'Someone sent me an APK', flowId: 'apk' },
  { id: 'job', label: 'I received a job offer', flowId: 'job-offer' },
  { id: 'invest', label: 'Someone asked me to invest money', flowId: 'investment' },
  { id: 'police', label: 'Someone claiming to be police contacted me', flowId: 'digital-arrest' },
  { id: 'social', label: 'I experienced social-media fraud', flowId: 'social-fraud' },
];

export const CHAT_FLOWS: Record<string, ChatFlow> = {
  'suspicious-link': {
    id: 'suspicious-link',
    label: 'Suspicious Link',
    steps: [
      {
        id: 's1',
        botMessage: 'I understand you received a link you\'re unsure about. That\'s good — being cautious is the right first step.',
        question: 'Can you tell me where you received the link? For example, was it through SMS, WhatsApp, email, or social media?',
        followUp: {
          prompt: 'Where did the link come from?',
          responses: ['SMS', 'WhatsApp', 'Email', 'Social media', 'Not sure'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you. Here\'s what I want you to know about suspicious links.',
        guidance: [
          'Don\'t click the link — even if it looks like it\'s from a bank, delivery service, or friend.',
          'Check the domain carefully. Scammers use lookalike names and unusual endings like .xyz, .top, or .click.',
          'Shortened links (bit.ly, tinyurl) hide the real destination — be extra cautious.',
          'If it claims to be from a bank or service, open the official app or type the website address yourself.',
        ],
        warningSigns: ['Urgency ("verify now", "account suspended")', 'Unusual domain endings', 'Shortened URLs', 'Requests for OTP or password', 'Spelling mistakes'],
        endMessage: 'If you\'ve already clicked: don\'t enter any information. Close the page. If you entered details, contact your bank and the cybercrime helpline immediately.',
      },
    ],
  },
  'suspicious-message': {
    id: 'suspicious-message',
    label: 'Suspicious Message',
    steps: [
      {
        id: 's1',
        botMessage: 'Got it. Suspicious messages are very common — let\'s figure out what to watch for.',
        question: 'Did the message ask you to do anything specific? For example, click a link, share details, pay money, or install something?',
        followUp: {
          prompt: 'What did the message ask you to do?',
          responses: ['Click a link', 'Share personal details', 'Pay money', 'Install an app', 'Just seemed off'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you for sharing. Here are the key warning signs and what to do.',
        guidance: [
          'If it creates urgency ("act now", "within 24 hours"), slow down — that\'s a manipulation tactic.',
          'No real bank, company, or authority asks for your OTP, password, or card details over a message.',
          'Unexpected rewards or prizes are almost always scams — you can\'t win a contest you didn\'t enter.',
          'Don\'t reply, don\'t click links, and don\'t forward the message to others.',
          'If it claims to be from an organisation, contact them through their official website or a known number.',
        ],
        warningSigns: ['Urgency or threats', 'Requests for OTP/password/bank details', 'Unexpected rewards', 'Suspicious links', 'Payment requests'],
        endMessage: 'Remember: when in doubt, don\'t act. Delete the message and, if needed, report it to the cybercrime helpline.',
      },
    ],
  },
  apk: {
    id: 'apk',
    label: 'Received an APK',
    steps: [
      {
        id: 's1',
        botMessage: 'Receiving an app file (APK) through a message is a serious warning sign. Let me guide you.',
        question: 'Who sent you the APK? Was it a stranger, a "recruiter", a delivery message, or someone else?',
        followUp: {
          prompt: 'Who sent the APK?',
          responses: ['A stranger', 'A job recruiter', 'A delivery message', 'A friend\'s account', 'Not sure'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you. Here\'s what you need to know about APK files sent through messages.',
        guidance: [
          'Never install an APK from a message, no matter who sent it. Only use the official Play Store or App Store.',
          'Malicious apps can silently read your OTPs, access your contacts, camera, and even your banking app.',
          'A "recruiter" who asks you to install an app is a classic scam — real jobs don\'t require this.',
          'Check that "install from unknown sources" is turned OFF in your phone settings.',
          'If a friend\'s account sent it, their account may have been hacked — warn them through another channel.',
        ],
        warningSigns: ['APK sent through WhatsApp/SMS', 'Asked to install from "unknown sources"', 'App requests many unnecessary permissions', 'No official app store listing'],
        endMessage: 'If you already installed it: uninstall immediately, check your bank accounts for unusual activity, and change passwords from a different device.',
      },
    ],
  },
  'job-offer': {
    id: 'job-offer',
    label: 'Job Offer',
    steps: [
      {
        id: 's1',
        botMessage: 'Let\'s look at this job offer carefully. Fake job scams are very common right now.',
        question: 'Did the job offer ask you to pay any money, deposit, or registration fee?',
        followUp: {
          prompt: 'Did they ask you to pay anything?',
          responses: ['Yes, they asked for a deposit', 'Not yet', 'They said I need to pay to unlock tasks', 'No, but it feels too good'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you. Here\'s what you should know.',
        guidance: [
          'Real jobs never ask you to pay to work. Any "registration", "task", or "deposit" fee is a scam.',
          'If they pay you small amounts first, that\'s bait — scammers build trust before asking for a big deposit.',
          'If communication is only through WhatsApp or Telegram with no verifiable company, be very suspicious.',
          'Check the company name online — search for it with the word "scam" or "fraud".',
          'Use official job portals and company websites for applications.',
        ],
        warningSigns: ['Easy money for little effort', 'Asked to pay to earn', 'Only WhatsApp/Telegram contact', 'No official company or job posting', 'Pressure to invest more for bigger returns'],
        endMessage: 'If you already paid: stop all communication, save all messages as evidence, and report to the cybercrime helpline immediately.',
      },
    ],
  },
  investment: {
    id: 'investment',
    label: 'Investment Request',
    steps: [
      {
        id: 's1',
        botMessage: 'Investment scams are on the rise. Let me help you think about this carefully.',
        question: 'How did you hear about this investment opportunity?',
        followUp: {
          prompt: 'How did you find out about it?',
          responses: ['Social media ad', 'A message on WhatsApp/Telegram', 'A friend referred me', 'A website link', 'Not sure'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you. Here are the key things to check.',
        guidance: [
          'Only invest through SEBI-registered platforms. Verify any platform or advisor through official government registries.',
          'Guaranteed high returns with "no risk" do not exist. Every real investment carries risk.',
          'Fake platforms show realistic profit charts to make you feel you\'re earning — those numbers are not real.',
          'If you can\'t withdraw your money unless you pay "tax" or "fees", it\'s a scam. Don\'t pay more.',
          'Be very cautious of investment opportunities from ads, messages, or referrals — always verify independently.',
        ],
        warningSigns: ['Guaranteed or very high returns', 'Pressure to invest quickly', 'Cannot withdraw without paying fees', 'Not SEBI-registered', 'Found through a message or ad'],
        endMessage: 'If you already invested and can\'t withdraw: stop paying any "fees", save all evidence (screenshots, transaction IDs), and report to the cybercrime helpline.',
      },
    ],
  },
  'digital-arrest': {
    id: 'digital-arrest',
    label: 'Police Impersonation',
    steps: [
      {
        id: 's1',
        botMessage: 'This is a very important situation. Let me help you understand what\'s happening.',
        question: 'Did they contact you through a phone call, video call, or message?',
        followUp: {
          prompt: 'How did they contact you?',
          responses: ['Phone call', 'Video call', 'WhatsApp message', 'SMS', 'Not sure'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you. Please read this carefully — it is very important.',
        guidance: [
          '"Digital arrest" is NOT a real legal procedure. No police officer arrests anyone over a call or video call.',
          'Real police will never ask you to pay money to "verify" or "clear" your name.',
          'Scammers impersonate CBI, police, customs, or other officials to create fear and panic.',
          'They often ask you to keep it secret — this is to isolate you. Talk to family or a trusted adult.',
          'Do NOT share any personal documents, bank details, or OTPs.',
        ],
        warningSigns: ['Threat of arrest over a call', 'Demand for payment', 'Asked to keep it secret', 'Claims of "digital arrest"', 'Pressure to act immediately'],
        endMessage: 'Disconnect the call immediately. Note the number. Report it to the cybercrime helpline. If you already paid, report right away — early reporting can help recover money.',
      },
    ],
  },
  'social-fraud': {
    id: 'social-fraud',
    label: 'Social-Media Fraud',
    steps: [
      {
        id: 's1',
        botMessage: 'I\'m sorry this happened. Social-media fraud can take many forms — let\'s figure out what\'s going on.',
        question: 'Can you describe what happened? For example, was it a fake profile, a money request from a "friend", blackmail, or something else?',
        followUp: {
          prompt: 'What kind of social-media fraud?',
          responses: ['A friend\'s account asked for money', 'A stranger is threatening/blackmailing me', 'Someone is impersonating me', 'My account got hacked', 'Something else'],
        },
        guidance: [],
      },
      {
        id: 's2',
        botMessage: 'Thank you for sharing. Here\'s what you should do.',
        guidance: [
          'If a "friend" asked for money, call them on their known number to verify — scammers clone profiles.',
          'If you\'re being blackmailed, do NOT pay. Paying usually leads to more demands. Save evidence and report.',
          'Don\'t keep it secret — tell a trusted adult, family member, or teacher. You are not alone.',
          'Report and block the fake account through the platform\'s safety/reporting tools.',
          'Preserve all evidence: screenshots of messages, profiles, and any threats.',
        ],
        warningSigns: ['A "friend" suddenly asks for money', 'Threats or blackmail', 'Requests for intimate content', 'Fast emotional connection from a stranger', 'Links to "verify" your account'],
        endMessage: 'If you\'re being blackmailed or threatened, please reach out to someone you trust and report to the cybercrime helpline. You don\'t have to handle this alone.',
      },
    ],
  },
};
