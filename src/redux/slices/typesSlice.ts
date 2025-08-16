import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Interface that defines the shape of the state
interface TypesState {
    // Array type
    arrayValue: string[];

    // Object type
    objectValue: Record<string, unknown>;

    //Normalized record of objects
    normalizedObjectValue: Record<string, Record<string, unknown>>;

    // Array type
    objArrayValue: Record<string, unknown>[];

    // Boolean type
    booleanValue: boolean;

    // String type
    stringValue: string;

    // Number type
    numberValue: number;
}

// Initial state with examples of each data type
const initialState: TypesState = {
    arrayValue: ["item1", "item2", "item3"],
    objectValue: {
        key1: "value1",
        key2: 42,
        key3: true,
    },
    normalizedObjectValue: {
        "1": { id: 1, name: "Object 1" },
        "2": { id: 2, name: "Object 2" },
    },
    objArrayValue: [
        { id: 1, name: "Object 1" },
        { id: 2, name: "Object 2" },
    ],
    booleanValue: false,
    stringValue: "Hello, Redux!",
    numberValue: 42,
};

// Create the slice
export const typesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {
        // Set array value action
        setArrayValue: (state, action: PayloadAction<string[]>) => {
            state.arrayValue = action.payload;
        },

        // Set object value action
        setObjectValue: (
            state,
            action: PayloadAction<Record<string, unknown>>
        ) => {
            state.objectValue = action.payload;
        },

        // Set partial object value action
        setPartialObjectValue: (
            state,
            action: PayloadAction<Partial<Record<string, unknown>>>
        ) => {
            state.objectValue = { ...state.objectValue, ...action.payload };
        },

        // Set partial object in normalizedObjectValue by key
        setPartialNormalizedObjectValue: (
            state,
            action: PayloadAction<{
                key: string;
                value: Partial<Record<string, unknown>>;
            }>
        ) => {
            const { key, value } = action.payload;
            if (state.normalizedObjectValue[key]) {
                state.normalizedObjectValue[key] = {
                    ...state.normalizedObjectValue[key],
                    ...value,
                };
            } else {
                state.normalizedObjectValue[key] = value;
            }
        },

        // Set an object inside objArrayValue by index
        setObjArrayValueItem: (
            state,
            action: PayloadAction<{
                index: number;
                value: Record<string, unknown>;
            }>
        ) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.objArrayValue.length) {
                state.objArrayValue[index] = value;
            }
        },

        // Set boolean value action
        setBooleanValue: (state, action: PayloadAction<boolean>) => {
            state.booleanValue = action.payload;
        },

        // Set string value action
        setStringValue: (state, action: PayloadAction<string>) => {
            state.stringValue = action.payload;
        },

        // Set number value action
        setNumberValue: (state, action: PayloadAction<number>) => {
            state.numberValue = action.payload;
        },

        // Reset all values to initial state
        resetAllValues: () => {
            return initialState;
        },
    },
});

// Selectores individuales para suscripciones eficientes
import type { RootState } from "../store";

export const selectNormalizedObjectValue = (state: RootState) =>
    state.types.normalizedObjectValue;
export const selectNormalizedObjectByKey =
    (key: string) => (state: RootState) =>
        state.types.normalizedObjectValue[key];

export const selectObjArrayValue = (state: RootState) =>
    state.types.objArrayValue;
export const selectObjArrayValueByIndex =
    (index: number) => (state: RootState) =>
        state.types.objArrayValue[index];

// Export action creators
export const {
    setArrayValue,
    setObjectValue,
    setBooleanValue,
    setStringValue,
    setNumberValue,
    resetAllValues,
} = typesSlice.actions;

// Export the reducer
export default typesSlice.reducer;
