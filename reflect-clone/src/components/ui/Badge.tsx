import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

function Badge({ className, ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs font-semibold text-zinc-300 transition-colors hover:bg-[rgba(255,255,255,0.06)] backdrop-blur-sm cursor-pointer",
                className
            )}
            {...props}
        />
    )
}

export { Badge }
