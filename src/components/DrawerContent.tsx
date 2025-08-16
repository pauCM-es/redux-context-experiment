import { useEffect } from "react";
import { useDrawerContext } from "../context/drawerContext";

const DrawerContent = () => {
    const { toggleDrawer, isOpen } = useDrawerContext();

    console.log("DrawerContent render");

    useEffect(() => {
        console.log("[DrawerContent Effect] isOpen changed", isOpen);
    }, [isOpen]);

    return (
        <div className="drawer-context-content">
            <div className="drawer-controls">
                <button onClick={toggleDrawer}>Toggle Drawer</button>
            </div>
        </div>
    );
};

export default DrawerContent;
