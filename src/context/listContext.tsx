import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// ==================== Data Context ====================
// Define the data context value type
interface ListDataContextValue {
	list: string[];
}

// Create the data context with a default value
const ListDataContext = createContext<ListDataContextValue | undefined>(
	undefined
);

// ==================== API Context ====================
// Define the API context value type
interface ListApiContextValue {
	setList: React.Dispatch<React.SetStateAction<string[]>>;
	addItem: (item: string) => void;
	removeItem: (index: number) => void;
	clearList: () => void;
}

// Create the API context with a default value
const ListApiContext = createContext<ListApiContextValue | undefined>(
	undefined
);

// ==================== Helper Functions ====================
// These functions don't need to be exported anymore as they're used internally
const addToList = (list: string[], item: string): string[] => {
	return [...list, item];
};

const removeFromList = (list: string[], index: number): string[] => {
	return list.filter((_, i) => i !== index);
};

// ==================== Combined Provider ====================
// Context provider component
interface ListContextProviderProps {
	children: ReactNode;
}

export const ListContextProvider: React.FC<ListContextProviderProps> = ({
	children,
}) => {
	// Shared state definition
	const [list, setList] = useState<string[]>([]);

	// API operations
	const addItem = (item: string) => {
		if (item.trim()) {
			setList((prevList) => addToList(prevList, item.trim()));
		}
	};

	const removeItem = (index: number) => {
		setList((prevList) => removeFromList(prevList, index));
	};

	const clearList = () => {
		setList([]);
	};

	// Data context value (read-only)
	const dataContextValue: ListDataContextValue = {
		list,
	};

	// API context value (operations)
	const apiContextValue = React.useMemo<ListApiContextValue>(
		() => ({
			setList,
			addItem,
			removeItem,
			clearList,
		}),
		[]
	);
	// const apiContextValue = {
	// 	setList,
	// 	addItem,
	// 	removeItem,
	// 	clearList,
	// };

	return (
		<ListDataContext.Provider value={dataContextValue}>
			<ListApiContext.Provider value={apiContextValue}>
				{children}
			</ListApiContext.Provider>
		</ListDataContext.Provider>
	);
};

// ==================== Custom Hooks ====================
// Hook for data access (for monitors)
export const useListDataContext = (): ListDataContextValue => {
	const context = useContext(ListDataContext);

	if (context === undefined) {
		throw new Error(
			"useListDataContext must be used within a ListContextProvider"
		);
	}

	return context;
};

// Hook for API access (for actions)
export const useListApiContext = (): ListApiContextValue => {
	const context = useContext(ListApiContext);

	if (context === undefined) {
		throw new Error(
			"useListApiContext must be used within a ListContextProvider"
		);
	}

	return context;
};

// Backward compatibility hook (provides both data and API)
export const useListContext = (): ListDataContextValue &
	ListApiContextValue => {
	const dataContext = useListDataContext();
	const apiContext = useListApiContext();

	return {
		...dataContext,
		...apiContext,
	};
};
