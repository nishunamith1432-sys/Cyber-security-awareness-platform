import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Bot,
  User,
  Send,
  RotateCcw,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { CHAT_OPTIONS, CHAT_FLOWS } from '@/data/chatFlows';
import type { ChatFlow } from '@/data/chatFlows';

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  type?: 'intro' | 'option' | 'guidance' | 'warning' | 'end';
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: 'bot',
      text: "Hi! I'm your Cyber Safety Assistant. I can help you understand what to do if you've encountered a potential scam. What happened? Select an option below to get started.",
      type: 'intro',
    },
  ]);
  const [activeFlow, setActiveFlow] = useState<ChatFlow | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (text: string, type?: ChatMessage['type']) => {
    const id = msgId.current++;
    setMessages((prev) => [...prev, { id, sender: 'bot', text, type }]);
  };

  const addUserMessage = (text: string) => {
    const id = msgId.current++;
    setMessages((prev) => [...prev, { id, sender: 'user', text }]);
  };

  const handleSelectOption = (optionId: string, label: string) => {
    setSelectedOption(optionId);
    addUserMessage(label);
    const flow = CHAT_FLOWS[optionId];
    if (!flow) return;
    setActiveFlow(flow);
    setStepIndex(0);
    setFollowUpAnswer(null);

    // Process step 0
    setTimeout(() => {
      const step = flow.steps[0];
      let text = step.botMessage;
      if (step.question) {
        text += `\n\n${step.question}`;
      }
      addBotMessage(text, step.followUp ? 'guidance' : 'guidance');
      if (step.followUp) {
        setAwaitingResponse(true);
      }
    }, 400);
  };

  const handleFollowUpResponse = (response: string) => {
    setFollowUpAnswer(response);
    setAwaitingResponse(false);
    addUserMessage(response);

    if (!activeFlow) return;
    const nextIndex = stepIndex + 1;

    setTimeout(() => {
      if (nextIndex < activeFlow.steps.length) {
        const step = activeFlow.steps[nextIndex];
        setStepIndex(nextIndex);

        let text = step.botMessage;
        if (step.question) {
          text += `\n\n${step.question}`;
        }
        addBotMessage(text, 'guidance');

        if (step.guidance.length > 0) {
          setTimeout(() => {
            addBotMessage(step.guidance.map((g) => `• ${g}`).join('\n'), 'guidance');
          }, 600);
        }

        if (step.warningSigns && step.warningSigns.length > 0) {
          setTimeout(() => {
            addBotMessage(`Warning signs to watch for:\n${step.warningSigns.map((w) => `⚠ ${w}`).join('\n')}`, 'warning');
          }, 1100);
        }

        if (step.endMessage) {
          setTimeout(() => {
            addBotMessage(step.endMessage, 'end');
          }, 1500);
        }
      }
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 0,
        sender: 'bot',
        text: "Hi! I'm your Cyber Safety Assistant. I can help you understand what to do if you've encountered a potential scam. What happened? Select an option below to get started.",
        type: 'intro',
      },
    ]);
    setActiveFlow(null);
    setStepIndex(0);
    setAwaitingResponse(false);
    setSelectedOption(null);
    setFollowUpAnswer(null);
    msgId.current = 1;
  };

  const currentStep = activeFlow?.steps[stepIndex];
  const showOptions = !activeFlow;
  const showFollowUp = awaitingResponse && currentStep?.followUp;

  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<MessageSquare className="text-cyber-300" size={32} />}
        title="Cyber Safety Chat Assistant"
        subtitle="Describe what happened and get educational safety guidance. The assistant will never ask for passwords, OTPs, bank details, or any sensitive information."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy note */}
        <div className="mb-4 rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-3 flex items-start gap-2.5">
          <ShieldCheck className="text-cyber-400 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-ink-400 leading-relaxed">
            This is an educational assistant — it provides general safety guidance and does not
            collect or store your personal data. Do not share passwords, OTPs, or bank details here.
          </p>
        </div>

        {/* Chat container */}
        <div className="card flex flex-col h-[600px] overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-500 to-cyber-700 flex items-center justify-center">
                <Bot size={20} className="text-ink-950" />
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm">Safety Assistant</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                  Online
                </p>
              </div>
            </div>
            <button onClick={handleReset} className="btn-ghost text-xs">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-slide-in-${msg.sender === 'user' ? 'left' : 'right'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  msg.sender === 'bot'
                    ? 'bg-gradient-to-br from-cyber-500 to-cyber-700'
                    : 'bg-white/10'
                }`}>
                  {msg.sender === 'bot' ? <Bot size={16} className="text-ink-950" /> : <User size={16} className="text-ink-200" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'bot'
                    ? msg.type === 'warning'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-ink-100 rounded-tl-sm'
                      : msg.type === 'end'
                      ? 'bg-cyber-500/10 border border-cyber-400/20 text-ink-100 rounded-tl-sm'
                      : 'bg-white/[0.05] border border-white/10 text-ink-100 rounded-tl-sm'
                    : 'bg-cyber-500/15 border border-cyber-400/20 text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input area — options or follow-up */}
          <div className="border-t border-white/10 p-4 bg-white/[0.02]">
            {showOptions && (
              <div>
                <p className="text-xs text-ink-500 mb-2 uppercase tracking-wider font-medium">Select your situation:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CHAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.flowId, opt.label)}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-cyber-400/30 hover:bg-cyber-500/5 text-sm text-ink-200 hover:text-white transition-all text-left group"
                    >
                      <ChevronRight size={14} className="text-cyber-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showFollowUp && currentStep?.followUp && (
              <div>
                <p className="text-xs text-ink-500 mb-2 uppercase tracking-wider font-medium">
                  {currentStep.followUp.prompt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentStep.followUp.responses.map((resp) => (
                    <button
                      key={resp}
                      onClick={() => handleFollowUpResponse(resp)}
                      className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-cyber-400/30 hover:bg-cyber-500/5 text-sm text-ink-200 hover:text-white transition-all"
                    >
                      {resp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* If flow complete, show reset hint */}
            {!showOptions && !showFollowUp && activeFlow && stepIndex >= activeFlow.steps.length - 1 && !awaitingResponse && (
              <div className="flex items-center justify-center gap-2 text-sm text-ink-500">
                <AlertTriangle size={14} className="text-amber-400" />
                <span>Need help with something else?</span>
                <button onClick={handleReset} className="text-cyber-300 hover:text-cyber-200 font-medium">
                  Start a new chat
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-ink-500 text-center leading-relaxed">
          This assistant provides general educational guidance only. It cannot detect scams with
          certainty or replace official reporting. If you\'ve been scammed, contact the cybercrime helpline.
        </p>
      </div>
    </div>
  );
}
