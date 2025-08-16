import { useEffect } from "react";
import { useDrawerContext } from "../context/drawerContext";

const DrawerContent = () => {
    const {
        contextState: { isOpen },
        dispatch,
        getState,
    } = useDrawerContext();

    console.log("DrawerContent render");

    useEffect(() => {
        console.log("[DrawerContent Effect] isOpen changed", isOpen);
    }, [isOpen]);

    // Ejemplo de uso de getState() sin causar re-renders
    useEffect(() => {
        const currentState = getState();
        console.log(
            "[DrawerContent getState] Current drawer state:",
            currentState
        );
    }, [getState]);

    return (
        <div className="drawer-context-content">
            <p>
                Drawer is: <code>{isOpen ? "Open" : "Closed"}</code>
            </p>

            <div className="drawer-controls">
                <button onClick={() => dispatch("toggleDrawer")}>
                    Toggle (Dispatch)
                </button>

                {/* Botón para ver estado sin re-render */}
                <button
                    onClick={() => {
                        const state = getState();
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
