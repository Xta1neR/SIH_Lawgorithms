import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-blue-200 text-slate-500",

        primary: "bg-sky-500 text-white hover:bg-blue-600 active:border-b-2 active:bg-blue-700 text-slate-50",

        primaryOutline: "bg-white text-sky-500 hover:bg-slate-500 hover:text-white active:border-b-2",

        secondary: "bg-yellow-500 text-white hover:bg-orange-600 active:bg-yellow-700 text-slate-50 active:border-b-2",

        secondaryOutline: "bg-white text-yellow-500 hover:bg-green-500 hover:text-white active:border-b-2",

        danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 text-slate-50 active:border-b-2",

        dangerOutline: "bg-white text-red-500 hover:bg-red-500 hover:text-orange-200 active:border-b-2",

        super: "bg-indigo-500 text-white hover:bg-indigo-600 active:border-b-2 active:bg-indigo-700 text-slate-50",

        superOutline: "bg-white text-indigo-500 hover:bg-indigo-500 hover:text-yellow-200 active:border-b-2",

        ghost: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100 active:border-b-2",

        sidebar: "bg-transparent text-sky-500 border-2 border-transparent hover:text-white hover:bg-sky-600 transition-none active:border-b-2",

        sidebarOutline: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none active:border-b-2",

        },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
