import { useBasicContext } from "../../context/basicContext";

const GlobalActions = () => {
	console.log("[RENDER] GlobalActions");

	const { setCounter, setList, setRecord } = useBasicContext();

	const handleComplexUpdate = () => {
		// Update all state properties at once
		setCounter((prev) => prev + 5);
		setList((prev) => [
			...prev,
			`Item ${prev.length + 1}`,
			`Item ${prev.length + 2}`,
		]);
		setRecord((prev) => ({
			...prev,
			lastUpdated: new Date().toISOString(),
			randomValue: Math.random() * 100,
		}));
		console.log("Executed complex update");
	};

	const handleResetAll = () => {
		setCounter(0);
		setList([]);
		setRecord({});
		console.log("Reset all state values");
	};

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(2, 1fr)",
				gap: "8px",
			}}>
			<button
				onClick={handleComplexUpdate}
				style={{
					padding: "8px",
					backgroundColor: "#673AB7",
					color: "white",
				}}>
				Complex Update
			</button>

			<button
				onClick={handleResetAll}
				style={{
					padding: "8px",
					backgroundColor: "#3F51B5",
					color: "white",
				}}>
				Reset All
			</button>
		</div>
	);
};

export default GlobalActions;
