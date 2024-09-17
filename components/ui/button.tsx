import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-transform transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked:
        "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        default:
          "bg-pink-300 text-white border-2 border-pink-400 hover:bg-pink-400 hover:scale-105 active:scale-95 active:bg-pink-500 transition-all ease-out shadow-lg hover:shadow-pink-500",
        primary:
          "bg-purple-500 text-white hover:bg-purple-600 hover:scale-105 active:scale-95 active:bg-purple-700 transition-all ease-out shadow-lg hover:shadow-purple-500",
        primaryOutline:
          "bg-white text-purple-500 border-2 border-purple-500 hover:bg-purple-500 hover:text-white hover:scale-105 active:scale-95", // No shadow for outline
        secondary:
          "bg-yellow-500 text-white hover:bg-orange-500 hover:scale-105 active:scale-95 active:bg-yellow-600 transition-all ease-out shadow-lg hover:shadow-yellow-500",
        secondaryOutline:
          "bg-white text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white hover:scale-105 active:scale-95", // No shadow for outline
        danger:
          "bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 active:bg-red-700 transition-all ease-out shadow-lg hover:shadow-red-500",
        dangerOutline:
          "bg-white text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white hover:scale-105 active:scale-95", // No shadow for outline
        super:
          "bg-teal-500 text-white hover:bg-teal-600 hover:scale-105 active:scale-95 active:bg-teal-700 transition-all ease-out shadow-lg hover:shadow-teal-500",
        ghost:
          "bg-transparent text-gray-500 hover:bg-gray-100 hover:scale-105 active:scale-95", // Ghosts won't have shadows
        sidebar:
          "bg-transparent text-blue-500 border-2 border-transparent hover:bg-blue-500 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-blue-500",
        sidebarOutline:
          "bg-blue-100 text-blue-500 border-2 border-blue-300 hover:bg-blue-200 hover:scale-105 active:scale-95", // No shadow for outline
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
