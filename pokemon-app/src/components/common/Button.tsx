import React, { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  [
    "inline-flex",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "justify-center",
    "items-center",
    "gap-2",
    "font-nunito",
    "rounded-[12px]",
    "transition-colors",
    "duration-200",
    "cursor-pointer",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        fulfilled: [
          "bg-primary-500 text-white",
          "hover:bg-primary-700",
          "disabled:bg-grey-300 disabled:text-grey-700",
        ],
        outlined: [
          "border border-primary-500 text-primary-500",
          "hover:bg-primary-300",
          "disabled:border-grey-700 disabled:text-grey-700 disabled:bg-transparent",
        ],
        ghost: [
          "text-primary-500",
          "hover:bg-primary-300",
          "disabled:text-grey-700 disabled:bg-grey-100",
        ],
        alert: [
          "bg-white border border-error-400 text-error-400",
          "hover:bg-error-400 hover:text-white",
          "disabled:border-grey-300 disabled:text-grey-300",
        ],
        error: [
          "bg-error-400 text-white",
          "hover:bg-white border border-error-400 hover:text-error-400",
          "disabled:border-grey-300 disabled:text-grey-300",
        ],
        sidebar: [
          "bg-primary-white text-white",
          "hover:bg-grey-100",
          "border border-grey-300",
          "disabled:bg-grey-300 disabled:text-grey-700",
        ],
      },
      size: {
        small: ["px-3 py-1.5", "text-body3"],
        medium: ["px-4 py-2.5", "text-body2"],
        large: ["px-5 py-3", "text-body1"],
      },

      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      size: "medium",
      variant: "fulfilled",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  className,
  size,
  variant,
  fullWidth,
  leftIcon,
  rightIcon,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx([buttonVariants({ size, fullWidth, variant }), className])}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></span>
      )}
      {leftIcon && !isLoading && leftIcon}
      {!isLoading && children}
      {rightIcon && !isLoading && rightIcon}
    </button>
  );
}

export default Button;
