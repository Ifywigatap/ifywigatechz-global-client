export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const base = "inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-95";
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };
  
  const variants = {
    primary: "bg-brandBlue text-white shadow-lg hover:shadow-brandBlue/30 hover:-translate-y-0.5",
    gold: "bg-gradient-to-r from-brandGold to-yellow-500 text-black shadow-lg hover:shadow-brandGold/30 hover:-translate-y-0.5",
    glass: "bg-surface-glass border border-border backdrop-blur-md text-white hover:bg-surface-glassHover",
    outline: "border-2 border-brandBlue text-brandBlue hover:bg-brandBlue/10"
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}