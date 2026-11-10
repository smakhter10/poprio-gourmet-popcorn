import * as React from "react";
import { cn } from "@/lib/utils";

export interface InteractiveGridProps extends React.ComponentProps<"svg"> {
  /** Side of a cell, in pixels. */
  cellSize?: number;
}

/**
 * A responsive interactive grid canvas whose cells light up under the pointer
 * and fade out smoothly behind it. Highly optimized with RAF throttling and
 * state change deduplication to maintain 60-120fps during fast pointer motion.
 */
export function InteractiveGrid({
  cellSize = 40,
  className,
  ...props
}: InteractiveGridProps) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [size, setSize] = React.useState({ columns: 0, rows: 0 });
  const [active, setActive] = React.useState<number | null>(null);
  const activeRef = React.useRef<number | null>(null);
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    const svg = svgRef.current;
    const parent = svg?.parentElement;
    if (!svg || !parent) return;

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = svg.getBoundingClientRect();
      setSize({
        columns: Math.ceil(width / cellSize),
        rows: Math.ceil(height / cellSize),
      });
    });
    resizeObserver.observe(svg);

    function onPointerMove(event: PointerEvent) {
      if (rafId.current !== null) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        if (!svg) return;
        const bounds = svg.getBoundingClientRect();
        const column = Math.floor((event.clientX - bounds.left) / cellSize);
        const row = Math.floor((event.clientY - bounds.top) / cellSize);
        const columns = Math.ceil(bounds.width / cellSize);
        const nextActive =
          column >= 0 && row >= 0 && column < columns
            ? row * columns + column
            : null;

        if (nextActive !== activeRef.current) {
          activeRef.current = nextActive;
          setActive(nextActive);
        }
      });
    }

    function onPointerLeave() {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      activeRef.current = null;
      setActive(null);
    }

    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      resizeObserver.disconnect();
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cellSize]);

  const totalCells = size.columns * size.rows;

  return (
    <svg
      ref={svgRef}
      data-slot="interactive-grid"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-foreground",
        className
      )}
      {...props}
    >
      {Array.from({ length: totalCells }, (_, index) => (
        <rect
          key={index}
          x={(index % size.columns) * cellSize}
          y={Math.floor(index / size.columns) * cellSize}
          width={cellSize}
          height={cellSize}
          fill="currentColor"
          stroke="currentColor"
          strokeOpacity={0.025}
          className={cn(
            "transition-[fill-opacity] ease-out motion-reduce:transition-none",
            index === active
              ? "duration-0 [fill-opacity:0.06]"
              : "duration-1000 [fill-opacity:0]"
          )}
        />
      ))}
    </svg>
  );
}

export default InteractiveGrid;
