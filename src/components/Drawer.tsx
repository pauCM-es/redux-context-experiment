import { type ReactNode } from "react";
import {
	DrawerContextProvider,
	useDrawerContext,
} from "../context/drawerContext";
import "./Drawer.css";
import { BasicContextProvider } from "../context/basicContext";

interface DrawerProps {
	children: ReactNode;
}

// Componente interno que consume el contexto del drawer
const DrawerUI = ({ children }: DrawerProps) => {
	const { ctxState, ctxSet, ctxSelect } = useDrawerContext();
	const isOpenCtx = ctxSelect("selectIsOpen");
	console.log("DrawerUI render", { isOpenCtx });

	return (
		<>
			<button
				className="drawer-toggle"
				onClick={() => {
					ctxSet((state) => ({
						isOpen: !state.isOpen,
					}));
				}}>
				{ctxState.isOpen ? "Close Drawer" : "Open Drawer"}
			</button>

			<div
				className={`drawer ${
					"drawer-open"
					// ctxState.isOpen ? "drawer-open" : "drawer-closed"
				}`}>
				<div className="drawer-content">
					<h3>Drawer Component</h3>
					{children}
				</div>
			</div>
		</>
	);
};

// Componente principal que provee el contexto del drawer
const Drawer = ({ children }: DrawerProps) => {
	console.log("Drawer render");

	return (
		<BasicContextProvider>
			<DrawerContextProvider>
				<DrawerUI>{children}</DrawerUI>
			</DrawerContextProvider>
		</BasicContextProvider>
	);
};

export default Drawer;
