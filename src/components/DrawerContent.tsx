import { useBasicContext } from "../context/basicContext";
import BasicContextMonitor from "./BasicContextMonitor";
import BasicContextActions from "./BasicContextActions";
import ItemsContainer from "./isolated/ItemsContainer";

const DrawerContent = () => {
	console.log("[RENDER] DrawerContent");

	// const { counter, list, record } = useBasicContext();

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
				<ItemsContainer />
			</div>
		</div>
	);
};

export default DrawerContent;
