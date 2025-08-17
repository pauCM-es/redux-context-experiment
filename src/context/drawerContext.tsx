import { createContextFactory } from "./contextFactory";

// Context specific for drawer
type Timeline = [string, number][];
export interface DrawerContextValue {
    isOpen: boolean;
    utcDateSelected: string;
    timelineUI: Timeline;
    timelineData: Timeline;
    sensors: {
        [key: string]: {
            values: number[];
            metadata: { lastUpdate: string };
        };
    };
}

const initialState: DrawerContextValue = {
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
};

const drawerConfig = {
    contextName: "Drawer",
    initialState,
    actions: {
        toggleDrawer: (state: DrawerContextValue) => {
            state.isOpen = !state.isOpen;
        },
        updateTimeline: (state: DrawerContextValue, newTimeline: Timeline) => {
            state.timelineData = newTimeline;
        },
        addSensorValue: (
            state: DrawerContextValue,
            payload: { sensorId: string; value: number }
        ) => {
            if (state.sensors[payload.sensorId]) {
                state.sensors[payload.sensorId].values.push(payload.value);
                state.sensors[payload.sensorId].metadata.lastUpdate =
                    new Date().toISOString();
            }
        },
    },
    selectors: {
        // Only specific/computed selectors need to be defined
        // Basic first-level selectors are auto-generated

        // Sensor-specific selectors
        plazaAragon: (state: DrawerContextValue) => state.sensors.plazaAragon,
        plazaMayor: (state: DrawerContextValue) => state.sensors.plazaMayor,
        plazaAragonValues: (state: DrawerContextValue) =>
            state.sensors.plazaAragon?.values || [],
        plazaMayorValues: (state: DrawerContextValue) =>
            state.sensors.plazaMayor?.values || [],

        // Computed selectors
        sensorCount: (state: DrawerContextValue) =>
            Object.keys(state.sensors).length,
        totalSensorValues: (state: DrawerContextValue) =>
            Object.values(state.sensors).reduce(
                (total, sensor) => total + sensor.values.length,
                0
            ),
        averageValues: (state: DrawerContextValue) => {
            const allValues = Object.values(state.sensors).flatMap(
                (sensor) => sensor.values
            );
            return allValues.length > 0
                ? allValues.reduce((a, b) => a + b, 0) / allValues.length
                : 0;
        },
        lastUpdateTime: (state: DrawerContextValue) => {
            const updates = Object.values(state.sensors).map(
                (sensor) => new Date(sensor.metadata.lastUpdate)
            );
            return updates.length > 0
                ? Math.max(...updates.map((d) => d.getTime()))
                : 0;
        },
    },
};

const { DrawerContextProvider, useDrawerContext } =
    createContextFactory(drawerConfig);

export { DrawerContextProvider, useDrawerContext };
