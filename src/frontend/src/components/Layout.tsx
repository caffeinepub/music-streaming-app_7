import { ReactNode } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, Library, Search, ListMusic } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: ListMusic, label: 'Playlists', path: '/playlists' },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-y-auto pb-32">
        {children}
      </main>

      <MusicPlayer />

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <footer className="fixed bottom-16 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border py-2 px-4 text-center text-xs text-muted-foreground z-30">
        <p>
          © {new Date().getFullYear()} Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'music-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
