import { ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';
import type { PageId } from './Navbar';
import { NAV_ITEMS } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-ink-950 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-ink-400 max-w-xs">
              A cyber safety awareness platform to help people recognise, avoid,
              and report online scams.
            </p>
            <div className="flex items-center gap-2 text-sm text-cyber-300">
              <ShieldCheck size={16} />
              <span>Stop. Think. Verify. Then Act.</span>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="text-sm text-ink-400 hover:text-cyber-300 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Important
            </h3>
            <p className="text-sm text-ink-400 leading-relaxed">
              This platform is for educational awareness only. It cannot guarantee
              that any link or message is safe or fraudulent. Always verify through
              official channels and report cybercrime to the appropriate authority.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} C4G. For educational purposes.
          </p>
          <p className="text-xs text-ink-500 flex items-center gap-1.5">
            Built with <Heart size={12} className="text-cyber-400" /> for cyber safety awareness
          </p>
        </div>
      </div>
    </footer>
  );
}
