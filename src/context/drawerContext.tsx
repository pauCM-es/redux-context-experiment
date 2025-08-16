import { createContextFactory } from "./contextFactory";

// Contexto específico para drawer
export interface DrawerContextValue {
    isOpen: boolean;
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}

export const {
    Context: DrawerContext,
    Provider: DrawerContextProvider,
    useContext: useDrawerContext,
} = createContextFactory<DrawerContextValue>("DrawerContext");
