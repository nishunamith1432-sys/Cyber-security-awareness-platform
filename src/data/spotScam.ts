export interface SpotScamSegment {
  id: number;
  text: string;
  isSuspicious: boolean;
  reason: string;
  category: 'link' | 'urgency' | 'reward' | 'personal-info' | 'authority' | 'payment';
}

export interface SpotScamMessage {
  id: string;
  type: 'SMS' | 'Email' | 'WhatsApp' | 'Social Media';
  sender: string;
  segments: SpotScamSegment[];
  afterText: string;
}

export const SPOT_SCAM_MESSAGES: SpotScamMessage[] = [
  {
    id: 'msg-1',
    type: 'SMS',
    sender: 'BK-BANKALRT',
    segments: [
      { id: 1, text: 'Dear Customer, ', isSuspicious: false, reason: '', category: 'link' },
      { id: 2, text: 'your account has been temporarily suspended. ', isSuspicious: true, reason: 'Creates fear and urgency to make you act without thinking.', category: 'urgency' },
      { id: 3, text: 'Verify within 24 hours ', isSuspicious: true, reason: 'A deadline is a pressure tactic — real banks don\'t threaten like this.', category: 'urgency' },
      { id: 4, text: 'or your account will be permanently closed. ', isSuspicious: true, reason: 'Threats of permanent closure are designed to create panic.', category: 'urgency' },
      { id: 5, text: 'Click here: ', isSuspicious: false, reason: '', category: 'link' },
      { id: 6, text: 'http://secure-bank-verify.xyz/login', isSuspicious: true, reason: 'Suspicious link — .xyz domain and "verify" wording imitate a bank. Real banks use their own domain.', category: 'link' },
    ],
    afterText: 'This is a phishing SMS. It uses urgency and a fake link to trick you into entering your bank details on a lookalike page.',
  },
  {
    id: 'msg-2',
    type: 'WhatsApp',
    sender: '+91 98xxx xxxxx',
    segments: [
      { id: 1, text: 'Namaste, ', isSuspicious: false, reason: '', category: 'authority' },
      { id: 2, text: 'this is CBI Officer Sharma. ', isSuspicious: true, reason: 'Fake authority claim — scammers impersonate officials to intimidate.', category: 'authority' },
      { id: 3, text: 'Your mobile number is linked to a money laundering case. ', isSuspicious: true, reason: 'A serious accusation to create panic. Real police don\'t inform you of cases over WhatsApp.', category: 'authority' },
      { id: 4, text: 'You are under digital arrest. ', isSuspicious: true, reason: '"Digital arrest" is not a real legal procedure. It is a scam tactic.', category: 'authority' },
      { id: 5, text: 'Transfer ₹50,000 for verification ', isSuspicious: true, reason: 'Demand for payment — no real authority asks you to pay to "verify" anything.', category: 'payment' },
      { id: 6, text: 'or you will be arrested today.', isSuspicious: true, reason: 'Threat of arrest to force immediate payment. This never happens over a call.', category: 'urgency' },
    ],
    afterText: 'This is a digital arrest scam. No real police officer arrests anyone over a call or asks for money. Disconnect and report.',
  },
  {
    id: 'msg-3',
    type: 'Email',
    sender: 'reward@claim-prizes.top',
    segments: [
      { id: 1, text: 'Congratulations! ', isSuspicious: true, reason: 'Unexpected congratulations for a prize you never entered is a classic hook.', category: 'reward' },
      { id: 2, text: 'You have won a ₹5,000 reward! ', isSuspicious: true, reason: 'A fake reward to tempt you into clicking.', category: 'reward' },
      { id: 3, text: 'Claim it immediately ', isSuspicious: true, reason: 'Urgency — scammers want you to act fast, before you think.', category: 'urgency' },
      { id: 4, text: 'using the link below: ', isSuspicious: false, reason: '', category: 'link' },
      { id: 5, text: 'http://bit.ly/claim-reward-now', isSuspicious: true, reason: 'A shortened URL hides the real destination. Scammers use shorteners to disguise malicious links.', category: 'link' },
      { id: 6, text: ' Provide your bank details and OTP to receive the money.', isSuspicious: true, reason: 'No legitimate organisation asks for OTPs or bank details over a message.', category: 'personal-info' },
    ],
    afterText: 'This email combines a fake reward, urgency, a shortened link, and a request for OTP — multiple red flags. Never share OTPs.',
  },
  {
    id: 'msg-4',
    type: 'SMS',
    sender: 'DL-DLVRY',
    segments: [
      { id: 1, text: 'Your package is on hold. ', isSuspicious: true, reason: 'A fake delivery problem to get your attention.', category: 'urgency' },
      { id: 2, text: 'Pay ₹35 delivery charge ', isSuspicious: true, reason: 'A small payment request — scammers use low amounts to seem believable.', category: 'payment' },
      { id: 3, text: 'to resume delivery: ', isSuspicious: false, reason: '', category: 'link' },
      { id: 4, text: 'http://delivery-update.top/track', isSuspicious: true, reason: 'Suspicious .top domain and generic "delivery-update" name — not a real courier service.', category: 'link' },
      { id: 5, text: ' Install the tracking app to update your address.', isSuspicious: true, reason: 'Being asked to install an app from a message is a sign of a malicious APK scam.', category: 'personal-info' },
    ],
    afterText: 'This is a fake delivery scam. Real couriers don\'t ask for payment through random links or make you install apps from messages.',
  },
];
