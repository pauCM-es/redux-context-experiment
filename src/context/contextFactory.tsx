import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import { type GenericRecord } from "../types/utils.types";
import type {
    Action,
    ContextConfig,
    FactoryResult,
    ContextProviderProps,
    ContextFallback,
} from "./context.types";

export function createContextFactory<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
>(
    config: ContextConfig<TState, TActions>
): FactoryResult<TState, TActions, typeof config> {
    const { initialState, contextName, actions = {} } = config;

    const contextFallback: ContextFallback<TState, TActions> = {
        ctxState: initialState,
        getCtxState: () => initialState,
        ctxDispatch: () => void 0,
    };

    const Context = createContext(contextFallback);

    //! ------- HOOK ----------------------
    const useContextHook = () => {
        const context = useContext(Context);

        if (context === undefined) {
            throw new Error(
                `use${contextName}Context must be used within a ${contextName}ContextProvider`
            );
        }

        // Retornar el estado con getState, dispatch y actions
        return context;
    };

    //! ---------- PROVIDER --------------------
    const Provider = ({ children }: ContextProviderProps<TState>) => {
        const [state, setState] = useState<TState>(initialState);
        const stateRef = useRef<TState>(state);

        // Actualizar la referencia cuando el estado cambie
        stateRef.current = state;

        // Función getState que accede a la referencia
        const getState = useCallback(() => stateRef.current, []);
        const dispatch = useCallback(
            <TActionKey extends keyof TActions>(
                actionName: TActionKey,
                payload: Parameters<TActions[TActionKey]>[1]
            ) => {
                const currentState = { ...stateRef.current };
                actions?.[actionName](currentState, payload);
                setState((prev) => ({ ...prev, ...currentState }));
            },
            []
        );

        const extendedValue = useMemo(
            () => ({
                state,
                getState,
                dispatch,
            }),
            [state, getState, dispatch]
        );

        return (
            <Context.Provider value={extendedValue}>
                {children}
            </Context.Provider>
        );
    };

    const result = {
        [`${contextName}ContextProvider`]: Provider,
        [`use${contextName}Context`]: useContextHook,
    } as FactoryResult<TState, TActions, typeof config>;

    return result;
}
