import { createContext, useContext, type ReactNode } from "react";

// Tipo genérico para el valor del contexto
export type ContextValue<T> = T;

// Tipo genérico para las props del provider
export interface ContextProviderProps<T> {
    value: T;
    children: ReactNode;
}

// Factoría de contextos
export function createContextFactory<T>(contextName: string, defaultValue?: T) {
    // Crear el contexto
    const Context = createContext<T | undefined>(defaultValue);

    // Hook personalizado para usar el contexto
    const useContextHook = () => {
        const context = useContext(Context);
        if (context === undefined && defaultValue === undefined) {
            throw new Error(
                `use${contextName} must be used within a ${contextName}Provider`
            );
        }
        return context as T;
    };

    // Componente Provider
    const Provider = ({ value, children }: ContextProviderProps<T>) => {
        return <Context.Provider value={value}>{children}</Context.Provider>;
    };

    return {
        Context,
        Provider,
        useContext: useContextHook,
    };
}

// Contexto específico para testing
export interface TestContextValue {
    count: number;
    increment: () => void;
    message: string;
    setMessage: (msg: string) => void;
}

export const {
    Context: TestContext,
    Provider: TestContextProvider,
    useContext: useTestContext,
} = createContextFactory<TestContextValue>("TestContext");
