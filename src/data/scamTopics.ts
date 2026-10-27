import type { LucideIcon } from 'lucide-react';
import {
  Fish,
  ShieldAlert,
  Smartphone,
  Briefcase,
  TrendingUp,
  UserX,
} from 'lucide-react';

export interface ScamTopic {
  id: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  whatItIs: string;
  howTheyApproach: string[];
  warningSigns: string[];
  whatToDo: string[];
  whatNotToDo: string[];
  example: string;
  color: string;
}

export const SCAM_TOPICS: ScamTopic[] = [
  {
    id: 'phishing',
    title: 'Phishing & Fraudulent Links',
    icon: Fish,
    tagline: 'Fake messages and links designed to steal your information',
    color: 'from-cyan-500/20 to-blue-500/10',
    whatItIs:
      'Phishing is when scammers send fake emails, SMS, or messages pretending to be from a trusted source — like your bank, a delivery service, or a government office — to trick you into clicking a link and entering personal details.',
    howTheyApproach: [
      'SMS or WhatsApp messages claiming your account or package needs urgent attention',
      'Emails that look like they come from a bank, shopping site, or government portal',
      'Fake login pages that mirror real websites almost exactly',
      'Messages with shortened links that hide the real destination',
    ],
    warningSigns: [
      'A sense of urgency — "act now or your account will be blocked"',
      'Links that don\'t match the real organisation\'s web address',
      'Spelling mistakes or unusual phrasing',
      'Requests for passwords, OTPs, or card details',
      'Generic greetings like "Dear Customer" instead of your name',
    ],
    whatToDo: [
      'Stop and think before clicking any link',
      'Open the official website or app directly by typing the address yourself',
      'Contact the organisation through a known, verified number',
      'Report the message and delete it',
    ],
    whatNotToDo: [
      'Don\'t click links in unexpected messages',
      'Don\'t enter passwords or OTPs on pages reached through messages',
      'Don\'t trust a message just because it looks official',
      'Don\'t forward suspicious messages to others',
    ],
    example:
      'Fictional example: Priya receives an SMS: "Your bank account is suspended. Verify now: http://secure-bank-verify.xyz/login". The link opens a page that looks exactly like her bank. Had she entered her details, scammers would have stolen her credentials. The real bank URL is completely different.',
  },
  {
    id: 'digital-arrest',
    title: 'Digital Arrest Scams',
    icon: ShieldAlert,
    tagline: 'Fake police or officials threatening you over video calls',
    color: 'from-red-500/20 to-orange-500/10',
    whatItIs:
      'In a digital arrest scam, fraudsters impersonate police, CBI, customs, or other officials — often over a video call — and claim you are involved in a crime. They threaten arrest or legal action and demand money or personal information to "clear" your name.',
    howTheyApproach: [
      'A video or audio call from someone claiming to be a police officer or government official',
      'Claims that your name, Aadhaar, or number is linked to a crime, money laundering, or a parcel with illegal items',
      'Threats of arrest, legal action, or "digital arrest" if you don\'t cooperate immediately',
      'Pressure to keep it secret and not tell family',
      'Demands for payment, bank access, or video "interrogation"',
    ],
    warningSigns: [
      'No real police officer conducts arrests over a video call',
      'Threats and intimidation to create panic',
      'Demand for secrecy — "don\'t tell anyone"',
      'Pressure to transfer money or share bank details',
      'Claims that you must "prove innocence" by paying',
    ],
    whatToDo: [
      'Disconnect the call immediately — real police do not arrest people over video calls',
      'Do not share any personal or financial information',
      'Note the number and report it to the cybercrime helpline',
      'Talk to family, a teacher, or a trusted adult about what happened',
      'If money was lost, report it immediately to increase chances of recovery',
    ],
    whatNotToDo: [
      'Don\'t stay on the call or follow their instructions',
      'Don\'t share Aadhaar, PAN, bank details, or OTPs',
      'Don\'t transfer money to "prove innocence"',
      'Don\'t keep it secret — scammers rely on isolation',
    ],
    example:
      'Fictional example: Rahul gets a video call. The man wears a police-like uniform and says, "Your number is linked to a money laundering case. You are under digital arrest. Transfer ₹50,000 for verification or you will be arrested today." Terrified, Rahul nearly pays — but remembers that police never arrest people over a video call. He hangs up and reports the number.',
  },
  {
    id: 'malicious-apk',
    title: 'Malicious APK / App Scams',
    icon: Smartphone,
    tagline: 'Dangerous apps sent through messages or fake recruiters',
    color: 'from-purple-500/20 to-pink-500/10',
    whatItIs:
      'Scammers send Android application packages (APK files) through WhatsApp, SMS, or fake websites. Once installed, these apps can access your contacts, messages, OTPs, camera, and even bank details — all without you realising it.',
    howTheyApproach: [
      'A WhatsApp message with an .apk file attachment from an unknown sender',
      'A "recruiter" asking you to install an app for a part-time job',
      'A fake delivery or courier message asking you to install a tracking app',
      'Fake versions of popular apps hosted on unofficial websites',
    ],
    warningSigns: [
      'An app sent through a message instead of an official app store',
      'Requests to enable "install from unknown sources"',
      'The app asks for many permissions it shouldn\'t need (contacts, SMS, camera)',
      'No reviews, no developer info, or a name that closely mimics a real app',
    ],
    whatToDo: [
      'Never install apps from messages or unofficial links',
      'Only install from the official Google Play Store or Apple App Store',
      'Check app reviews, developer name, and permissions before installing',
      'Turn off "install unknown apps" in your phone settings',
    ],
    whatNotToDo: [
      'Don\'t install .apk files sent through WhatsApp or SMS',
      'Don\'t grant unnecessary permissions to unknown apps',
      'Don\'t trust an app just because a "recruiter" or "official" sent it',
      'Don\'t forward APK files to others',
    ],
    example:
      'Fictional example: Meena receives a WhatsApp message: "Install this app to start earning ₹2,000/day from home — app.apk". After installing, the app silently reads her OTPs and drains her bank account. The "job" never existed — the app was the scam.',
  },
  {
    id: 'fake-jobs',
    title: 'Fake Job / Part-Time Job Scams',
    icon: Briefcase,
    tagline: 'Fake work offers that lead to lost money, not income',
    color: 'from-amber-500/20 to-yellow-500/10',
    whatItIs:
      'Scammers offer attractive part-time or work-from-home jobs — often "liking videos", "completing tasks", or "data entry" — promising easy money. They first pay small amounts to build trust, then ask you to "invest" to unlock bigger tasks and disappear with your money.',
    howTheyApproach: [
      'WhatsApp or Telegram messages offering high-paying part-time work',
      'Requests to like YouTube videos, rate products, or complete simple tasks for money',
      'Small initial payments to build trust',
      'Gradual demands to "invest" or "deposit" to get larger commissions',
      'A fake recruiter or "task manager" guides you through the process',
    ],
    warningSigns: [
      'Easy money for very little effort',
      'You are asked to pay money to earn money',
      'Communication only through WhatsApp or Telegram, never a verifiable company',
      'Pressure to invest more for bigger returns',
      'No official job posting, contract, or company website',
    ],
    whatToDo: [
      'Remember: real jobs don\'t ask you to pay to work',
      'Research the company name online and check for scam reports',
      'Use official job portals and company websites for applications',
      'Report the message and block the sender',
    ],
    whatNotToDo: [
      'Don\'t pay any "registration", "task", or "investment" fee',
      'Don\'t install apps sent by the "recruiter"',
      'Don\'t share bank details or personal documents',
      'Don\'t trust initial small payments as proof of legitimacy',
    ],
    example:
      'Fictional example: Arjun gets a WhatsApp message: "Part-time job — like YouTube videos and earn ₹500 per task." He does a few tasks and gets ₹200. The "manager" then says, "Deposit ₹5,000 to unlock premium tasks worth ₹10,000." Arjun deposits. The tasks never come. The manager stops replying. The money is gone.',
  },
  {
    id: 'investment',
    title: 'Fake Investment Platforms',
    icon: TrendingUp,
    tagline: 'Fraudulent trading apps that show fake profits and steal deposits',
    color: 'from-green-500/20 to-emerald-500/10',
    whatItIs:
      'Scammers create fake investment or trading apps and websites that show realistic-looking profits and charts. They convince you to invest more and more. When you try to withdraw, the platform freezes your account or demands more "fees" — and your money is gone.',
    howTheyApproach: [
      'Social media ads or messages promising guaranteed high returns',
      'A link to a professional-looking trading or investment app',
      'A "financial advisor" who guides your "investments"',
      'Fake profits and charts that make you feel you\'re earning',
      'Withdrawal blocked until you pay "tax" or "release fees"',
    ],
    warningSigns: [
      'Guaranteed or very high returns with "no risk"',
      'Pressure to invest quickly',
      'No connection to any registered, regulated financial institution',
      'Withdrawals are blocked or delayed',
      'Requests to pay more money to "release" your own funds',
    ],
    whatToDo: [
      'Only invest through SEBI-registered and regulated platforms',
      'Verify any investment app or advisor through official government registries',
      'Be sceptical of guaranteed returns — all real investments carry risk',
      'Report suspicious platforms to the cybercrime helpline',
    ],
    whatNotToDo: [
      'Don\'t invest through links from ads or messages',
      'Don\'t pay "withdrawal fees" or "tax" to get your own money back',
      'Don\'t invest more because of fake profit numbers on a screen',
      'Don\'t share KYC documents with unverified platforms',
    ],
    example:
      'Fictional example: Sneha sees an ad for an investment app promising "double your money in 7 days." She invests ₹3,000 and the app shows ₹6,000 profit. She invests ₹30,000 more. When she tries to withdraw, the app says, "Pay ₹8,000 tax to release funds." She pays. The account freezes. The app vanishes.',
  },
  {
    id: 'social-media',
    title: 'Social-Media Fraud & Blackmail',
    icon: UserX,
    tagline: 'Impersonation, sextortion, and manipulation through social platforms',
    color: 'from-rose-500/20 to-red-500/10',
    whatItIs:
      'Scammers use social media to impersonate friends or celebrities, build fake relationships, steal accounts, or collect compromising material for blackmail. They exploit trust, embarrassment, and fear to extract money or personal information.',
    howTheyApproach: [
      'A fake profile that copies a friend\'s photos and name, then asks for money',
      'A stranger builds a romantic or friendly connection over weeks ("love bombing")',
      'Requests for intimate photos or video calls that are secretly recorded',
      'Threats to share private images unless money is paid',
      '"Your account is being deleted — verify now" messages to steal login details',
    ],
    warningSigns: [
      'A "friend" suddenly asks for money over chat — always verify by calling them',
      'Requests for intimate photos or video calls from someone you\'ve never met',
      'A new connection moves very fast emotionally and then asks for money',
      'Threats, blackmail, or demands to keep conversations secret',
      'Links to "verify" or "restore" your social media account',
    ],
    whatToDo: [
      'Verify money requests by calling your friend on their known number',
      'Never share intimate content with strangers online',
      'If blackmailed, do not pay — report and seek help from trusted people',
      'Report and block fake accounts through the platform\'s safety tools',
      'Preserve evidence (screenshots) and report to the cybercrime helpline',
    ],
    whatNotToDo: [
      'Don\'t send money based on a chat message, even from a "friend"',
      'Don\'t share intimate photos or videos with people you haven\'t met',
      'Don\'t pay a blackmailer — payment usually leads to more demands',
      'Don\'t keep blackmail secret out of shame — support is available',
    ],
    example:
      'Fictional example: Karan gets a friend request from "Ananya" who seems to share his interests. After weeks of chatting, she suggests a private video call and records it. Days later, he receives a message: "Pay ₹50,000 or I\'ll share this video with your contacts." Karan is scared, but instead of paying, he tells his brother, saves the screenshots, and reports it to the cybercrime helpline.',
  },
];
