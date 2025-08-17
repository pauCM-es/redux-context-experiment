import type { ReactNode } from "react";
import type {
    ContextHookName,
    ContextProviderName,
    GenericRecord,
} from "../types/utils.types";

export type ContextValue<T> = T;

type Selector<TState> = (state: TState) => any;

type Payload = any;

export type Action<TState> = (state: TState, payload: Payload) => void;

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

export type Dispatcher<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
> = <TKey extends keyof TActions>(
    actionName: TKey,
    payload?: Parameters<TActions[TKey]>[1]
) => void;

export type ContextHookResult<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
> = () => {
    ctxState: TState;
    getCtxState: () => TState;
    ctxDispatch: Dispatcher<TState, TActions>;
};

export type ContextFallback<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>
> = ReturnType<ContextHookResult<TState, TActions>>;

export type FactoryResult<
    TState extends GenericRecord,
    TActions extends Record<string, Action<TState>>,
    TConfig extends ContextConfig<TState, TActions>
> = {
    [key in ResultKeys<TConfig["contextName"]>]: key extends ContextHookName<
        TConfig["contextName"]
    >
        ? ContextHookResult<TState, TActions>
        : key extends ContextProviderName<TConfig["contextName"]>
        ? React.FC<ContextProviderProps<TState>>
        : never;
};
