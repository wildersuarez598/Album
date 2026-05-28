import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-3xl bg-panini-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-panini-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
