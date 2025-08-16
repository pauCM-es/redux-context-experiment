import { useState, type ReactNode } from "react";
import {
    DrawerContextProvider,
    useDrawerContext,
    type DrawerContextValue,
} from "../context/drawerContext";
import "./Drawer.css";

interface DrawerProps {
    children: ReactNode;
}

// Componente interno que consume el contexto del drawer
const DrawerUI = ({ children }: DrawerProps) => {
    const { isOpen, toggleDrawer } = useDrawerContext();

    console.log("DrawerUI render");

    return (
        <>
            <button className="drawer-toggle" onClick={toggleDrawer}>
                {isOpen ? "Close Drawer" : "Open Drawer"}
            </button>

            <div
                className={`drawer ${isOpen ? "drawer-open" : "drawer-closed"}`}
            >
                <div className="drawer-content">
                    <h3>Drawer Component</h3>
                    {children}
                    <button className="drawer-close" onClick={toggleDrawer}>
                        Close
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="drawer-overlay" onClick={toggleDrawer}></div>
            )}
        </>
    );
};

// Componente principal que provee el contexto del drawer
const Drawer = ({ children }: DrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log("Drawer render");

    const toggleDrawer = () => setIsOpen(!isOpen);
    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    const drawerContextValue: DrawerContextValue = {
        isOpen,
        toggleDrawer,
        openDrawer,
        closeDrawer,
    };

    return (
        <DrawerContextProvider value={drawerContextValue}>
            <DrawerUI>{children}</DrawerUI>
        </DrawerContextProvider>
    );
};

export default Drawer;
