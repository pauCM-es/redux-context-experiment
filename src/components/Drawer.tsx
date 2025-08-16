import { type ReactNode } from "react";
import {
    DrawerContextProvider,
    useDrawerContext,
} from "../context/drawerContext";
import "./Drawer.css";

interface DrawerProps {
    children: ReactNode;
}

// Componente interno que consume el contexto del drawer
const DrawerUI = ({ children }: DrawerProps) => {
    const { contextState, dispatch } = useDrawerContext();

    console.log("DrawerUI render");

    return (
        <>
            <button
                className="drawer-toggle"
                onClick={() => dispatch("toggleDrawer")}
            >
                {contextState.isOpen ? "Close Drawer" : "Open Drawer"}
            </button>

            <div
                className={`drawer ${
                    contextState.isOpen ? "drawer-open" : "drawer-closed"
                }`}
            >
                <div className="drawer-content">
                    <h3>Drawer Component</h3>
                    {children}
                    <button
                        className="drawer-close"
                        onClick={() => dispatch("toggleDrawer", false)}
                    >
                        Close
                    </button>
                </div>
            </div>

            {contextState.isOpen && (
                <div
                    className="drawer-overlay"
                    onClick={() => dispatch("toggleDrawer", false)}
                ></div>
            )}
        </>
    );
};

// Componente principal que provee el contexto del drawer
const Drawer = ({ children }: DrawerProps) => {
    console.log("Drawer render");

    return (
        <DrawerContextProvider>
            <DrawerUI>{children}</DrawerUI>
        </DrawerContextProvider>
    );
};

export default Drawer;
