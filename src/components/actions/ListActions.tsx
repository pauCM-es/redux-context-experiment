import { useState } from "react";
import {
	useBasicContext,
	addToList,
	removeFromList,
} from "../../context/basicContext";

const ListActions = () => {
	console.log("[RENDER] ListActions");

	const { list, setList } = useBasicContext();
	const [newListItem, setNewListItem] = useState("");

	const handleAddListItem = () => {
		if (newListItem.trim()) {
			setList((prevList) => addToList(prevList, newListItem.trim()));
			setNewListItem("");
			console.log("Added item to list:", newListItem.trim());
		}
	};

	const handleRemoveListItem = (index: number) => {
		setList((prevList) => removeFromList(prevList, index));
		console.log("Removed item at index:", index);
	};

	const handleClearList = () => {
		setList([]);
		console.log("Cleared list");
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
			<h4 style={{ marginTop: 0 }}>List Actions</h4>
			<div style={{ marginBottom: "8px" }}>
				<input
					type="text"
					value={newListItem}
					onChange={(e) => setNewListItem(e.target.value)}
					placeholder="Enter new list item"
					style={{
						padding: "8px",
						width: "70%",
						marginRight: "8px",
					}}
				/>
				<button
					onClick={handleAddListItem}
					style={{
						padding: "8px",
						backgroundColor: "#2196F3",
						color: "white",
					}}>
					Add Item
				</button>
			</div>

			{list.length > 0 && (
				<div>
					<h5>Current Items:</h5>
					<div
						style={{
							maxHeight: "120px",
							overflowY: "auto",
							border: "1px solid #ddd",
							padding: "8px",
							borderRadius: "4px",
							marginBottom: "8px",
						}}>
						<ul style={{ margin: 0, paddingLeft: "20px" }}>
							{list.map((item, index) => (
								<li
									key={index}
									style={{ marginBottom: "4px" }}>
									{item}{" "}
									<button
										onClick={() =>
											handleRemoveListItem(index)
										}
										style={{
											padding: "2px 6px",
											backgroundColor: "#FF5722",
											color: "white",
											border: "none",
											borderRadius: "4px",
											marginLeft: "8px",
											cursor: "pointer",
										}}>
										×
									</button>
								</li>
							))}
						</ul>
					</div>
					<button
						onClick={handleClearList}
						style={{
							padding: "8px",
							backgroundColor: "#9E9E9E",
							color: "white",
							width: "100%",
						}}>
						Clear List
					</button>
				</div>
			)}
		</div>
	);
};

export default ListActions;
