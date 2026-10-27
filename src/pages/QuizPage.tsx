import { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  Award,
  TrendingUp,
} from 'lucide-react';
import { PageHeader } from '@/components/SectionHeader';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import type { QuizQuestion } from '@/data/quiz';

const TOPIC_LABELS: Record<QuizQuestion['topic'], string> = {
  Phishing: 'Phishing',
  'Digital Arrest': 'Digital Arrest',
  'Malicious Apps': 'Malicious Apps',
  'Social Media Safety': 'Social Media Safety',
};

export function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];
  const selectedAnswer = answers[currentIdx];

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
  };

  const handleAdvance = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setShowFeedback(false);
    setCompleted(false);
  };

  // Results
  if (completed) {
    const correctCount = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correctIndex).length;
    const total = QUIZ_QUESTIONS.length;

    // Topic-wise performance
    const topics = Object.keys(TOPIC_LABELS) as QuizQuestion['topic'][];
    const topicStats = topics.map((topic) => {
      const topicQs = QUIZ_QUESTIONS.filter((q) => q.topic === topic);
      const topicCorrect = topicQs.filter((q) => {
        const quizIdx = QUIZ_QUESTIONS.indexOf(q);
        return answers[quizIdx] === q.correctIndex;
      }).length;
      return { topic, correct: topicCorrect, total: topicQs.length };
    }).filter((t) => t.total > 0);

    return (
      <div className="min-h-screen">
        <PageHeader
          icon={<Brain className="text-cyber-300" size={32} />}
          title="Cyber Awareness Quiz"
          subtitle="10 questions across phishing, digital arrest, malicious apps, and social-media safety."
        />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Score */}
          <div className="card p-8 text-center animate-scale-in">
            <div className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-cyber-500/20 to-cyber-700/10 border border-cyber-400/20 items-center justify-center mb-4">
              <Award className="text-cyber-300" size={40} />
            </div>
            <p className="text-ink-400 text-sm uppercase tracking-wider font-medium">Your Cyber Awareness Score</p>
            <p className="font-display text-5xl font-bold text-white mt-2">
              {correctCount}<span className="text-ink-500 text-3xl">/{total}</span>
            </p>
            <p className="mt-4 text-ink-300 text-sm leading-relaxed max-w-md mx-auto">
              {correctCount === total
                ? 'Perfect score! You have excellent cyber safety awareness. Share your knowledge with friends and family.'
                : correctCount >= 7
                ? 'Good awareness! A few topics could use a quick review — check the feedback below.'
                : correctCount >= 5
                ? 'You have basic awareness but important gaps. We recommend reviewing the Learn section.'
                : 'Your awareness needs strengthening. Please go through the Learn section and try again.'}
            </p>
          </div>

          {/* Topic-wise performance */}
          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-display font-semibold text-white text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-cyber-300" />
              Topic-wise Performance
            </h3>
            <div className="space-y-3">
              {topicStats.map((stat) => {
                const pct = (stat.correct / stat.total) * 100;
                return (
                  <div key={stat.topic}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-ink-200">{TOPIC_LABELS[stat.topic]}</span>
                      <span className={`text-sm font-medium ${
                        pct === 100 ? 'text-emerald-300' : pct >= 50 ? 'text-amber-300' : 'text-red-300'
                      }`}>
                        {stat.correct}/{stat.total}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          pct === 100 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question review */}
          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-display font-semibold text-white text-lg mb-4">Question Review</h3>
            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === q.correctIndex;
                return (
                  <div key={q.id} className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                    <div className="flex items-start gap-2.5 mb-2">
                      {isCorrect ? (
                        <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                      ) : (
                        <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                      )}
                      <p className="text-sm text-ink-100 font-medium">{q.question}</p>
                    </div>
                    <p className="text-xs text-ink-400 ml-7">
                      {isCorrect ? (
                        <>Correct: <span className="text-emerald-300">{q.options[q.correctIndex]}</span></>
                      ) : (
                        <>
                          Your answer: <span className="text-red-300">{userAnswer !== null ? q.options[userAnswer] : 'Not answered'}</span>
                          {' · '}Correct: <span className="text-emerald-300">{q.options[q.correctIndex]}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-ink-400 mt-1.5 ml-7 leading-relaxed">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={handleRestart} className="btn-primary">
              <RotateCcw size={18} /> Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question
  return (
    <div className="min-h-screen">
      <PageHeader
        icon={<Brain className="text-cyber-300" size={32} />}
        title="Cyber Awareness Quiz"
        subtitle="10 questions to test your knowledge. Navigate with Next/Previous. Your score and topic-wise performance appear at the end."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-400">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyber-500/10 text-cyber-300 border border-cyber-400/20">
              {question.topic}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-cyber-500 transition-all duration-300"
              style={{ width: `${((currentIdx + (showFeedback ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card p-6 animate-fade-in-up" key={question.id}>
          <p className="font-display text-lg text-white font-medium mb-5 leading-relaxed">{question.question}</p>

          <div className="space-y-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const showCorrect = showFeedback && idx === question.correctIndex;
              const showWrong = showFeedback && isSelected && idx !== question.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    showCorrect
                      ? 'border-emerald-500/40 bg-emerald-500/10'
                      : showWrong
                      ? 'border-red-500/40 bg-red-500/10'
                      : isSelected
                      ? 'border-cyber-400/40 bg-cyber-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    showCorrect
                      ? 'border-emerald-500 bg-emerald-500 text-ink-950'
                      : showWrong
                      ? 'border-red-500 bg-red-500 text-ink-950'
                      : isSelected
                      ? 'border-cyber-400 bg-cyber-500/20 text-cyber-300'
                      : 'border-white/20 text-ink-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm text-ink-100 leading-relaxed flex-1">{opt}</span>
                  {showCorrect && <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />}
                  {showWrong && <XCircle className="text-red-400 flex-shrink-0" size={18} />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="mt-5 rounded-xl bg-cyber-500/5 border border-cyber-400/15 p-4 animate-fade-in-up">
              <h4 className="flex items-center gap-2 font-display font-semibold text-cyber-300 text-sm uppercase tracking-wider mb-2">
                <Lightbulb size={16} /> Explanation
              </h4>
              <p className="text-sm text-ink-200 leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} /> Previous
            </button>

            {!showFeedback ? (
              <button onClick={handleNext} disabled={selectedAnswer === null} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                Check Answer
                <ChevronRight size={18} />
              </button>
            ) : (
              <button onClick={handleAdvance} className="btn-primary">
                {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Question dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {QUIZ_QUESTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIdx(i); setShowFeedback(false); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIdx
                  ? 'bg-cyber-400 w-6'
                  : answers[i] !== null
                  ? 'bg-cyber-700'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
