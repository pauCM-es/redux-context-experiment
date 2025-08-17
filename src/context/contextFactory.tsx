import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import { produce } from "immer";
import { type GenericRecord } from "../types/utils.types";
import type {
    Action,
    ContextConfig,
    FactoryResult,
    ContextProviderProps,
    ContextFallback,
    AllSelectors,
    Selector,
} from "./context.types";

// Helper type to capitalize string literals
export type Capitalize<S extends string> = S extends `${infer T}${infer U}`
    ? `${Uppercase<T>}${U}`
    : S;

export function createContextFactory<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TSelectors extends Record<string, Selector<TState>>
>(
    config: ContextConfig<TState, TActions, TSelectors>
): FactoryResult<TState, TActions, TSelectors, typeof config> {
    const {
        initialState = {} as TState,
        contextName,
        actions = {} as TActions,
        selectors = {} as TSelectors,
    } = config;

    const contextFallback: ContextFallback<TState, TActions, TSelectors> = {
        ctxState: initialState,
        ctxGetState: () => initialState,
        ctxDispatch: () => void 0,
        ctxSelect: () => undefined,
        ctxSet: () => void 0,
    };

    const Context = createContext(contextFallback);

    //! ------- HOOK ----------------------
    function useContextHook() {
        // selectorKey?: TSelectorKey
        const context = useContext(Context);

        if (context === undefined) {
            throw new Error(
                `use${contextName}Context must be used within a ${contextName}ContextProvider`
            );
        }

        return context;
    }

    //! ---------- PROVIDER --------------------
    const Provider = ({ children }: ContextProviderProps<TState>) => {
        const [ctxState, setCtxState] = useState<TState>(initialState);
        const stateRef = useRef<TState>(initialState);
        console.log("%c===> PROVIDER", "background: black; color: white", {
            stateRef,
        });

        // Create auto selectors for first-level properties
        const allSelectors = useMemo(() => {
            return Object.keys(initialState).reduce(
                (acc, key) => {
                    const capitalizedKey =
                        key.charAt(0).toUpperCase() + key.slice(1);
                    acc[`select${capitalizedKey}`] = (state: TState) =>
                        state[key as keyof TState];
                    return acc;
                },
                { ...selectors } as AllSelectors<TState, TSelectors>
            );
        }, []);

        // getState functin that accesses the reference
        const ctxGetState = useCallback(() => stateRef.current, []);

        const ctxSelect = useCallback(
            (selectorKey: keyof AllSelectors<TState, TSelectors>) => {
                const selector = allSelectors[selectorKey];
                if (!selector) {
                    throw new Error(
                        `Selector "${String(selectorKey)}" not found.`
                    );
                }
                return selector(ctxState);
            },
            [ctxState]
        );

        // Dispatch (always triggers re-renders with deep updates)
        const ctxDispatch = useCallback(
            <TActionKey extends keyof TActions>(
                actionName: TActionKey,
                payload: Parameters<TActions[TActionKey]>[1]
            ) => {
                console.log(
                    "%c===> DISPATCH ",
                    "background: orange; color: white",
                    { actionName }
                );
                setCtxState((prev) => {
                    const newState = { ...prev };
                    actions?.[actionName]?.(newState as TState, payload);
                    return { ...newState };
                });
            },
            []
        );

        // Normal set (triggers re-renders + shallow update)
        const ctxSet = useCallback(
            (
                partial: Partial<TState> | ((state: TState) => Partial<TState>)
            ) => {
                if (typeof partial === "function") {
                    console.log(
                        "%c===>CTX SET",
                        "background: orange; color: white",
                        { partial }
                    );
                    setCtxState((prev) => ({
                        ...prev,
                        ...partial(prev),
                    }));
                } else {
                    setCtxState((prev) => ({
                        ...prev,
                        partial,
                    }));
                    console.log(
                        "%c===>CTX SET",
                        "background: orange; color: white",
                        { partial }
                    );
                }
            },
            []
        );

        // Immer-based deep updates with structural sharing (triggers re-renders)
        const ctxProduce = useCallback(
            (recipe: (draft: TState) => void | TState) => {
                const newState = produce(stateRef.current, recipe);
                stateRef.current = newState;
            },
            []
        );

        const extendedValue = useMemo(
            () => ({
                ctxState,
                ctxGetState,
                ctxSelect,
                ctxSet, // Shallow + re-render
                ctxDispatch, // Actions + re-render (with Immer)
                // ctxProduce, // Deep + re-render (with structural sharing)
            }),
            [ctxState, ctxGetState, ctxSelect, ctxSet, ctxDispatch]
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
    };
    // as FactoryResult<TState, TActions, TSelectors, typeof config>;

    return result;
}
