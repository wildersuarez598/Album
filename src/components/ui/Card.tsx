import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-soft ${className}`}>
      {title ? <h3 className="mb-4 text-lg font-semibold text-slate-100">{title}</h3> : null}
      {children}
    </section>
  );
}
