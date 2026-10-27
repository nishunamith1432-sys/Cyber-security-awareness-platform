export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Scenario {
  id: string;
  topic: string;
  topicLabel: string;
  message: string;
  question: string;
  options: ScenarioOption[];
  warningSigns: string[];
  lesson: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'phishing-1',
    topic: 'phishing',
    topicLabel: 'Phishing',
    message: 'Dear Customer, your account has been temporarily suspended due to suspicious activity. Verify your details immediately to restore access: http://secure-bank-verify.xyz/login',
    question: 'What would you do?',
    options: [
      { id: 'a', text: 'Click the link and enter my details to restore access', isCorrect: false, explanation: 'This is exactly what the scammer wants. The link leads to a fake page that steals your credentials.' },
      { id: 'b', text: 'Open my bank app directly by typing the official website myself', isCorrect: true, explanation: 'Correct. Always access your bank through the official app or a website you type yourself — never through a link in a message.' },
      { id: 'c', text: 'Forward it to friends to check if they got it too', isCorrect: false, explanation: 'Forwarding spreads the scam further. Instead, report and delete it.' },
    ],
    warningSigns: ['Urgency — "immediately"', 'Suspicious link with .xyz domain', 'Generic "Dear Customer" greeting', 'No real bank sends verification links like this'],
    lesson: 'Phishing messages create urgency and use fake links. Always verify by going to the official source yourself.',
  },
  {
    id: 'digital-arrest-1',
    topic: 'digital-arrest',
    topicLabel: 'Digital Arrest Scam',
    message: 'This is Officer Sharma from CBI. Your mobile number is linked to a money laundering case. You are under digital arrest. Do not disconnect. Transfer ₹50,000 for verification or you will be arrested within 2 hours.',
    question: 'What should you do?',
    options: [
      { id: 'a', text: 'Stay on the call and pay to avoid arrest', isCorrect: false, explanation: 'Real police never conduct arrests over a video or phone call. Paying only feeds the scam.' },
      { id: 'b', text: 'Disconnect the call and report the number to the cybercrime helpline', isCorrect: true, explanation: 'Correct. No real authority arrests anyone over a call. Hang up and report it.' },
      { id: 'c', text: 'Keep it a secret and handle it alone', isCorrect: false, explanation: 'Scammers rely on secrecy. Talk to family or a trusted adult, and report the number.' },
    ],
    warningSigns: ['Threat of arrest over a call — this never happens for real', 'Demand for secrecy', 'Pressure to pay immediately', 'Claim of "digital arrest" — not a real legal procedure'],
    lesson: 'No real police officer arrests anyone over a phone or video call. "Digital arrest" is not a real legal term — it is a scam tactic designed to create panic.',
  },
  {
    id: 'apk-1',
    topic: 'malicious-apk',
    topicLabel: 'Malicious Apps',
    message: 'Hi! Install this app to start your part-time job. You can earn ₹2,000/day from home. [app.apk file attached]',
    question: 'Would you install this application?',
    options: [
      { id: 'a', text: 'Yes, install it to start earning right away', isCorrect: false, explanation: 'Installing APKs from messages can give scammers access to your OTPs, contacts, and bank accounts.' },
      { id: 'b', text: 'No — only install apps from the official Play Store or App Store', isCorrect: true, explanation: 'Correct. Never install apps sent through messages. Use only official app stores.' },
      { id: 'c', text: 'Install it but don\'t give any permissions', isCorrect: false, explanation: 'Even without explicitly granting permissions, a malicious APK can exploit your device. Don\'t install it at all.' },
    ],
    warningSigns: ['APK file sent through a message', "Promise of easy money — classic bait", 'No company name, no official job posting', 'Not from an official app store'],
    lesson: 'Never install APK files sent through WhatsApp or SMS. Malicious apps can silently steal OTPs and drain your bank account.',
  },
  {
    id: 'job-1',
    topic: 'fake-jobs',
    topicLabel: 'Fake Job Scams',
    message: 'Congratulations! You\'ve been selected for a part-time job. Like YouTube videos and earn ₹500 per task. Complete 3 tasks to unlock premium tasks. Deposit ₹5,000 to activate premium account and earn ₹10,000/day.',
    question: 'What would you do?',
    options: [
      { id: 'a', text: 'Deposit ₹5,000 to start earning premium rewards', isCorrect: false, explanation: 'Real jobs never ask you to pay to work. Once you deposit, the scammer disappears.' },
      { id: 'b', text: 'Ignore and report the message — no real job asks for money', isCorrect: true, explanation: 'Correct. Any job that requires you to pay first is a scam.' },
      { id: 'c', text: 'Do the free tasks first and see if they pay, then decide', isCorrect: false, explanation: 'Scammers pay small amounts first to build trust before asking for a big "deposit". The small payments are bait.' },
    ],
    warningSigns: ['Easy money for very little effort', 'Asked to pay money to earn money', 'Communication only through WhatsApp/Telegram', 'No verifiable company or official job posting'],
    lesson: 'If a job asks you to pay money — for registration, tasks, or "premium" access — it is a scam. Real employers pay you, not the other way around.',
  },
  {
    id: 'investment-1',
    topic: 'investment',
    topicLabel: 'Investment Scams',
    message: 'Double your money in 7 days! Our AI trading bot guarantees 2% daily returns. Invest now through this link: http://ai-trade-pro.xyz. Limited spots available!',
    question: 'What would you do?',
    options: [
      { id: 'a', text: 'Invest quickly before spots run out', isCorrect: false, explanation: 'Guaranteed high returns with "no risk" don\'t exist. This is a fake platform that shows fake profits and steals your deposit.' },
      { id: 'b', text: 'Ignore it and invest only through SEBI-registered platforms', isCorrect: true, explanation: 'Correct. Only invest through regulated, verified platforms. Guarantees of doubling money are always scams.' },
      { id: 'c', text: 'Invest a small amount to test it out', isCorrect: false, explanation: 'Fake platforms often let you "test" with small amounts and even show fake profits to lure bigger investments. Don\'t engage at all.' },
    ],
    warningSigns: ['Guaranteed returns — no real investment is risk-free', '"Limited spots" urgency pressure', 'Unusual .xyz domain', 'No connection to any regulated financial institution'],
    lesson: 'No investment can guarantee high returns with zero risk. Always verify that a platform is SEBI-registered before investing any money.',
  },
  {
    id: 'social-media-1',
    topic: 'social-media',
    topicLabel: 'Social-Media Fraud',
    message: 'Hey it\'s me, Rahul! I lost my phone and got a new number. I urgently need ₹3,000 for an emergency. Can you UPI it to rahul.urgent@upi? Please don\'t call, my new phone has no calling balance.',
    question: 'What would you do?',
    options: [
      { id: 'a', text: 'Send the money — it\'s my friend Rahul and he needs help', isCorrect: false, explanation: 'This could be a scammer who created a fake profile using Rahul\'s name and photo. Never send money based on a chat message alone.' },
      { id: 'b', text: 'Call Rahul on his original/known number to verify before sending anything', isCorrect: true, explanation: 'Correct. Always verify money requests by calling the person on a number you already know.' },
      { id: 'c', text: 'Send a smaller amount to help', isCorrect: false, explanation: 'Any amount sent to a scammer is lost. Verify first, always.' },
    ],
    warningSigns: ['"New number" — a common impersonation trick', 'Urgency and emotional pressure', 'Request not to call — to avoid verification', 'Money request over chat without verification'],
    lesson: 'Scammers create fake profiles using your friends\' names and photos. Always verify money requests by calling the person on a number you already know.',
  },
];
