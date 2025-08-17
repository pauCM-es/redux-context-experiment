import { useEffect } from "react";
import { useDrawerContext } from "../context/drawerContext";
import DrawerActions from "./DrawerActionsFixed";
import StateMonitor from "./StateMonitorFixed";

const DrawerContent = () => {
    const { ctxDispatch, ctxGetState, ctxSelect, ctxState } =
        useDrawerContext();
    const plazaAragonValues = ctxSelect("plazaAragonValues");
    const isOpen = ctxSelect("selectIsOpen");

    console.log("DrawerContent render", {
        isOpen,
        ctxState,
    });

    useEffect(() => {
        console.log("[DrawerContent Effect] isOpen changed", isOpen);
    }, [isOpen]);

    useEffect(() => {
        console.log(
            "[DrawerContent Effect] plazaAragonValues changed",
            plazaAragonValues
        );
    }, [plazaAragonValues]);

    useEffect(() => {
        console.log("[DrawerContent Effect] ctxState changed", ctxState);
    }, [ctxState]);

    // Ejemplo de uso de getState() sin causar re-renders
    useEffect(() => {
        const currentState = ctxGetState();
        console.log(
            "[DrawerContent getState] Current drawer state:",
            currentState
        );
    }, [ctxGetState]);

    return (
        <div className="drawer-context-content">
            {/* Child component with context methods */}
            <DrawerActions />

            {/* Individual state monitors */}
            <StateMonitor />
        </div>
    );
};

export default DrawerContent;
