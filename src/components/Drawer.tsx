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
    const { ctxState, ctxDispatch, ctxSet } = useDrawerContext();

    console.log("DrawerUI render");

    return (
        <>
            <button
                className="drawer-toggle"
                onClick={() => {
                    ctxSet({ isOpen: true });
                }}
            >
                {ctxState.isOpen ? "Close Drawer" : "Open Drawer"}
            </button>

            <div
                className={`drawer ${
                    ctxState.isOpen ? "drawer-open" : "drawer-closed"
                }`}
            >
                <div className="drawer-content">
                    <h3>Drawer Component</h3>
                    {children}
                    <button
                        className="drawer-close"
                        onClick={() => ctxDispatch("toggleDrawer")}
                    >
                        Dispatch Open Drawer
                    </button>
                </div>
            </div>

            {ctxState.isOpen && (
                <div
                    className="drawer-overlay"
                    onClick={() => ctxDispatch("toggleDrawer")}
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
