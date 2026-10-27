import { useState, lazy, Suspense } from 'react';
import { Navbar, type PageId } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { LearnPage } from '@/pages/LearnPage';
import { CheckPage } from '@/pages/CheckPage';
import { DigitalArrestPage, ApkAwarenessPage } from '@/pages/ActivitiesPage';

const ChatPage = lazy(() => import('@/pages/ChatPage').then((m) => ({ default: m.ChatPage })));
const TestAwarenessPage = lazy(() => import('@/pages/TestAwarenessPage').then((m) => ({ default: m.TestAwarenessPage })));
const QuizPage = lazy(() => import('@/pages/QuizPage').then((m) => ({ default: m.QuizPage })));
const SpotScamPage = lazy(() => import('@/pages/SpotScamPage').then((m) => ({ default: m.SpotScamPage })));
const SurveyPage = lazy(() => import('@/pages/SurveyPage').then((m) => ({ default: m.SurveyPage })));
const EmergencyPage = lazy(() => import('@/pages/EmergencyPage').then((m) => ({ default: m.EmergencyPage })));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-cyber-500/30 border-t-cyber-400 animate-spin" />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<PageId>('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={setPage} />;
      case 'learn':
        return <LearnPage />;
      case 'check':
        return <CheckPage />;
      case 'chat':
        return (
          <Suspense fallback={<PageLoader />}>
            <ChatPage />
          </Suspense>
        );
      case 'test':
        return (
          <Suspense fallback={<PageLoader />}>
            <TestAwarenessPage />
          </Suspense>
        );
      case 'quiz':
        return (
          <Suspense fallback={<PageLoader />}>
            <QuizPage />
          </Suspense>
        );
      case 'game':
        return (
          <Suspense fallback={<PageLoader />}>
            <SpotScamPage />
          </Suspense>
        );
      case 'survey':
        return (
          <Suspense fallback={<PageLoader />}>
            <SurveyPage />
          </Suspense>
        );
      case 'emergency':
        return (
          <Suspense fallback={<PageLoader />}>
            <EmergencyPage />
          </Suspense>
        );
      default:
        return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <Navbar current={page} onNavigate={setPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={setPage} />
    </div>
  );
}
