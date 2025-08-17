import { useDrawerContext } from "../context/drawerContext";

const DrawerActions = () => {
    const { ctxSet, ctxDispatch, ctxGetState } = useDrawerContext();

    console.log("DrawerActions render");

    const handleCtxSet = () => {
        ctxSet({ isOpen: true });
        console.log("Executed ctxSet({ isOpen: true })");
    };

    const handleCtxSetToggle = () => {
        ctxSet((state) => ({ isOpen: !state.isOpen }));
        console.log("Executed ctxSet with function toggle");
    };

    const handleCtxSetClose = () => {
        ctxSet({ isOpen: false });
        console.log("Executed ctxSet({ isOpen: false })");
    };

    const handleUpdateDate = () => {
        ctxSet({ utcDateSelected: new Date().toISOString() });
        console.log("Executed ctxSet - updated date");
    };

    const handleUpdateTimeline = () => {
        const newTimeline: [string, number][] = [
            ["Item 1", Math.random() * 100],
            ["Item 2", Math.random() * 100],
            ["Item 3", Math.random() * 100],
            ["Item 4", Math.random() * 100],
            ["Item 5", Math.random() * 100],
        ];
        ctxSet({ timelineData: newTimeline });
        console.log("Executed ctxSet - updated timeline data");
    };

    const handleCtxDispatch = () => {
        ctxDispatch("toggleDrawer");
        console.log("Executed ctxDispatch('toggleDrawer')");
    };

    const handleDispatchUpdateTimeline = () => {
        const newTimeline: [string, number][] = [
            ["Action Item 1", 50],
            ["Action Item 2", 75],
        ];
        ctxDispatch("updateTimeline", newTimeline);
        console.log("Executed ctxDispatch('updateTimeline')");
    };

    const handleDispatchAddSensorValue = () => {
        const payload = {
            sensorId: "plazaAragon",
            value: Math.floor(Math.random() * 100),
        };
        ctxDispatch("addSensorValue", payload);
        console.log("Executed ctxDispatch('addSensorValue')", payload);
    };

    const handleGetState = () => {
        const state = ctxGetState();
        console.log("Current state via ctxGetState():", state);
    };

    const handleResetToInitial = () => {
        ctxSet({
            isOpen: false,
            utcDateSelected: new Date().toISOString(),
            timelineUI: [],
            timelineData: [],
            sensors: {
                plazaAragon: {
                    values: [1, 2, 3],
                    metadata: { lastUpdate: "2023-01-01" },
                },
                plazaMayor: {
                    values: [4, 5, 6],
                    metadata: { lastUpdate: "2023-01-02" },
                },
            },
        });
        console.log("Reset state to initial values");
    };

    const handleComplexUpdate = () => {
        ctxSet((state) => ({
            isOpen: !state.isOpen,
            utcDateSelected: new Date().toISOString(),
            timelineData: [["Updated", Date.now()]] as [string, number][],
            sensors: {
                ...state.sensors,
                plazaAragon: {
                    ...state.sensors.plazaAragon,
                    values: [...state.sensors.plazaAragon.values, 999],
                    metadata: { lastUpdate: new Date().toISOString() },
                },
            },
        }));
        console.log("Executed complex update with function");
    };

    return (
        <div className="drawer-actions">
            <h3>Context Methods Test</h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                    marginBottom: "16px",
                }}
            >
                <button
                    onClick={handleCtxSet}
                    style={{
                        padding: "8px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                    }}
                >
                    ctxSet (Open Drawer)
                </button>

                <button
                    onClick={handleCtxSetClose}
                    style={{
                        padding: "8px",
                        backgroundColor: "#f44336",
                        color: "white",
                    }}
                >
                    ctxSet (Close Drawer)
                </button>

                <button
                    onClick={handleCtxSetToggle}
                    style={{
                        padding: "8px",
                        backgroundColor: "#2196F3",
                        color: "white",
                    }}
                >
                    ctxSet (Toggle Function)
                </button>

                <button
                    onClick={handleUpdateDate}
                    style={{
                        padding: "8px",
                        backgroundColor: "#9C27B0",
                        color: "white",
                    }}
                >
                    ctxSet (Update Date)
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                    marginBottom: "16px",
                }}
            >
                <button
                    onClick={handleUpdateTimeline}
                    style={{
                        padding: "8px",
                        backgroundColor: "#FF9800",
                        color: "white",
                    }}
                >
                    ctxSet (Update Timeline)
                </button>

                <button
                    onClick={handleComplexUpdate}
                    style={{
                        padding: "8px",
                        backgroundColor: "#607D8B",
                        color: "white",
                    }}
                >
                    ctxSet (Complex Update)
                </button>

                <button
                    onClick={handleCtxDispatch}
                    style={{
                        padding: "8px",
                        backgroundColor: "#795548",
                        color: "white",
                    }}
                >
                    ctxDispatch (Toggle)
                </button>

                <button
                    onClick={handleDispatchUpdateTimeline}
                    style={{
                        padding: "8px",
                        backgroundColor: "#E91E63",
                        color: "white",
                    }}
                >
                    ctxDispatch (Update Timeline)
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                }}
            >
                <button
                    onClick={handleDispatchAddSensorValue}
                    style={{
                        padding: "8px",
                        backgroundColor: "#009688",
                        color: "white",
                    }}
                >
                    ctxDispatch (Add Sensor Value)
                </button>

                <button
                    onClick={handleGetState}
                    style={{
                        padding: "8px",
                        backgroundColor: "#673AB7",
                        color: "white",
                    }}
                >
                    ctxGetState (Console Log)
                </button>

                <button
                    onClick={handleResetToInitial}
                    style={{
                        padding: "8px",
                        backgroundColor: "#3F51B5",
                        color: "white",
                    }}
                >
                    Reset to Initial State
                </button>
            </div>
        </div>
    );
};

export default DrawerActions;
