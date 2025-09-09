import React from "react";
import type { ReactNode } from "react";

// Este archivo ahora está obsoleto y redirige a los contextos específicos
// Solo mantenido por compatibilidad con el código existente

import {
	CombinedContextProvider,
	useCounterContext,
	useListContext,
	useRecordContext,
	addToList,
	removeFromList,
	updateRecord,
} from "./combinedContext";

// Redefinimos el tipo del contexto básico para mantener la compatibilidad
interface BasicContextValue {
	counter: number;
	setCounter: React.Dispatch<React.SetStateAction<number>>;
	list: string[];
	setList: React.Dispatch<React.SetStateAction<string[]>>;
	record: Record<string, any>;
	setRecord: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Context provider component - ahora solo envuelve el provider combinado
interface BasicContextProviderProps {
	children: ReactNode;
}

export const BasicContextProvider: React.FC<BasicContextProviderProps> = ({
	children,
}) => {
	return <CombinedContextProvider>{children}</CombinedContextProvider>;
};

// Custom hook para mantener compatibilidad - combina los tres hooks específicos
export const useBasicContext = (): BasicContextValue => {
	const { counter, setCounter } = useCounterContext();
	const { list, setList } = useListContext();
	const { record, setRecord } = useRecordContext();

	return {
		counter,
		setCounter,
		list,
		setList,
		record,
		setRecord,
	};
};

// Re-exportamos las funciones auxiliares para mantener la compatibilidad
export { addToList, removeFromList, updateRecord };
