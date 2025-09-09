import React, { useEffect } from "react";
import Item from "./Item";

interface ItemsListProps {
	items: string[];
	onRemoveItem?: (index: number) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({ items, onRemoveItem }) => {
	console.log("[RENDER] ItemsList");

	useEffect(() => {
		console.log("[EFFECT] ItemsList items prop changed");
	}, [items]);

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

// Utilizamos React.memo para evitar re-renderizados cuando las props no cambien
export default React.memo(ItemsList);
