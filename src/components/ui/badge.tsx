import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-red-600 text-white hover:bg-red-700 rounded-none font-black uppercase tracking-widest text-[10px]",
                secondary:
                    "border-transparent bg-zinc-800 text-zinc-400 hover:bg-zinc-700 rounded-none font-black uppercase tracking-widest text-[10px]",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-none",
                outline: "text-zinc-400 border-zinc-800 rounded-none font-black uppercase tracking-widest text-[10px]",
                gradient:
                    "border-transparent bg-gradient-to-r from-red-600 to-red-900 text-white rounded-none font-black uppercase tracking-widest text-[10px]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }

