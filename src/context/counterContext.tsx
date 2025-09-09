import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the context value type
interface CounterContextValue {
	counter: number;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
const CounterContext = createContext<CounterContextValue | undefined>(
	undefined
);

// Context provider component
interface CounterContextProviderProps {
	children: ReactNode;
}

export const CounterContextProvider: React.FC<CounterContextProviderProps> = ({
	children,
}) => {
	// State definition
	const [counter, setCounter] = useState<number>(0);

	// Context value
	const contextValue: CounterContextValue = {
		counter,
		setCounter,
	};

	return (
		<CounterContext.Provider value={contextValue}>
			{children}
		</CounterContext.Provider>
	);
};

// Custom hook to use the context
export const useCounterContext = (): CounterContextValue => {
	const context = useContext(CounterContext);

	if (context === undefined) {
		throw new Error(
			"useCounterContext must be used within a CounterContextProvider"
		);
	}

	return context;
};
