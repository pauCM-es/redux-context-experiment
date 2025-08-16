import { createContextFactory } from "./contextFactory.tsx";

// Contexto específico para drawer
type Timeline = [string, number][];
export interface DrawerContextValue {
    isOpen: boolean;
    utcDateSelected: string;
    timelineUI: Timeline;
    timelineData: Timeline;
}

const initialState: DrawerContextValue = {
    isOpen: false,
    utcDateSelected: new Date().toISOString(),
    timelineUI: [],
    timelineData: [],
};

const config = {
    contextName: "Drawer",
    initialState,
    actions: {
        toggleDrawer: (state: DrawerContextValue, newState?: boolean) => {
            if (newState) {
                state.isOpen = newState;
            } else {
                state.isOpen = !state.isOpen;
            }
        },
    },
} as const;

export const { DrawerContextProvider, useDrawerContext } =
    createContextFactory(config);
