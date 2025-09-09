import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the context value type
interface ListContextValue {
	list: string[];
	setList: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context with a default value
const ListContext = createContext<ListContextValue | undefined>(undefined);

// Context provider component
interface ListContextProviderProps {
	children: ReactNode;
}

export const ListContextProvider: React.FC<ListContextProviderProps> = ({
	children,
}) => {
	// State definition
	const [list, setList] = useState<string[]>([]);

	// Context value
	const contextValue: ListContextValue = {
		list,
		setList,
	};

	return (
		<ListContext.Provider value={contextValue}>
			{children}
		</ListContext.Provider>
	);
};

// Custom hook to use the context
export const useListContext = (): ListContextValue => {
	const context = useContext(ListContext);

	if (context === undefined) {
		throw new Error(
			"useListContext must be used within a ListContextProvider"
		);
	}

	return context;
};

// Helper functions for common operations
export const addToList = (list: string[], item: string): string[] => {
	return [...list, item];
};

export const removeFromList = (list: string[], index: number): string[] => {
	return list.filter((_, i) => i !== index);
};
