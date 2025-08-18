import { useEffect, useRef } from "react";
import { useDrawerContext } from "../context/drawerContext";
import Counter from "./Counter";
import type { CounterRef } from "./Counter";

type Timeline = [string, number][];

// Individual monitor component for isOpen
const IsOpenMonitor = () => {
    const { ctxSelect, ctxDispatch } = useDrawerContext();
    const isOpen = ctxSelect("selectIsOpen");
    const sensors = ctxSelect("selectSensors");
    const stateChangesRef = useRef<CounterRef>(null);
    const renderCountRef = useRef<CounterRef>(null);

    // Increment render count on every render
    renderCountRef.current?.increment();

    useEffect(() => {
        console.log("[IsOpenMonitor Effect] isOpen changed:", isOpen);
        stateChangesRef.current?.increment();
    }, [isOpen, ctxDispatch, sensors]);

    return (
        <div
            style={{
                border: "2px solid #4CAF50",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#f1f8e9",
            }}
        >
            <h4 style={{ margin: "0 0 8px 0", color: "#2E7D32" }}>
                IsOpen Monitor
            </h4>
            <p style={{ margin: "4px 0" }}>
                <strong>Current Value:</strong>{" "}
                <code>{isOpen ? "Open" : "Closed"}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={stateChangesRef}
                    label="State changes count"
                    backgroundColor="#4CAF50"
                    initialCount={1}
                />
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={renderCountRef}
                    label="Render count"
                    backgroundColor="#388E3C"
                    initialCount={1}
                />
            </p>
        </div>
    );
};

// Individual monitor component for sensors
const SensorsMonitor = () => {
    const { ctxSelect } = useDrawerContext();
    const sensors = ctxSelect("selectSensors") as {
        [key: string]: {
            values: number[];
            metadata: { lastUpdate: string };
        };
    };
    const stateChangesRef = useRef<CounterRef>(null);
    const renderCountRef = useRef<CounterRef>(null);

    // Increment render count on every render
    renderCountRef.current?.increment();

    useEffect(() => {
        console.log("[SensorsMonitor Effect] sensors changed:", sensors);
        stateChangesRef.current?.increment();
    }, [sensors]);

    const sensorCount = Object.keys(sensors).length;
    const totalValues = Object.values(sensors).reduce(
        (total, sensor) => total + sensor.values.length,
        0
    );

    return (
        <div
            style={{
                border: "2px solid #2196F3",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#e3f2fd",
            }}
        >
            <h4 style={{ margin: "0 0 8px 0", color: "#1565C0" }}>
                Sensors Monitor
            </h4>
            <p style={{ margin: "4px 0" }}>
                <strong>Sensor Count:</strong> <code>{sensorCount}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Total Values:</strong> <code>{totalValues}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={stateChangesRef}
                    label="State changes count"
                    backgroundColor="#2196F3"
                    initialCount={1}
                />
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={renderCountRef}
                    label="Render count"
                    backgroundColor="#1976D2"
                    initialCount={1}
                />
            </p>
        </div>
    );
};

// Individual monitor component for timeline
const TimelineMonitor = () => {
    const { ctxSelect } = useDrawerContext();
    const timelineData = ctxSelect("selectTimelineData") as Timeline;
    const stateChangesRef = useRef<CounterRef>(null);
    const renderCountRef = useRef<CounterRef>(null);

    // Increment render count on every render
    renderCountRef.current?.increment();

    useEffect(() => {
        console.log(
            "[TimelineMonitor Effect] timelineData changed:",
            timelineData
        );
        stateChangesRef.current?.increment();
    }, [timelineData]);

    return (
        <div
            style={{
                border: "2px solid #FF9800",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#fff3e0",
            }}
        >
            <h4 style={{ margin: "0 0 8px 0", color: "#F57C00" }}>
                Timeline Monitor
            </h4>
            <p style={{ margin: "4px 0" }}>
                <strong>Items Count:</strong> <code>{timelineData.length}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Last Item:</strong>{" "}
                <code>
                    {timelineData.length > 0
                        ? `${timelineData[timelineData.length - 1][0]}: ${
                              timelineData[timelineData.length - 1][1]
                          }`
                        : "No items"}
                </code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={stateChangesRef}
                    label="State changes count"
                    backgroundColor="#FF9800"
                    initialCount={1}
                />
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={renderCountRef}
                    label="Render count"
                    backgroundColor="#F57C00"
                    initialCount={1}
                />
            </p>
        </div>
    );
};

// Individual monitor component for global state
const GlobalStateMonitor = () => {
    const { ctxState } = useDrawerContext();
    // Monitor the entire global state by accessing it directly
    const stateChangesRef = useRef<CounterRef>(null);
    const renderCountRef = useRef<CounterRef>(null);

    // Increment render count on every render
    renderCountRef.current?.increment();

    useEffect(() => {
        console.log(
            "[GlobalStateMonitor Effect] Global state changed:",
            ctxState
        );
        stateChangesRef.current?.increment();
    }, [ctxState]);

    // Get some computed values from the global state
    const stateKeys = Object.keys(ctxState);

    return (
        <div
            style={{
                border: "2px solid #9C27B0",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#f3e5f5",
            }}
        >
            <h4 style={{ margin: "0 0 8px 0", color: "#7B1FA2" }}>
                Global State Monitor
            </h4>
            <p style={{ margin: "4px 0" }}>
                <strong>State Keys:</strong> <code>{stateKeys.join(", ")}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={stateChangesRef}
                    label="State changes count"
                    backgroundColor="#9C27B0"
                    initialCount={1}
                />
            </p>
            <p style={{ margin: "4px 0" }}>
                <Counter
                    ref={renderCountRef}
                    label="Render count"
                    backgroundColor="#7B1FA2"
                    initialCount={1}
                />
            </p>
        </div>
    );
};

// Main monitoring component that contains all monitors
const StateMonitor = () => {
    return (
        <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "16px" }}>Individual State Monitors</h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                }}
            >
                <IsOpenMonitor />
                <SensorsMonitor />
                <TimelineMonitor />
                <GlobalStateMonitor />
            </div>
        </div>
    );
};

export default StateMonitor;
