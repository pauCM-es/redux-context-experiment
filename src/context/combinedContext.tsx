import React from "react";
import type { ReactNode } from "react";
import { CounterContextProvider } from "./counterContext";
import { ListContextProvider } from "./listContext";
import { RecordContextProvider } from "./recordContext";

// Contexto combinado que utiliza los tres providers
interface CombinedContextProviderProps {
	children: ReactNode;
}

export const CombinedContextProvider: React.FC<
	CombinedContextProviderProps
> = ({ children }) => {
	return (
		<CounterContextProvider>
			<ListContextProvider>
				<RecordContextProvider>{children}</RecordContextProvider>
			</ListContextProvider>
		</CounterContextProvider>
	);
};

// Re-exportamos los hooks y funciones auxiliares para facilitar su uso
export { useCounterContext } from "./counterContext";

export { useListContext, addToList, removeFromList } from "./listContext";

export { useRecordContext, updateRecord } from "./recordContext";
