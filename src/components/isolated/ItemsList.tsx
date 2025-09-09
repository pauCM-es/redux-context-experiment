import React from "react";
import Item from "./Item";

interface ItemsListProps {
	items: string[];
	onRemoveItem?: (index: number) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ items, onRemoveItem }) => {
	console.log("[RENDER] ItemsList");

	return (
		<div style={{ padding: "8px 0" }}>
			{items.map((item, index) => (
				<Item
					key={index}
					text={item}
					index={index}
					onRemove={onRemoveItem}
				/>
			))}
		</div>
	);
};

export default ItemsList;
