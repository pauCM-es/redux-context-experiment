import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the context value type
interface BasicContextValue {
	counter: number;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	list: string[];
	setList: React.Dispatch<React.SetStateAction<string[]>>;
	record: Record<string, any>;
	setRecord: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Create the context with a default value
const BasicContext = createContext<BasicContextValue | undefined>(undefined);

// Context provider component
interface BasicContextProviderProps {
	children: ReactNode;
}

export const BasicContextProvider: React.FC<BasicContextProviderProps> = ({
	children,
}) => {
	// State definitions
	const [counter, setCounter] = useState<number>(0);
	const [list, setList] = useState<string[]>([]);
	const [record, setRecord] = useState<Record<string, any>>({});

	// Context value
	const contextValue: BasicContextValue = {
		counter,
		setCounter,
		list,
		setList,
		record,
		setRecord,
	};

	return (
		<BasicContext.Provider value={contextValue}>
			{children}
		</BasicContext.Provider>
	);
};

// Custom hook to use the context
export const useBasicContext = (): BasicContextValue => {
	const context = useContext(BasicContext);

	if (context === undefined) {
		throw new Error(
			"useBasicContext must be used within a BasicContextProvider"
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

export const updateRecord = (
	record: Record<string, any>,
	key: string,
	value: any
): Record<string, any> => {
	return {
		...record,
		[key]: value,
	};
};
