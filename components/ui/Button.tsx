import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "transition-all duration-300 font-medium inline-flex items-center justify-center cursor-pointer rounded-sm";

  const variantStyles = {
    primary: "bg-btn text-btn-text hover:bg-[#111111]",
    secondary: "border border-[#0c2847] text-[#0c2847] hover:bg-gray-50",
    white: "bg-white text-[#0c2847] hover:bg-brand hover:text-white"
  };

  const sizeStyles = {
    sm: "text-[14px] py-2 px-4 w-full sm:w-auto",
    md: "text-[16px] px-8 py-3",
    lg: "text-[18px] px-10 py-4"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
