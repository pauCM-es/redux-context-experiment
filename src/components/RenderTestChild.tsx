import { useEffect } from "react";

const RenderTestChild = ({
    id,
    paramList,
    paramsAsConst,
    paramListState,
}: {
    id: number;
    paramList: string[];
    paramsAsConst: string[];
    paramListState: string[];
}) => {
    console.log(id, "RenderTestChild render");

    useEffect(() => {
        console.log(id, "[Child Effect] paramList changed", paramList);
    }, [paramList]);

    useEffect(() => {
        console.log(id, "[Child Effect] paramsAsConst changed", paramsAsConst);
    }, [paramsAsConst]);

    useEffect(() => {
        console.log(
            id,
            "[Child Effect] paramListState changed",
            paramListState
        );
    }, [paramListState]);

    return (
        <div className="child-test-section">
            {id}
            <h3>Render Test Child</h3>
            <p>
                paramList: <code>{JSON.stringify(paramList)}</code>
            </p>
            <p>
                paramsAsConst: <code>{JSON.stringify(paramsAsConst)}</code>
            </p>
            <p>
                paramListState: <code>{JSON.stringify(paramListState)}</code>
            </p>
        </div>
    );
};

export default RenderTestChild;
