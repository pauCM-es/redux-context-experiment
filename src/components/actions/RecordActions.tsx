import { useState } from "react";
import { useBasicContext, updateRecord } from "../../context/basicContext";

const RecordActions = () => {
	console.log("[RENDER] RecordActions");

	const { record, setRecord } = useBasicContext();
	const [recordKey, setRecordKey] = useState("");
	const [recordValue, setRecordValue] = useState("");

	const handleAddRecordProperty = () => {
		if (recordKey.trim()) {
			// Try to parse as JSON if possible
			let parsedValue;
			try {
				parsedValue = JSON.parse(recordValue);
			} catch (e) {
				// If not valid JSON, use as string
				parsedValue = recordValue;
			}

			setRecord((prevRecord) =>
				updateRecord(prevRecord, recordKey.trim(), parsedValue)
			);
			console.log(
				`Added record property: ${recordKey.trim()} = ${recordValue}`
			);
			setRecordKey("");
			setRecordValue("");
		}
	};

	const handleRemoveRecordProperty = (key: string) => {
		setRecord((prevRecord) => {
			const newRecord = { ...prevRecord };
			delete newRecord[key];
			return newRecord;
		});
		console.log("Removed record property:", key);
	};

	const handleClearRecord = () => {
		setRecord({});
		console.log("Cleared record");
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
			<h4 style={{ marginTop: 0 }}>Record Actions</h4>
			<div style={{ marginBottom: "8px" }}>
				<div style={{ display: "flex", marginBottom: "8px" }}>
					<input
						type="text"
						value={recordKey}
						onChange={(e) => setRecordKey(e.target.value)}
						placeholder="Property key"
						style={{
							padding: "8px",
							flex: "1",
							marginRight: "8px",
						}}
					/>
					<input
						type="text"
						value={recordValue}
						onChange={(e) => setRecordValue(e.target.value)}
						placeholder="Property value"
						style={{
							padding: "8px",
							flex: "1",
						}}
					/>
				</div>
				<button
					onClick={handleAddRecordProperty}
					style={{
						padding: "8px",
						backgroundColor: "#FF9800",
						color: "white",
						width: "100%",
					}}>
					Add/Update Property
				</button>
			</div>

			{Object.keys(record).length > 0 && (
				<div>
					<h5>Current Properties:</h5>
					<div
						style={{
							maxHeight: "120px",
							overflowY: "auto",
							border: "1px solid #ddd",
							padding: "8px",
							borderRadius: "4px",
							marginBottom: "8px",
							backgroundColor: "#fff",
						}}>
						{Object.entries(record).map(([key, value]) => (
							<div
								key={key}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "4px 0",
									borderBottom: "1px solid #eee",
								}}>
								<div>
									<strong>{key}:</strong>{" "}
									<code>
										{typeof value === "object"
											? JSON.stringify(value)
											: String(value)}
									</code>
								</div>
								<button
									onClick={() =>
										handleRemoveRecordProperty(key)
									}
									style={{
										padding: "2px 6px",
										backgroundColor: "#FF5722",
										color: "white",
										border: "none",
										borderRadius: "4px",
										cursor: "pointer",
									}}>
									Remove
								</button>
							</div>
						))}
					</div>
					<button
						onClick={handleClearRecord}
						style={{
							padding: "8px",
							backgroundColor: "#9E9E9E",
							color: "white",
							width: "100%",
						}}>
						Clear Record
					</button>
				</div>
			)}
		</div>
	);
};

export default RecordActions;
