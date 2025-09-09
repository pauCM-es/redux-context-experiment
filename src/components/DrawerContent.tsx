import { useEffect } from "react";
import { useDrawerContext } from "../context/drawerContext";
import DrawerActions from "./DrawerActionsFixed";
import StateMonitor from "./StateMonitorFixed";
import { useBasicContext } from "../context/basicContext";
import BasicContextMonitor from "./BasicContextMonitor";
import BasicContextActions from "./BasicContextActions";

const DrawerContent = () => {
	console.log("[RENDER] DrawerContent");

	// const { ctxDispatch, ctxGetState, ctxSelect, ctxState } =
	// 	useDrawerContext();
	const { counter, list, record } = useBasicContext();
	// const plazaAragonValues = ctxSelect("plazaAragonValues");
	// const isOpen = ctxSelect("selectIsOpen");

	// console.log("DrawerContent render", {
	// 	isOpen,
	// 	ctxState,
	// 	basicContext: { counter, list, record },
	// });

	// useEffect(() => {
	// 	console.log("[DrawerContent Effect] isOpen changed", isOpen);
	// }, [isOpen]);

	// useEffect(() => {
	// 	console.log(
	// 		"[DrawerContent Effect] plazaAragonValues changed",
	// 		plazaAragonValues
	// 	);
	// }, [plazaAragonValues]);

	// useEffect(() => {
	// 	console.log("[DrawerContent Effect] ctxState changed", ctxState);
	// }, [ctxState]);

	// useEffect(() => {
	// 	const currentState = ctxGetState();
	// 	console.log(
	// 		"[DrawerContent getState] Current drawer state:",
	// 		currentState
	// 	);
	// }, [ctxGetState]);

	return (
		<div className="drawer-context-content">
			{/* DrawerContext components */}
			<h2>Drawer Context</h2>
			{/* <DrawerActions />
			<StateMonitor /> */}

			{/* BasicContext components */}
			<div
				style={{
					marginTop: "40px",
					paddingTop: "20px",
					borderTop: "1px dashed #ccc",
				}}>
				<h2>Basic Context</h2>
				<BasicContextActions />
				<BasicContextMonitor />
			</div>
		</div>
	);
};

export default DrawerContent;
