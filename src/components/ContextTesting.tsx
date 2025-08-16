import { useState, useEffect } from "react";
import {
    TestContextProvider,
    useTestContext,
    type TestContextValue,
} from "../context/contextFactory";

// Componente hijo que consume el contexto
const ContextConsumer = () => {
    const { count, increment, message, setMessage } = useTestContext();

    console.log("ContextConsumer render");

    useEffect(() => {
        console.log("[Context Effect] count changed", count);
    }, [count]);

    useEffect(() => {
        console.log("[Context Effect] message changed", message);
    }, [message]);

    return (
        <div className="context-consumer">
            <h3>Context Consumer</h3>
            <p>
                Count from context: <code>{count}</code>
            </p>
            <p>
                Message from context: <code>{message}</code>
            </p>
            <button onClick={increment}>Increment Count</button>
            <input
                type="text"
                placeholder="Change message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </div>
    );
};

// Componente provider
const ContextTesting = () => {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Hello Context");

    console.log("ContextTesting render");

    const increment = () => setCount((prev) => prev + 1);

    const contextValue: TestContextValue = {
        count,
        increment,
        message,
        setMessage,
    };

    return (
        <TestContextProvider value={contextValue}>
            <h2>Context Testing</h2>
            <div className="context-testing">
                <ContextConsumer />
            </div>
        </TestContextProvider>
    );
};

export default ContextTesting;
