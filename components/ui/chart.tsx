"use client"

import * as React from "react"
import { ResponsiveContainer } from "recharts"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: Record<string, any>
    children: React.ComponentProps<typeof ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className,
      )}
      {...props}
    >
      <ChartStyle id={chartId} config={config} />
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: Record<string, any> }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: [
          `[data-chart=${id}] {`,
          ...colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.light ?? itemConfig.color
            return color ? `  --color-${key}: ${color};` : null
          }),
          `}`,
          `.dark [data-chart=${id}] {`,
          ...colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.dark ?? itemConfig.color
            return color ? `  --color-${key}: ${color};` : null
          }),
          `}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props} />
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean
    payload?: Array<any>
    label?: string
  }
>(({ active, payload, label, className, ...props }, ref) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
      {...props}
    >
      {label && <p className="font-medium text-foreground">{label}</p>}
      {payload.map((item, index) => (
        <div
          key={index}
          className="flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
        >
          <div
            className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
            style={
              {
                "--color-bg": item.color,
                "--color-border": item.color,
              } as React.CSSProperties
            }
          />
          <div className="flex flex-1 justify-between leading-none">
            <div className="grid gap-1.5">
              <span className="text-muted-foreground">{item.dataKey}</span>
            </div>
            <span className="font-mono font-medium tabular-nums text-foreground">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
