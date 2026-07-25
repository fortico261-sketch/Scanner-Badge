import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface BoutonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-emerald-500 text-white hover:bg-emerald-400 focus:ring-emerald-400/60',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-400/60',
  danger: 'bg-rose-500 text-white hover:bg-rose-400 focus:ring-rose-400/60',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/10 focus:ring-white/20',
};

export default function Bouton({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}: BoutonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>Chargement...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
