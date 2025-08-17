import { useEffect } from "react";
import { useDrawerContext } from "../context/drawerContext";

const DrawerContent = () => {
    const { ctxDispatch, ctxGetState, ctxSelect, ctxState } =
        useDrawerContext();
    const plazaAragonValues = ctxSelect("plazaAragonValues");
    const isOpen = ctxSelect("selectIsOpen");

    console.log("DrawerContent render");

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
            <p>
                Drawer is: <code>{isOpen ? "Open" : "Closed"}</code>
            </p>

            <div className="drawer-controls">
                <button onClick={() => ctxDispatch("toggleDrawer")}>
                    Dispatch Toggle (Dispatch)
                </button>

                {/* Botón para ver estado sin re-render */}
                <button
                    onClick={() => {
                        const state = ctxGetState();
                        console.log(
                            "Current drawer state via getState():",
                            state
                        );
                    }}
                >
                    Log State (No Re-render)
                </button>
            </div>
        </div>
    );
};

export default DrawerContent;
