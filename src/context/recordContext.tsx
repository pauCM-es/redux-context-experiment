import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the context value type
interface RecordContextValue {
	record: Record<string, any>;
	setRecord: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Create the context with a default value
const RecordContext = createContext<RecordContextValue | undefined>(undefined);

// Context provider component
interface RecordContextProviderProps {
	children: ReactNode;
}

export const RecordContextProvider: React.FC<RecordContextProviderProps> = ({
	children,
}) => {
	// State definition
	const [record, setRecord] = useState<Record<string, any>>({});

	// Context value
	const contextValue: RecordContextValue = {
		record,
		setRecord,
	};

	return (
		<RecordContext.Provider value={contextValue}>
			{children}
		</RecordContext.Provider>
	);
};

// Custom hook to use the context
export const useRecordContext = (): RecordContextValue => {
	const context = useContext(RecordContext);

	if (context === undefined) {
		throw new Error(
			"useRecordContext must be used within a RecordContextProvider"
		);
	}

	return context;
};

// Helper function for common operations
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
