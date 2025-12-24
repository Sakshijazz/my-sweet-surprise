import { ReactNode } from 'react';

interface CuteButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'pulse';
  disabled?: boolean;
  className?: string;
}

const CuteButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '' 
}: CuteButtonProps) => {
  const baseClasses = `
    px-8 py-4 rounded-full font-cute font-semibold text-lg
    transition-all duration-500 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `;

  const variantClasses = {
    primary: `
      bg-primary text-primary-foreground
      shadow-soft hover:shadow-glow hover:scale-105
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      shadow-soft hover:shadow-glow hover:scale-105
    `,
    pulse: `
      bg-primary text-primary-foreground
      shadow-soft btn-pulse
      hover:shadow-glow
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default CuteButton;
