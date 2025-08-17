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

    // Create auto selectors for first-level properties
    const allSelectors: AllSelectors<TState, TSelectors> = Object.keys(
        initialState
    ).reduce(
        (acc, key) => {
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            acc[`select${capitalizedKey}`] = (state: TState) =>
                state[key as keyof TState];
            return acc;
        },
        { ...selectors } as AllSelectors<TState, TSelectors>
    );

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

        // Only allow predefined selector keys
        // const selectedCtxState = useMemo(() => {
        //     if (!allSelectors || !selectorKey) {
        //         return context;
        //     }
        //     const selector = allSelectors[selectorKey];

        //     if (!selector) {
        //         throw new Error(
        //             `Selector "${String(
        //                 selectorKey
        //             )}" not found. Available selectors: ${Object.keys(
        //                 allSelectors
        //             ).join(", ")}`
        //         );
        //     }
        //     return selector(context.ctxState);
        // }, [context, selectorKey]);

        return context;
    }

    //! ---------- PROVIDER --------------------
    const Provider = ({ children }: ContextProviderProps<TState>) => {
        const [, forceUpdate] = useState({});
        const stateRef = useRef<TState>(initialState);

        // Force re-render function
        const triggerUpdate = useCallback(() => forceUpdate({}), []);

        // getState function that accesses the reference
        const ctxGetState = useCallback(() => stateRef.current, []);

        const ctxSelect = useCallback(
            (selectorKey: keyof AllSelectors<TState, TSelectors>) => {
                const selector = allSelectors[selectorKey];
                if (!selector) {
                    throw new Error(
                        `Selector "${String(selectorKey)}" not found.`
                    );
                }
                return selector(stateRef.current);
            },
            []
        );

        // Dispatch (always triggers re-renders with deep updates)
        const ctxDispatch = useCallback(
            <TActionKey extends keyof TActions>(
                actionName: TActionKey,
                payload: Parameters<TActions[TActionKey]>[1]
            ) => {
                const newState = produce(stateRef.current, (draft) => {
                    actions?.[actionName]?.(draft as TState, payload);
                });
                stateRef.current = newState;
                triggerUpdate();
            },
            [triggerUpdate]
        );

        // Normal set (triggers re-renders + shallow update)
        const ctxSet = useCallback(
            (
                partial: Partial<TState> | ((state: TState) => Partial<TState>)
            ) => {
                if (typeof partial === "function") {
                    const newState = partial(stateRef.current);
                    stateRef.current = { ...stateRef.current, ...newState };
                } else {
                    stateRef.current = { ...stateRef.current, ...partial };
                }
                triggerUpdate();
            },
            [triggerUpdate]
        );

        // Immer-based deep updates with structural sharing (triggers re-renders)
        const ctxProduce = useCallback(
            (recipe: (draft: TState) => void | TState) => {
                const newState = produce(stateRef.current, recipe);
                stateRef.current = newState;
                triggerUpdate();
            },
            [triggerUpdate]
        );

        // Silent set (NO re-renders + shallow update)
        const ctxSetSilent = useCallback(
            (
                partial: Partial<TState> | ((state: TState) => Partial<TState>)
            ) => {
                if (typeof partial === "function") {
                    const newState = partial(stateRef.current);
                    stateRef.current = { ...stateRef.current, ...newState };
                } else {
                    stateRef.current = { ...stateRef.current, ...partial };
                }
                // No triggerUpdate() = no re-renders
            },
            []
        );

        // Silent Immer-based updates (NO re-renders + deep update with structural sharing)
        const ctxProduceSilent = useCallback(
            (recipe: (draft: TState) => void | TState) => {
                const newState = produce(stateRef.current, recipe);
                stateRef.current = newState;
                // No triggerUpdate() = no re-renders
            },
            []
        );

        // Batch updates (multiple silent + single re-render)
        const ctxBatch = useCallback(
            (
                batchFn: (
                    produce: typeof ctxProduceSilent,
                    set: typeof ctxSetSilent
                ) => void
            ) => {
                batchFn(ctxProduceSilent, ctxSetSilent);
                triggerUpdate();
            },
            [ctxProduceSilent, ctxSetSilent, triggerUpdate]
        );

        const extendedValue = useMemo(
            () => ({
                ctxState: stateRef.current,
                ctxGetState,
                ctxSelect,
                ctxSet, // Shallow + re-render
                // ctxProduce, // Deep + re-render (with structural sharing)
                // ctxSetSilent, // Shallow + silent
                // ctxProduceSilent, // Deep + silent (with structural sharing)
                ctxDispatch, // Actions + re-render (with Immer)
                // ctxBatch, // Multiple updates + single re-render
            }),
            [
                ctxGetState,
                ctxSelect,
                ctxSet,
                // ctxProduce,
                // ctxSetSilent,
                // ctxProduceSilent,
                ctxDispatch,
                // ctxBatch,
            ]
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
