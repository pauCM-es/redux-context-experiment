import React from "react";

interface ItemProps {
	text: string;
	index: number;
	onRemove?: (index: number) => void;
}

const Item: React.FC<ItemProps> = ({ text, index, onRemove }) => {
	console.log("[RENDER] Item", index);

	return (
		<div
			style={{
				padding: "8px 12px",
				margin: "4px 0",
				backgroundColor: "#f5f5f5",
				borderRadius: "4px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}>
			<span>{text}</span>

			{onRemove && (
				<button
					onClick={() => onRemove(index)}
					style={{
						background: "#ff5252",
						color: "white",
						border: "none",
						borderRadius: "3px",
						padding: "2px 6px",
						cursor: "pointer",
					}}>
					Remove
				</button>
			)}
		</div>
	);
};

export default Item;
