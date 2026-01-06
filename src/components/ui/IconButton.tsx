"use client";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const variantClasses = {
  primary:
    "bg-gradient-to-br from-accent to-purple-500 text-white shadow-lg shadow-accent/30",
  secondary: "bg-primary/50 border border-accent/30 text-textPrimary",
  danger: "bg-red-500/20 hover:bg-red-500/30 text-red-400",
  ghost: "hover:bg-accent/10 text-textSecondary hover:text-textPrimary",
};

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  className = "",
  variant = "ghost",
  size = "md",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-full flex items-center justify-center
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default IconButton;
