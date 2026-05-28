import { Link } from 'react-router-dom';
import { ArrowLeft, ImageOff } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-4 py-10">
      <section className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 p-10 text-center shadow-soft">
        <ImageOff className="mx-auto h-16 w-16 text-panini-400" />
        <h1 className="mt-6 text-4xl font-semibold text-slate-100">Página no encontrada</h1>
        <p className="mt-4 text-slate-400">La ruta que buscas no existe o fue removida.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-3xl bg-panini-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-panini-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a inicio
        </Link>
      </section>
    </main>
  );
}
