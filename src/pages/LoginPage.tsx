import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { signIn } from '../services/authService';
import { useAppStore } from '../store/useAppStore';

export function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);
  const setIsGuest = useAppStore((state) => state.setIsGuest);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      setUser({ id: data.user.id, email: data.user.email ?? '', full_name: data.user.user_metadata.full_name ?? '', avatar_url: data.user.user_metadata.avatar_url });
      setIsGuest(false);
      navigate('/');
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
      <section className="w-full space-y-6 rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Bienvenido</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-100">Inicia sesión</h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.35em]">Email</span>
            </div>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-3 w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              type="email"
              placeholder="usuario@ejemplo.com"
              required
            />
          </label>
          <label className="block rounded-3xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Lock className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.35em]">Contraseña</span>
            </div>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              type="password"
              placeholder="********"
              required
            />
          </label>
          {error && <p className="rounded-2xl bg-red-950/80 px-4 py-3 text-sm text-red-300">{error}</p>}
          <button className="w-full rounded-3xl bg-panini-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-panini-500" type="submit">
            Entrar
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          ¿No tienes cuenta?{' '}
          <Link className="text-panini-300 hover:text-panini-200" to="/auth/register">
            Regístrate
          </Link>
        </p>
      </section>
    </main>
  );
}
