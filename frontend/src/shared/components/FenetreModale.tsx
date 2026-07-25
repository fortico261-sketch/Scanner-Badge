import { useEffect, type ReactNode } from 'react';

interface FenetreModaleProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  closeOnBackdropClick?: boolean;
}

export default function FenetreModale({
  open,
  onClose,
  title,
  children,
  footer,
  className = '',
  contentClassName = '',
  closeOnBackdropClick = true,
}: FenetreModaleProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm ${className}`.trim()}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={`w-full max-w-lg rounded-[24px] border border-white/10 bg-slate-700 p-6 shadow-2xl ${contentClassName}`.trim()}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>{title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}</div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Fermer"
            >
              ×
            </button>
          ) : null}
        </div>

        <div className="text-sm leading-6 text-slate-200">{children}</div>

        {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  );
}
