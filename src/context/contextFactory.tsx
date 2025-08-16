import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import {
    type ContextHookName,
    type ContextProviderName,
    type GenericRecord,
} from "../utils.types";

export type ContextValue<T> = T;

type Selector<TState> = (state: TState) => any;

type Payload = any;

type Action<TState> = (state: TState, payload: Payload) => void;
export interface ContextProviderProps<T> {
    children: ReactNode;
}

type ResultKeys<N extends string> = ContextHookName<N> | ContextProviderName<N>;

export interface ContextConfig<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
> {
    contextName: string;
    initialState: TState;
    actions?: TActions;
    selectors?: Record<string, Selector<TState>>;
}

// type Dispatch<
//     TState extends GenericRecord,
//     TActions extends NonNullable<ContextConfig<TState>["actions"]>
//     // TActionKey extends keyof TActions
// > = (
//     actionName: keyof TActions,
//     payload?: Parameters<TActions[typeof actionName]>[1]
// ) => void;

type FactoryResult<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TConfig extends ContextConfig<TState, TActions>
> = {
    [key in ResultKeys<TConfig["contextName"]>]: key extends ContextHookName<
        TConfig["contextName"]
    >
        ? () => {
              contextState: TState;
              getState: () => TState;
              //   dispatch: Dispatch<TState, NonNullable<TConfig["actions"]>>;
              dispatch: <TKey extends keyof TActions>(
                  actionName: TKey,
                  payload?: Parameters<NonNullable<TActions>[TKey]>[1]
              ) => void;
          }
        : key extends ContextProviderName<TConfig["contextName"]>
        ? React.FC<ContextProviderProps<TState>>
        : never;
};

// Factoría de contextos con nombres dinámicos y actions
export function createContextFactory<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
>(
    config: ContextConfig<TState, TActions>
): FactoryResult<TState, TActions, typeof config> {
    const { initialState, contextName, actions = {} } = config;

    const contextFallback: {
        state: TState;
        getState: () => TState;
        dispatch: <TKey extends keyof TActions>(
            actionName: TKey,
            payload?: Parameters<NonNullable<TActions>[TKey]>[1]
        ) => void;
    } = {
        state: initialState,
        getState: () => initialState,
        dispatch: () => void 0,
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
        return {
            contextState: context.state,
            getState: context.getState,
            dispatch: context.dispatch,
        };
    };

    // ---------- PROVIDER --------------------
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
