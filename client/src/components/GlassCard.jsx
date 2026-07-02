export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <div className={`
      bg-surface-glass backdrop-blur-xl border border-border rounded-[2rem] p-6 sm:p-8
      ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-border-highlight hover:shadow-2xl hover:shadow-brandBlue/10 group' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}