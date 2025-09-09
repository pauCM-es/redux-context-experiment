import { useEffect, useState } from "react";
import { useListApiContext } from "../../context/listContext";
import { ListActionItems } from "../no-isolated/ListActionItems";

const ListActions = () => {
	console.log("[RENDER] ListActions");

	// Use API context for operations
	const { addItem, clearList } = useListApiContext();

	useEffect(() => {
		console.log("[effect] ListActions addItem changed");
	}, [addItem]);

	const [newListItem, setNewListItem] = useState("");

	const handleAddListItem = () => {
		if (newListItem.trim()) {
			addItem(newListItem.trim());
			setNewListItem("");
			console.log("Added item to list:", newListItem.trim());
		}
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

			<ListActionItems />
			<button
				onClick={clearList}
				style={{
					padding: "8px",
					backgroundColor: "#2196F3",
					color: "white",
				}}>
				Reset
			</button>
		</div>
	);
};

export default ListActions;
