import type { ReactNode } from "react";
import type {
    ContextHookName,
    ContextProviderName,
    GenericRecord,
} from "../types/utils.types";
import type { Capitalize } from "./contextFactory";

export type ContextValue<T> = T;

type Payload = any;

export type Action<TState> = (state: TState, payload: Payload) => void;

export interface ContextProviderProps<T> {
    children: ReactNode;
}

type ResultKeys<N extends string> = ContextHookName<N> | ContextProviderName<N>;

export type Selector<TState> = (state: TState) => any;
// Helper type to create auto selectors for first level properties

type AutoSelectors<TState> = {
    [K in keyof TState as `select${Capitalize<string & K>}`]: (
        state: TState
    ) => TState[K];
};

// Combined selectors type
export type AllSelectors<TState, TSelectors> = TSelectors &
    AutoSelectors<TState>;

export interface ContextConfig<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TSelectors extends Record<string, Selector<TState>>
> {
    contextName: string;
    initialState: TState;
    actions?: TActions;
    selectors?: TSelectors;
}

export type Dispatcher<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
> = <TKey extends keyof TActions>(
    actionName: TKey,
    payload?: Parameters<TActions[TKey]>[1]
) => void;

export type ContextHookResult<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TSelectors extends Record<string, Selector<TState>>
> = () => {
    ctxState: TState;
    ctxGetState: () => TState;
    ctxDispatch: Dispatcher<TState, TActions>;
    ctxSelect: (
        selectorKey: keyof AllSelectors<TState, TSelectors>
    ) => ReturnType<AllSelectors<TState, TSelectors>[typeof selectorKey]>;
    ctxSet: (newState: Partial<TState>) => void;
};

export type ContextFallback<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TSelectors extends Record<string, Selector<TState>>
> = ReturnType<ContextHookResult<TState, TActions, TSelectors>>;

export type FactoryResult<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TSelectors extends Record<string, Selector<TState>>,
    TConfig extends ContextConfig<TState, TActions, TSelectors>
> = {
    [key in ResultKeys<TConfig["contextName"]>]: key extends ContextHookName<
        TConfig["contextName"]
    >
        ? ContextHookResult<TState, TActions, TSelectors>
        : key extends ContextProviderName<TConfig["contextName"]>
        ? React.FC<ContextProviderProps<TState>>
        : never;
};
