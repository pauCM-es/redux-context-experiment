import { useState, forwardRef, useImperativeHandle } from "react";

// Interface for the methods exposed by the counter
export interface CounterRef {
    increment: () => void;
    reset: () => void;
    setCount: (count: number) => void;
    getCount: () => number;
}

// Props for the counter component
interface CounterProps {
    initialCount?: number;
    label?: string;
    color?: string;
    backgroundColor?: string;
    style?: React.CSSProperties;
}

// Generic counter component with forwardRef
const Counter = forwardRef<CounterRef, CounterProps>(
    (
        {
            initialCount = 0,
            label = "Count",
            color = "white",
            backgroundColor = "#666",
            style = {},
        },
        ref
    ) => {
        const [count, setCount] = useState(initialCount);

        // Expose methods through ref
        useImperativeHandle(
            ref,
            () => ({
                increment: () => setCount((prev) => prev + 1),
                reset: () => setCount(initialCount),
                setCount: (newCount: number) => setCount(newCount),
                getCount: () => count,
            }),
            [initialCount, count]
        );

        return (
            <span
                style={{
                    backgroundColor,
                    color,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    ...style,
                }}
            >
                {label}: {count}
            </span>
        );
    }
);

Counter.displayName = "Counter";

export default Counter;
