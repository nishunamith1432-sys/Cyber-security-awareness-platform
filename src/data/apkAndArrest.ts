export interface ApkScenario {
  id: string;
  situation: string;
  sender: string;
  message: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  risks: string[];
  saferAlternative: string;
}

export const APK_SCENARIOS: ApkScenario[] = [
  {
    id: 'apk-whatsapp',
    situation: 'Someone sends you an APK through WhatsApp',
    sender: 'Unknown number',
    message: 'Install this app to earn ₹2,000/day working from home. Only 10 spots left! [app.apk]',
    question: 'Would you install this application?',
    options: [
      { id: 'a', text: 'Yes, install it and start earning', isCorrect: false, explanation: 'This APK can silently access your OTPs, contacts, and banking apps. The "job" is fake.' },
      { id: 'b', text: 'No — never install APKs from WhatsApp messages', isCorrect: true, explanation: 'Correct. Only install from the official Play Store or App Store.' },
      { id: 'c', text: 'Install it but don\'t open it', isCorrect: false, explanation: 'Malicious apps can work in the background even if you never open them. Don\'t install at all.' },
    ],
    risks: [
      'The app can read your SMS messages — including OTPs for bank logins',
      'It can access your contacts and spread the scam to your friends',
      'It can access your camera, microphone, and files',
      'It can capture your banking app credentials',
    ],
    saferAlternative: 'Ignore and block the sender. If you\'re looking for work, use official job portals and company websites. Only install apps from the Google Play Store or Apple App Store.',
  },
  {
    id: 'apk-recruiter',
    situation: 'A fake job recruiter asks you to install an app',
    sender: '"HR Manager" on Telegram',
    message: 'Congratulations on being selected! Download our work app to start your tasks and receive payments. Link: http://work-app-2024.xyz/download',
    question: 'Would you install this application?',
    options: [
      { id: 'a', text: 'Yes, download it to start the job', isCorrect: false, explanation: 'No legitimate company asks you to download an app from a random link. This is a scam.' },
      { id: 'b', text: 'No — legitimate companies use official app stores and verifiable websites', isCorrect: true, explanation: 'Correct. Real employers provide apps through official stores or a company website you can verify.' },
      { id: 'c', text: 'Download it on a friend\'s phone to test it first', isCorrect: false, explanation: 'Installing a malicious app on any phone puts that device and its owner at risk. Don\'t install it anywhere.' },
    ],
    risks: [
      'Apps from unofficial links are not reviewed for safety',
      'They can request dangerous permissions like reading SMS and accessing contacts',
      'Scammers use fake "jobs" as bait to get you to install malware',
      'The "payment" system in the app is fake — your real bank account is the target',
    ],
    saferAlternative: 'Verify any company through its official website and online reviews. Real recruiters communicate through company email addresses and official channels — not Telegram links to download apps.',
  },
  {
    id: 'apk-delivery',
    situation: 'A fake delivery message asks you to install an application',
    sender: 'DL-ParcelS',
    message: 'Your package could not be delivered. Install the delivery app to update your address and reschedule: http://parcel-update.top/app.apk',
    question: 'Would you install this application?',
    options: [
      { id: 'a', text: 'Yes, so I can receive my package', isCorrect: false, explanation: 'Real courier services never ask you to install an app from a link in a message. This is a scam.' },
      { id: 'b', text: 'No — check delivery status through the official courier app or website', isCorrect: true, explanation: 'Correct. Always use the official app or website you already know for delivery updates.' },
      { id: 'c', text: 'Install it, update my address, then uninstall', isCorrect: false, explanation: 'Even a few minutes is enough for a malicious app to steal data. Don\'t install it at all.' },
    ],
    risks: [
      'Fake delivery messages are a common way to distribute malware',
      'The APK can steal personal information and banking credentials',
      'Scammers use fake delivery problems because they seem believable',
      'The .top domain and link are not from any real courier service',
    ],
    saferAlternative: 'If you\'re expecting a package, check the tracking through the official website or app of the courier (e.g., India Post, DTDC, BlueDart, Delhivery). Never install apps from links in delivery messages.',
  },
];

export interface DigitalArrestChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export const DIGITAL_ARREST_SCENARIO = {
  situation: 'A person claiming to be a police officer contacts you through a video call and says you are involved in a crime and must immediately pay money.',
  scene: 'You receive a video call. The person on the screen appears to be wearing a police uniform and is sitting in front of what looks like an office with a flag. They say:',
  message: '"This is Officer Verma from the Cyber Crime Division. Your Aadhaar number has been linked to a money laundering case. You are under digital arrest. For your own safety, do not disconnect this call and do not tell anyone. You need to transfer ₹1,00,000 to a verification account so we can investigate. If you don\'t, you will be arrested within the hour."',
  question: 'What should you do?',
  choices: [
    { id: 'a', text: 'Stay on the call and transfer the money to prove your innocence', isCorrect: false, explanation: 'No real police officer arrests anyone over a video call or asks for money. "Digital arrest" is not a real legal procedure. Paying will only feed the scam.' },
    { id: 'b', text: 'Disconnect the call immediately, tell family, and report to the cybercrime helpline', isCorrect: true, explanation: 'Correct. This is the safest response. Real police do not conduct arrests over video calls. Disconnect, talk to people you trust, and report the number.' },
    { id: 'c', text: 'Stay on the call but refuse to pay and argue with them', isCorrect: false, explanation: 'While not paying is right, staying on the call is not safe. Scammers are skilled at manipulation and can wear you down. Disconnect immediately.' },
    { id: 'd', text: 'Share your Aadhaar number so they can "verify" you\'re not involved', isCorrect: false, explanation: 'Never share personal documents with unknown callers. Scammers can use Aadhaar details for identity theft. Disconnect and report.' },
  ] as DigitalArrestChoice[],
  keyFacts: [
    '"Digital arrest" is not a real legal procedure — it does not exist in law',
    'No police officer conducts arrests over phone or video calls',
    'Real police never ask you to transfer money to "verify" or "clear" your name',
    'Scammers use uniforms, fake offices, and official-sounding language to seem real',
    'They demand secrecy to isolate you from people who could help you see the truth',
  ],
  whatToDo: [
    'Disconnect the call immediately',
    'Do not share any personal or financial information',
    'Tell a family member, teacher, or trusted adult what happened',
    'Note the phone number and report it to the cybercrime helpline',
    'If money was already transferred, report immediately — early action can help recovery',
  ],
};
