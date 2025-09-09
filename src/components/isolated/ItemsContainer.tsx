import React, { useState } from "react";
import ItemsList from "./ItemsList";

const ItemsContainer: React.FC = () => {
	console.log("[RENDER] ItemsContainer");

	const [items, setItems] = useState<string[]>([
		"Item 1",
		"Item 2",
		"Item 3",
		"Item 4",
		"Item 5",
	]);

	const handleRemoveItem = React.useCallback((index: number) => {
		setItems((items) => items.filter((_, i) => i !== index));
	}, []);

	return (
		<ItemsList
			items={items}
			onRemoveItem={handleRemoveItem}
		/>
	);
};

export default ItemsContainer;
