interface ChargementProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

export default function Chargement({
  message = 'Chargement...',
  fullScreen = false,
  size = 'md',
}: ChargementProps) {
  const content = (
    <div className={`flex items-center justify-center gap-3 ${fullScreen ? 'min-h-screen' : ''}`}>
      <div className={`animate-spin rounded-full border-slate-300/40 border-t-emerald-500 ${sizeClasses[size]}`} />
      <span className={`text-sm font-medium ${fullScreen ? 'text-slate-100' : 'text-slate-600'}`}>{message}</span>
    </div>
  );

  if (!fullScreen) {
    return content;
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">{content}</div>;
}
