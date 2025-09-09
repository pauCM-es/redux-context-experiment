import CounterActions from "./actions/CounterActions";
import ListActions from "./actions/ListActions";
import RecordActions from "./actions/RecordActions";
import GlobalActions from "./actions/GlobalActions";

const BasicContextActions = () => {
	console.log("[RENDER] BasicContextActions");

	return (
		<div className="basic-context-actions">
			<h3>Basic Context Actions</h3>

			{/* Individual action components */}
			<CounterActions />
			<ListActions />
			<RecordActions />
			<GlobalActions />
		</div>
	);
};

export default BasicContextActions;
