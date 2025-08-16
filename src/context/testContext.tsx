import { createContextFactory } from "./contextFactory";

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
