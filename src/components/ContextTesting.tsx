import { useState } from "react";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";

// Componente provider
const ContextTesting = () => {
	const [drawerOpen, setDrawerOpen] = useState(true);
	console.log("[RENDER] ContextTesting");

	return (
		<>
			<h2>Context Testing</h2>

			<div className="test-controls">
				<button
					onClick={() => setDrawerOpen((prev) => !prev)}
					style={{
						display: "block",
						marginBottom: "10px",
						position: "fixed",
						top: "10px",
						right: "30px",
						zIndex: 9999,
					}}>
					{drawerOpen ? "Remove drawer" : "Create Drawer"}
				</button>
			</div>

			<div className="context-testing">
				{drawerOpen && (
					<Drawer>
						<DrawerContent />
					</Drawer>
				)}
			</div>
		</>
	);
};

export default ContextTesting;
