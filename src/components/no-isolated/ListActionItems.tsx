import { useListDataContext } from "../../context/listContext";
import ItemsList from "../isolated/ItemsList";

export const ListActionItems = () => {
	console.log("[RENDER] ListActionItems");
	const { list } = useListDataContext();

	return <ItemsList items={list} />;
};
