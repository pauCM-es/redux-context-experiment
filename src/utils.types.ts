export type GenericRecord = Record<string, any>;

export type Capitalize<T extends string> = T extends `${infer F}${infer R}`
    ? `${Uppercase<F>}${R}`
    : T;
export const CapitalizeWord = <T extends string>(word: T): Capitalize<T> => {
    return (word.charAt(0).toUpperCase() + word.slice(1)) as Capitalize<T>;
};

export type SetterName<T extends string> = T extends `${infer F}${infer R}`
    ? `set${Capitalize<F>}${R}`
    : never;

export type ActionName<T extends string> = T extends `${infer F}${infer R}`
    ? `action${Capitalize<F>}${R}`
    : never;

export type HookName<T extends string> = `use${Capitalize<T>}`;

export type ContextName<T extends string> = `${Capitalize<T>}Context`;

export type ContextProviderName<T extends string> =
    `${Capitalize<T>}ContextProvider`;

export type ContextHookName<T extends string> = `use${Capitalize<T>}Context`;

export type ObjValues<T extends GenericRecord> = T[keyof T];
