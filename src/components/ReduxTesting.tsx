import { useState, useEffect } from "react";
import TypesExample from "./TypesExample";
import RenderTestChild from "./RenderTestChild";

const paramsAsConst = ["param1", "param2"];

const ReduxTesting = () => {
    const [count, setCount] = useState(0);
    const [paramList, setParamList] = useState(["param1", "param2"]);

    useEffect(() => {
        if (count % 2 === 0) {
            setParamList(["param1", String(count)]);
        }
        // Si es impar, no actualizamos paramList
    }, [count]);

    return (
        <>
            <h2>Redux Testing</h2>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>

            {/* Componente que muestra los diferentes tipos de datos */}
            <TypesExample
                paramList={["param1", "param2"]}
                paramListState={paramList}
                paramsAsConst={paramsAsConst}
            />
            <RenderTestChild
                id={2}
                paramList={paramList}
                paramListState={paramList}
                paramsAsConst={paramsAsConst}
            />
        </>
    );
};

export default ReduxTesting;
