import { useEffect, useState, useRef } from "react";
import { useBasicContext } from "../context/basicContext";
import { useRecordContext } from "../context/recordContext";
import { useListContext } from "../context/listContext";
import { useCounterContext } from "../context/counterContext";

// Individual monitor component for counter
const CounterMonitor = () => {
	console.log("[RENDER] CounterMonitor");
	const { counter } = useCounterContext();
	const [stateChanges, setStateChanges] = useState<number>(1);
	const renderCountRef = useRef<number>(1);

	// Increment render count on every render
	renderCountRef.current += 1;

	useEffect(() => {
		console.log("[CounterMonitor Effect] counter changed:", counter);
		setStateChanges((prev) => prev + 1);
	}, [counter]);

	return (
		<div
			style={{
				border: "2px solid #4CAF50",
				padding: "16px",
				borderRadius: "8px",
				backgroundColor: "#f1f8e9",
			}}>
			<h4 style={{ margin: "0 0 8px 0", color: "#2E7D32" }}>
				Counter Monitor
			</h4>
			<p style={{ margin: "4px 0" }}>
				<strong>Current Value:</strong> <code>{counter}</code>
			</p>
			<p style={{ margin: "4px 0" }}>
				<span
					style={{
						display: "inline-block",
						backgroundColor: "#4CAF50",
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						marginRight: "8px",
					}}>
					State changes: {stateChanges}
				</span>
			</p>
			<p style={{ margin: "4px 0" }}>
				<span
					style={{
						display: "inline-block",
						backgroundColor: "#388E3C",
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						marginRight: "8px",
					}}>
					Renders: {renderCountRef.current}
				</span>
			</p>
		</div>
	);
};

// Individual monitor component for list
const ListMonitor = () => {
	console.log("[RENDER] ListMonitor");

	const { list } = useListContext();
	const [stateChanges, setStateChanges] = useState<number>(1);
	const renderCountRef = useRef<number>(1);

	// Increment render count on every render
	renderCountRef.current += 1;

	useEffect(() => {
		console.log("[ListMonitor Effect] list changed:", list);
		setStateChanges((prev) => prev + 1);
	}, [list]);

	return (
		<div
			style={{
				border: "2px solid #2196F3",
				padding: "16px",
				borderRadius: "8px",
				backgroundColor: "#e3f2fd",
			}}>
			<h4 style={{ margin: "0 0 8px 0", color: "#1565C0" }}>
				List Monitor
			</h4>
			<p style={{ margin: "4px 0" }}>
				<strong>Item Count:</strong> <code>{list.length}</code>
			</p>
			{list.length > 0 && (
				<div
					style={{
						margin: "4px 0",
						maxHeight: "100px",
						overflowY: "auto",
					}}>
					<strong>Items:</strong>
					<ul style={{ margin: "4px 0" }}>
						{list.map((item, index) => (
							<li key={index}>
								<code>{item}</code>
							</li>
						))}
					</ul>
				</div>
			)}
			<p style={{ margin: "4px 0" }}>
				<span
					style={{
						display: "inline-block",
						backgroundColor: "#2196F3",
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						marginRight: "8px",
					}}>
					State changes: {stateChanges}
				</span>
			</p>
			<p style={{ margin: "4px 0" }}>
				<span
					style={{
						display: "inline-block",
						backgroundColor: "#1976D2",
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						marginRight: "8px",
					}}>
					Renders: {renderCountRef.current}
				</span>
			</p>
		</div>
	);
};

// Individual monitor component for record
const RecordMonitor = () => {
	console.log("[RENDER] RecordMonitor");

	const { record } = useRecordContext();
	const [stateChanges, setStateChanges] = useState<number>(1);
	const renderCountRef = useRef<number>(1);

	// Increment render count on every render
	renderCountRef.current += 1;

	useEffect(() => {
		console.log("[RecordMonitor Effect] record changed:", record);
		setStateChanges((prev) => prev + 1);
	}, [record]);

	const keyCount = Object.keys(record).length;

	return (
		<div
			style={{
				border: "2px solid #FF9800",
				padding: "16px",
				borderRadius: "8px",
				backgroundColor: "#fff3e0",
			}}>
			<h4 style={{ margin: "0 0 8px 0", color: "#F57C00" }}>
				Record Monitor
			</h4>
			<p style={{ margin: "4px 0" }}>
				<strong>Key Count:</strong> <code>{keyCount}</code>
			</p>
			{keyCount > 0 && (
				<div
					style={{
						margin: "4px 0",
						maxHeight: "120px",
						overflowY: "auto",
					}}>
					<strong>Content:</strong>
					<pre
						style={{
							margin: "4px 0",
							backgroundColor: "#ffecb3",
							padding: "8px",
							borderRadius: "4px",
							fontSize: "12px",
						}}>
						{JSON.stringify(record, null, 2)}
					</pre>
				</div>
			)}
			<p style={{ margin: "4px 0" }}>
				<span
					style={{
						display: "inline-block",
						backgroundColor: "#FF9800",
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						marginRight: "8px",
					}}>
					State changes: {stateChanges}
				</span>
			</p>
			<p style={{ margin: "4px 0" }}>
				<span
					style={{
						display: "inline-block",
						backgroundColor: "#F57C00",
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						marginRight: "8px",
					}}>
					Renders: {renderCountRef.current}
				</span>
			</p>
		</div>
	);
};

// Main monitoring component that contains all monitors
const BasicContextMonitor = () => {
	console.log("[RENDER] BasicContextMonitor");

	return (
		<div style={{ marginTop: "24px" }}>
			<h3 style={{ marginBottom: "16px" }}>Basic Context Monitors</h3>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "16px",
				}}>
				<CounterMonitor />
				<ListMonitor />
				<RecordMonitor />
			</div>
		</div>
	);
};

export default BasicContextMonitor;
