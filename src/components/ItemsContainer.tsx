import React, { useState } from "react";
import ItemsList from "./isolated/ItemsList";

const ItemsContainer: React.FC = () => {
	console.log("[RENDER] ItemsContainer");

	const [items, setItems] = useState<string[]>([]);
	const [newItemText, setNewItemText] = useState<string>("");

	const handleAddItem = () => {
		if (newItemText.trim() !== "") {
			setItems([...items, newItemText.trim()]);
			setNewItemText("");
		}
	};

	const handleRemoveItem = (index: number) => {
		setItems(items.filter((_, i) => i !== index));
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleAddItem();
		}
	};

	return (
		<div
			style={{
				border: "1px solid #ddd",
				borderRadius: "8px",
				padding: "16px",
				margin: "16px 0",
				backgroundColor: "#ffffff",
			}}>
			<h3>Items List Demo</h3>
			<p>This component doesn't use the BasicContext</p>

			<div style={{ display: "flex", marginBottom: "16px" }}>
				<input
					type="text"
					value={newItemText}
					onChange={(e) => setNewItemText(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Enter item text"
					style={{
						padding: "8px",
						flexGrow: 1,
						marginRight: "8px",
						borderRadius: "4px",
						border: "1px solid #ddd",
					}}
				/>
				<button
					onClick={handleAddItem}
					style={{
						padding: "8px 16px",
						backgroundColor: "#4caf50",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}>
					Add
				</button>
			</div>

			<ItemsList
				items={items}
				onRemoveItem={handleRemoveItem}
			/>

			<div
				style={{
					marginTop: "16px",
					fontSize: "0.9em",
					color: "#757575",
				}}>
				Total items: {items.length}
			</div>
		</div>
	);
};

export default ItemsContainer;
