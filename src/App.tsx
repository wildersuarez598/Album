import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AlbumPage } from './pages/AlbumPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { useAppStore } from './store/useAppStore';
import { defaultAlbumStickers } from './data/sampleStickers';
import { getCurrentUser, onAuthStateChange } from './services/authService';
import type { User } from './types';

const createGuestUser = (): User => ({
  id: 'guest',
  email: 'invitado@local',
  full_name: 'Usuario invitado'
});

export default function App() {
  const { user, setUser, setIsGuest, setStickers, stickers } = useAppStore();

  useEffect(() => {
    const loadInitialState = async () => {
      const { data: userData } = await getCurrentUser();
      if (userData.user) {
        setUser({
          id: userData.user.id,
          email: userData.user.email ?? '',
          full_name: (userData.user.user_metadata as any)?.full_name ?? 'Usuario',
          avatar_url: (userData.user.user_metadata as any)?.avatar_url
        });
        setIsGuest(false);
      } else {
        setUser(createGuestUser());
        setIsGuest(true);
      }

      const stored = window.localStorage.getItem('panini_stickers');
      if (stored) {
        try {
          setStickers(JSON.parse(stored));
          return;
        } catch {
          // ignore invalid local data
        }
      }

      setStickers(defaultAlbumStickers);
    };

    loadInitialState();

    const { data } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name: (session.user.user_metadata as any)?.full_name ?? 'Usuario',
          avatar_url: (session.user.user_metadata as any)?.avatar_url
        });
        setIsGuest(false);
      }

      if (event === 'SIGNED_OUT') {
        setUser(createGuestUser());
        setIsGuest(true);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [setUser, setIsGuest, setStickers]);

  useEffect(() => {
    if (stickers.length > 0) {
      window.localStorage.setItem('panini_stickers', JSON.stringify(stickers));
    }
  }, [stickers]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Routes>
        <Route path="/" element={<AppShell />}> 
          <Route index element={<HomePage />} />
          <Route
            path="album"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <AlbumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}
