import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../redux/store";
import {
    setArrayValue,
    setObjectValue,
    selectNormalizedObjectValue,
    selectNormalizedObjectByKey,
    selectObjArrayValue,
    selectObjArrayValueByIndex,
} from "../redux/slices/typesSlice";
import { useState, useEffect, useMemo } from "react";
import "./TypesExample.css";
import RenderTestChild from "./RenderTestChild";

const TypesExample = ({
    paramList,
    paramsAsConst,
    paramListState,
}: {
    paramList: string[];
    paramListState: string[];
    paramsAsConst: string[];
}) => {
    const types = useSelector((state: RootState) => state.types);
    const dispatch = useDispatch();

    const normalizedObjectValue = useSelector(selectNormalizedObjectValue);
    const objArrayValue = useSelector(selectObjArrayValue);
    const normalizedItem1 = useSelector(selectNormalizedObjectByKey("1"));
    // const normalizedItem2 = useSelector(selectNormalizedObjectByKey("2"));
    const objArrayItem0 = useSelector(selectObjArrayValueByIndex(0));

    const [normalizedName, setNormalizedName] = useState("");
    const [objArrayName, setObjArrayName] = useState("");
    const [numberInput, setNumberInput] = useState("");

    // Log para el render general del componente
    console.log("TypesExample render");

    const memoizedParamList = useMemo(() => {
        return paramList;
    }, [paramList]);

    const paramListString = JSON.stringify(paramList);
    const memoizedContentParamList = useMemo(() => {
        return paramList;
    }, [paramList, paramListString]);

    const memoizedParamListAsConst = useMemo(() => {
        return paramsAsConst;
    }, [paramsAsConst]);

    // Efectos para testear los re-renderizados de las suscripciones
    useEffect(() => {
        console.log(
            "[Effect] normalizedObjectValue changed",
            normalizedObjectValue
        );
    }, [normalizedObjectValue]);

    useEffect(() => {
        console.log("[Effect] normalizedItem1 changed", normalizedItem1);
    }, [normalizedItem1]);

    //random tests
    // useEffect(() => {
    //     console.log("[Effect] paramList changed in parent", paramList);
    // }, [paramList]);

    useEffect(() => {
        console.log(
            "[Effect] memoizedContentParamList changed in parent",
            memoizedContentParamList
        );
    }, [memoizedContentParamList]);

    useEffect(() => {
        console.log(
            "[Effect] paramListState changed in parent",
            paramListState
        );
    }, [paramListState]);

    useEffect(() => {
        console.log("[Effect] paramsAsConst changed in parent", paramsAsConst);
    }, [paramsAsConst]);

    useEffect(() => {
        console.log(
            "[Effect] memoizedParamListAsConst changed in parent",
            memoizedParamListAsConst
        );
    }, [memoizedParamListAsConst]);

    useEffect(() => {
        console.log(
            "[Effect] memoizedParamList changed in parent",
            memoizedParamList
        );
    }, [memoizedParamList]);

    useEffect(() => {
        console.log("[Effect] objArrayValue changed", objArrayValue);
    }, [objArrayValue]);

    useEffect(() => {
        console.log("[Effect] objArrayItem0 changed", objArrayItem0);
    }, [objArrayItem0]);

    return (
        <div className="types-example">
            <RenderTestChild
                id={1}
                paramList={paramList}
                paramListState={paramList}
                paramsAsConst={paramsAsConst}
            />
            <h2>Redux Data Types Example</h2>

            <div className="type-section">
                <h3>Array Type</h3>
                <p>
                    Current value:{" "}
                    <code>{JSON.stringify(types.arrayValue)}</code>
                </p>
                <button
                    onClick={() =>
                        dispatch(setArrayValue(["new", "array", "items"]))
                    }
                >
                    Change Array
                </button>
            </div>

            <div className="type-section">
                <h3>Object Type</h3>
                <p>
                    Current value:{" "}
                    <code>{JSON.stringify(types.objectValue)}</code>
                </p>
                <button
                    onClick={() =>
                        dispatch(
                            setObjectValue({
                                newKey: "newValue",
                                changedObject: true,
                            })
                        )
                    }
                >
                    Change Object
                </button>
            </div>

            <div className="type-section">
                <h3>Normalized Object Value</h3>
                <p>
                    Current value:{" "}
                    <code>{JSON.stringify(normalizedObjectValue)}</code>
                </p>
                <p>
                    Item con clave "1":{" "}
                    <code>{JSON.stringify(normalizedItem1)}</code>
                </p>
                <input
                    type="text"
                    placeholder="Nuevo nombre para clave '1'"
                    value={normalizedName}
                    onChange={(e) => setNormalizedName(e.target.value)}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "types/setPartialNormalizedObjectValue",
                            payload: {
                                key: "1",
                                value: {
                                    name: normalizedName,
                                    updated: true,
                                },
                            },
                        });
                        setNormalizedName("");
                    }}
                    disabled={!normalizedName.trim()}
                >
                    Modificar objeto con clave "1"
                </button>
            </div>
            <div className="type-section">
                <h3>Array de Objetos</h3>
                <p>
                    Current value: <code>{JSON.stringify(objArrayValue)}</code>
                </p>
                <p>
                    Objeto en índice 0:{" "}
                    <code>{JSON.stringify(objArrayItem0)}</code>
                </p>
                <input
                    type="text"
                    placeholder="Nuevo nombre para índice 0"
                    value={objArrayName}
                    onChange={(e) => setObjArrayName(e.target.value)}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "types/setObjArrayValueItem",
                            payload: {
                                index: 0,
                                value: {
                                    ...objArrayItem0,
                                    name: objArrayName,
                                    changed: true,
                                },
                            },
                        });
                        setObjArrayName("");
                    }}
                    disabled={!objArrayName.trim()}
                >
                    Modificar objeto en índice 0
                </button>
            </div>

            <div className="type-section">
                <h3>Number Value</h3>
                <p>
                    Current value: <code>{types.numberValue}</code>
                </p>
                <input
                    type="number"
                    placeholder="Nuevo número"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: "types/setNumberValue",
                            payload: Number(numberInput),
                        });
                        setNumberInput("");
                    }}
                    disabled={
                        numberInput.trim() === "" || isNaN(Number(numberInput))
                    }
                >
                    Modificar número
                </button>
            </div>
        </div>
    );
};

export default TypesExample;
