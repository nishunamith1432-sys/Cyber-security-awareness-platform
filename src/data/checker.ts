export type RiskLevel = 'high' | 'medium' | 'low';

export interface WarningSign {
  sign: string;
  why: string;
}

export interface CheckResult {
  level: RiskLevel;
  score: number;
  signs: WarningSign[];
  recommendation: string;
}

const URL_SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'rebrand.ly', 'cutt.ly', 'shorte.st'];
const URGENT_WORDS = ['urgent', 'immediately', 'now', 'hurry', 'limited', 'expires', 'last chance', 'act now', 'warning', 'alert', 'suspended', 'blocked', 'verify now', 'within 24 hours', 'today only'];
const SENSITIVE_REQUESTS = ['otp', 'password', 'pin', 'bank', 'account', 'card', 'cvv', 'aadhaar', 'pan', 'upi', 'otp', 'otp-', 'otp-', 'one time password'];
const REWARD_WORDS = ['won', 'winner', 'reward', 'prize', 'congratulations', 'lucky', 'free', 'gift', 'cashback', 'lottery'];
const AUTHORITY_WORDS = ['police', 'cbi', 'cid', 'customs', 'narcotics', 'interpol', 'court', 'judge', 'fbr', 'income tax', 'enforcement', 'cyber crime', 'official', 'government'];
const SUSPICIOUS_TLDS = ['.xyz', '.top', '.click', '.loan', '.work', '.men', '.review', '.country', '.stream', '.download', '.tk', '.ml', '.ga', '.cf', '.gq'];

function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+|[^\s]+\.[a-z]{2,}(?:\/[^\s]*)?)/gi;
  return text.match(urlRegex) ?? [];
}

function analyzeUrl(url: string): WarningSign[] {
  const signs: WarningSign[] = [];
  const lower = url.toLowerCase();

  if (!lower.startsWith('https://')) {
    signs.push({
      sign: 'No HTTPS encryption',
      why: 'Legitimate sites that handle personal data use HTTPS. A link without it is a warning sign.',
    });
  }

  const shortener = URL_SHORTENERS.find((s) => lower.includes(s));
  if (shortener) {
    signs.push({
      sign: `URL shortener detected (${shortener})`,
      why: 'Shorteners hide the real destination. Scammers use them to disguise malicious links.',
    });
  }

  const suspiciousTld = SUSPICIOUS_TLDS.find((t) => lower.endsWith(t) || lower.includes(`${t}/`));
  if (suspiciousTld) {
    signs.push({
      sign: `Unusual domain ending (${suspiciousTld})`,
      why: 'Scammers often register cheap, uncommon domain extensions to impersonate real organisations.',
    });
  }

  const specialMatches = lower.match(/[0-9@_%-]{4,}/g);
  if (specialMatches) {
    signs.push({
      sign: 'Excessive special characters or numbers',
      why: 'Long strings of numbers, dashes, or symbols often indicate a fake or auto-generated domain.',
    });
  }

  // Lookalike domain check
  const lookalikes = ['amaz0n', 'g00gle', 'faceb00k', 'paypa1', 'micros0ft', 'app1e', 'netfl1x', 'instagraam'];
  const matched = lookalikes.find((l) => lower.includes(l));
  if (matched) {
    signs.push({
      sign: 'Lookalike / spoofed brand name',
      why: `Scammers use slight misspellings (like "${matched}") to imitate trusted companies.`,
    });
  }

  // Subdomain trickery — many dots before the real domain
  const dots = (lower.match(/\./g) ?? []).length;
  if (dots >= 4) {
    signs.push({
      sign: 'Many subdomains / suspicious structure',
      why: 'A large number of dots can mean the real site is buried under fake subdomains to mislead you.',
    });
  }

  // IP address as host
  if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(lower)) {
    signs.push({
      sign: 'Raw IP address used as link',
      why: 'Legitimate services use domain names, not raw IP addresses. This is a common scam tactic.',
    });
  }

  return signs;
}

function analyzeMessage(text: string): WarningSign[] {
  const signs: WarningSign[] = [];
  const lower = text.toLowerCase();

  for (const word of URGENT_WORDS) {
    if (lower.includes(word)) {
      signs.push({
        sign: `Urgency / pressure language ("${word}")`,
        why: 'Scammers create panic so you act before thinking. Real organisations rarely demand instant action.',
      });
      break;
    }
  }

  for (const word of SENSITIVE_REQUESTS) {
    if (lower.includes(word)) {
      signs.push({
        sign: `Request for sensitive info ("${word}")`,
        why: 'No genuine bank, company, or authority asks for passwords, OTPs, or card details over a message.',
      });
      break;
    }
  }

  for (const word of REWARD_WORDS) {
    if (lower.includes(word)) {
      signs.push({
        sign: `Unexpected reward / prize ("${word}")`,
        why: 'Messages about prizes you never entered for are a classic scam hook.',
      });
      break;
    }
  }

  for (const word of AUTHORITY_WORDS) {
    if (lower.includes(word)) {
      signs.push({
        sign: `Authority claim ("${word}")`,
        why: 'Scammers impersonate police, officials, or government agencies to intimidate victims.',
      });
      break;
    }
  }

  if (lower.includes('pay') || lower.includes('payment') || lower.includes('transfer') || lower.includes('deposit') || lower.includes('₹') || lower.includes('rs.') || lower.includes('rupees')) {
    signs.push({
      sign: 'Request for payment / money transfer',
      why: 'Being asked to pay or transfer money in an unexpected message is a major red flag.',
    });
  }

  if (lower.includes('install') || lower.includes('download') || lower.includes('.apk')) {
    signs.push({
      sign: 'Request to install / download an app',
      why: 'Installing apps from messages or unofficial sources can give scammers access to your device.',
    });
  }

  if (lower.includes('whatsapp') && lower.includes('forward')) {
    signs.push({
      sign: 'Forwarding pressure',
      why: 'Being asked to forward a message to many people is a way scams spread. Pause before sharing.',
    });
  }

  return signs;
}

export function checkInput(input: string): CheckResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { level: 'low', score: 0, signs: [], recommendation: 'Paste a message or link above to run a preliminary awareness check.' };
  }

  const isUrl = /^(https?:\/\/)?[^\s]+\.[a-z]{2,}/i.test(trimmed) && !trimmed.includes(' ') && trimmed.length < 300;
  const urls = extractUrls(trimmed);

  const allSigns: WarningSign[] = [];

  if (isUrl) {
    allSigns.push(...analyzeUrl(trimmed));
  } else {
    allSigns.push(...analyzeMessage(trimmed));
    for (const u of urls) {
      allSigns.push(...analyzeUrl(u));
    }
  }

  // Deduplicate by sign text
  const seen = new Set<string>();
  const unique = allSigns.filter((s) => {
    if (seen.has(s.sign)) return false;
    seen.add(s.sign);
    return true;
  });

  const score = unique.length;
  let level: RiskLevel = 'low';
  if (score >= 4) level = 'high';
  else if (score >= 2) level = 'medium';

  let recommendation: string;
  if (level === 'high') {
    recommendation = 'Do NOT click any links, share personal details, or make payments. Delete the message and report it. If you already acted, contact the official cybercrime helpline immediately.';
  } else if (level === 'medium') {
    recommendation = 'Be cautious. Do not click links or share information. Verify through an official, known channel before taking any action.';
  } else {
    recommendation = 'No major warning signs detected — but this does NOT mean it is safe. Always verify through official channels if anything feels off.';
  }

  return { level, score, signs: unique, recommendation };
}

export const CHECK_EXAMPLES = [
  'Congratulations! You have won a ₹5,000 reward. Claim it immediately using this link: http://bit.ly/claim-reward-now',
  'Your bank account has been suspended. Verify your details within 24 hours to avoid permanent block: http://secure-bank-verify.xyz/login',
  'Dear customer, your package is on hold. Pay ₹35 delivery charge to resume delivery: http://delivery-update.top/track',
  'Namaste, this is CBI officer Sharma. Your number is linked to a money laundering case. Call 98xxxxxxxx immediately or face legal action.',
];
