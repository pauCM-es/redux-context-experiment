import { useBasicContext } from "../../context/basicContext";

const CounterActions = () => {
	console.log("[RENDER] CounterActions");

	const { setCounter } = useBasicContext();

	const handleIncrementCounter = () => {
		setCounter((prevCounter) => prevCounter + 1);
		console.log("Executed setCounter increment");
	};

	const handleDecrementCounter = () => {
		setCounter((prevCounter) => Math.max(0, prevCounter - 1));
		console.log("Executed setCounter decrement");
	};

	const handleResetCounter = () => {
		setCounter(0);
		console.log("Executed setCounter reset");
	};

	return (
		<div
			style={{
				border: "1px solid #ddd",
				borderRadius: "8px",
				padding: "16px",
				marginBottom: "16px",
				backgroundColor: "#f9f9f9",
			}}>
			<h4 style={{ marginTop: 0 }}>Counter Actions</h4>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "8px",
				}}>
				<button
					onClick={handleDecrementCounter}
					style={{
						padding: "8px",
						backgroundColor: "#f44336",
						color: "white",
					}}>
					Decrement
				</button>

				<button
					onClick={handleIncrementCounter}
					style={{
						padding: "8px",
						backgroundColor: "#4CAF50",
						color: "white",
					}}>
					Increment
				</button>

				<button
					onClick={handleResetCounter}
					style={{
						padding: "8px",
						backgroundColor: "#9E9E9E",
						color: "white",
					}}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default CounterActions;
