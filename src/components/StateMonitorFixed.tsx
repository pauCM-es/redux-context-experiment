import { useEffect, useRef } from "react";
import { useDrawerContext } from "../context/drawerContext";

type Timeline = [string, number][];

// Individual monitor component for isOpen
const IsOpenMonitor = () => {
    const { ctxSelect } = useDrawerContext();
    const isOpen = ctxSelect("selectIsOpen") as boolean;
    const renderCount = useRef(0);
    renderCount.current++;

    useEffect(() => {
        console.log("[IsOpenMonitor Effect] isOpen changed:", isOpen);
    }, [isOpen]);

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
                <strong>Monitoring:</strong> isOpen
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Current Value:</strong>{" "}
                <code>{isOpen ? "Open" : "Closed"}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Render Count:</strong>{" "}
                <span
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "4px",
                    }}
                >
                    {renderCount.current}
                </span>
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
    const renderCount = useRef(0);
    renderCount.current++;

    useEffect(() => {
        console.log("[SensorsMonitor Effect] sensors changed:", sensors);
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
                <strong>Monitoring:</strong> sensors
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Sensor Count:</strong> <code>{sensorCount}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Total Values:</strong> <code>{totalValues}</code>
            </p>
            <p style={{ margin: "4px 0" }}>
                <strong>Render Count:</strong>{" "}
                <span
                    style={{
                        backgroundColor: "#2196F3",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "4px",
                    }}
                >
                    {renderCount.current}
                </span>
            </p>
        </div>
    );
};

// Individual monitor component for timeline
const TimelineMonitor = () => {
    const { ctxSelect } = useDrawerContext();
    const timelineData = ctxSelect("selectTimelineData") as Timeline;
    const renderCount = useRef(0);
    renderCount.current++;

    useEffect(() => {
        console.log(
            "[TimelineMonitor Effect] timelineData changed:",
            timelineData
        );
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
                <strong>Monitoring:</strong> timelineData
            </p>
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
                <strong>Render Count:</strong>{" "}
                <span
                    style={{
                        backgroundColor: "#FF9800",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "4px",
                    }}
                >
                    {renderCount.current}
                </span>
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
            </div>
        </div>
    );
};

export default StateMonitor;
