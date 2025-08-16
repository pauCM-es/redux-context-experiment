import { useState } from "react";
import "./App.css";
import ReduxTesting from "./components/ReduxTesting";
import ContextTesting from "./components/ContextTesting";

function App() {
    const [showRedux, setShowRedux] = useState(true);

    return (
        <>
            <h1>React Testing App</h1>

            <div className="card">
                <button onClick={() => setShowRedux(!showRedux)}>
                    {showRedux ? "Show Context Testing" : "Show Redux Testing"}
                </button>
            </div>

            {showRedux ? <ReduxTesting /> : <ContextTesting />}
        </>
    );
}

export default App;
