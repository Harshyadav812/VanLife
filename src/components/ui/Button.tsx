import type { JSX } from "react";
import clsx from "clsx";

const variantClasses = {
  luxury: "bg-neutral-900",
  simple: "bg-orange-600",
  rugged: "bg-teal-800",
  // success: 'bg-green-600 hover:bg-green-700'
} as const;

interface ButtonProps {
  children: string;
  variant?: keyof typeof variantClasses;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "luxury",
  disabled = false,
  size = "md",
  clickable = true,
  className,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        "rounded-md border-0 text-white font-bold mt-2",
        variantClasses[variant],
        {
          "py-1 px-2 text-sm": size === "sm",
          "py-2 px-4": size === "md",
          "py-3 px-6 text-lg": size === "lg",
          "opacity-50 cursor-not-allowed": disabled,
          "cursor-pointer": clickable && !disabled,
          "cursor-default": !clickable && !disabled,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
