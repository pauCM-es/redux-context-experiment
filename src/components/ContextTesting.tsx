// import { useState, useEffect } from "react";
// import {
//     TestContextProvider,
//     useTestContext,
//     type TestContextValue,
// } from "../context/testContext";
import { useState } from "react";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";

// Componente provider
const ContextTesting = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    console.log("ContextTesting render");

    return (
        <>
            {/* <TestContextProvider value={contextValue}> */}
            <h2>Context Testing</h2>

            <button
                onClick={() => setDrawerOpen((prev) => !prev)}
                style={{
                    display: "block",
                    marginBottom: "10px",
                    position: "fixed",
                    top: "10px",
                    right: "30px",
                    zIndex: 9999,
                }}
            >
                {drawerOpen ? "Remove drawer" : "Create Drawer"}
            </button>
            <div className="context-testing">
                {drawerOpen && (
                    <Drawer>
                        <DrawerContent />
                    </Drawer>
                )}
            </div>
            {/* </TestContextProvider> */}
        </>
    );
};

export default ContextTesting;
