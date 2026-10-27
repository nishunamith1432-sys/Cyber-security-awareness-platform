export interface QuizQuestion {
  id: number;
  topic: 'Phishing' | 'Digital Arrest' | 'Malicious Apps' | 'Social Media Safety';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Phishing',
    question: 'You receive an SMS: "Your bank account is suspended. Verify now: http://secure-bank-verify.xyz". What is the safest action?',
    options: [
      'Click the link and verify your details',
      'Open your bank\'s official app or website directly to check',
      'Reply with your account number',
      'Forward the message to friends to ask if it\'s real',
    ],
    correctIndex: 1,
    explanation: 'Always access your bank through the official app or a website you type yourself. Links in messages can lead to fake pages that steal your details.',
  },
  {
    id: 2,
    topic: 'Phishing',
    question: 'Which of these is a warning sign of a phishing email?',
    options: [
      'It addresses you by your full name',
      'It comes from an official company email address',
      'It creates urgency and asks you to click a link immediately',
      'It has a professional signature with contact details',
    ],
    correctIndex: 2,
    explanation: 'Urgency ("act now or your account will be blocked") is a classic phishing tactic to make you act before thinking.',
  },
  {
    id: 3,
    topic: 'Phishing',
    question: 'A link uses the domain "secure-bank-verify.xyz". Why is this suspicious?',
    options: [
      'It uses HTTPS so it must be safe',
      'Banks don\'t use .xyz domains and the name is designed to sound official',
      'It\'s too long',
      'There\'s nothing suspicious about it',
    ],
    correctIndex: 1,
    explanation: 'Real banks use their own registered domains. The .xyz extension and generic "secure-bank-verify" name are red flags of a fake site.',
  },
  {
    id: 4,
    topic: 'Phishing',
    question: 'You get a message: "You\'ve won a ₹5,000 reward! Claim now: bit.ly/claim-prize". What should you do?',
    options: [
      'Click the link to claim the reward',
      'Share it with family so they can also claim',
      'Delete it — you didn\'t enter any contest, and shortened links hide destinations',
      'Reply with your bank details to receive the money',
    ],
    correctIndex: 2,
    explanation: 'You can\'t win a contest you never entered. Shortened links hide the real destination. Delete and report.',
  },
  {
    id: 5,
    topic: 'Phishing',
    question: 'Which greeting is more commonly seen in phishing messages?',
    options: [
      '"Dear Priya Sharma,"',
      '"Dear Customer,"',
      '"Hi Priya, your order #12345..."',
      'No greeting at all is suspicious',
    ],
    correctIndex: 1,
    explanation: 'Phishing messages often use generic greetings like "Dear Customer" because scammers don\'t know your real name.',
  },
  {
    id: 6,
    topic: 'Digital Arrest',
    question: 'Someone calls claiming to be a police officer and says you\'re under "digital arrest" over a video call. What is true?',
    options: [
      'You should cooperate with the officer immediately',
      '"Digital arrest" is not a real legal procedure — police do not arrest people over calls',
      'You should share your Aadhaar to prove innocence',
      'You should pay a fine to avoid arrest',
    ],
    correctIndex: 1,
    explanation: 'There is no such thing as "digital arrest." Real police never conduct arrests over phone or video calls. This is always a scam.',
  },
  {
    id: 7,
    topic: 'Digital Arrest',
    question: 'A caller claims to be from CBI and says your number is linked to money laundering. They ask you to keep it confidential. What should you do?',
    options: [
      'Keep it secret as instructed and cooperate',
      'Disconnect, tell family, and report to the cybercrime helpline',
      'Share your bank details so they can "investigate"',
      'Pay a verification fee to clear your name',
    ],
    correctIndex: 1,
    explanation: 'Scammers demand secrecy to isolate you. Real authorities don\'t ask you to keep investigations secret from family. Disconnect and report.',
  },
  {
    id: 8,
    topic: 'Malicious Apps',
    question: 'A "recruiter" sends you an .apk file on WhatsApp and asks you to install it for a job. What is the risk?',
    options: [
      'There is no risk if you don\'t give permissions',
      'APK files from messages can secretly access your OTPs, contacts, and bank account',
      'Only links are dangerous, not apps',
      'It\'s safe if the sender has a profile picture',
    ],
    correctIndex: 1,
    explanation: 'Malicious APKs can read SMS (including OTPs), access contacts, camera, and banking apps — all silently. Never install apps from messages.',
  },
  {
    id: 9,
    topic: 'Malicious Apps',
    question: 'How can you stay safe from malicious apps?',
    options: [
      'Install apps only from unofficial websites for faster updates',
      'Enable "install from unknown sources" for convenience',
      'Install only from the official Play Store / App Store and check permissions',
      'Install any app as long as it\'s free',
    ],
    correctIndex: 2,
    explanation: 'Only install from official app stores. Check the developer name, reviews, and requested permissions before installing any app.',
  },
  {
    id: 10,
    topic: 'Social Media Safety',
    question: 'A friend messages you from a "new number" asking for urgent money and says not to call. What should you do?',
    options: [
      'Send the money immediately to help your friend',
      'Call your friend on their original known number to verify first',
      'Send half the amount to be safe',
      'Share their message on your status to warn others',
    ],
    correctIndex: 1,
    explanation: 'Scammers create fake profiles using your friend\'s name and photo. Always verify money requests by calling on a number you already know.',
  },
];
