import { useState } from "react";
import NavBar from "./NavBar";
import { StageMessage } from "./Stage";
function StageSettings({
    StageMessages,
    submitPrompt,
    popMessage,
    deletedMessage,
    redoMessage,
}) {
    return (
        <>
            <div style={{ width: "50vw" }}>
                <NavBar StageMessages={StageMessages} />
                <input type="text" style={{ width: "100%", height: "500px" }} />
                <div style={{ display: "flex" }}>
                    <button onClick={submitPrompt}>Submit</button>
                    {deletedMessage ? (
                        <p>Undo</p>
                    ) : (
                        <button onClick={popMessage}>Undo</button>
                    )}
                    {deletedMessage ? (
                        <button onClick={redoMessage}>Redo</button>
                    ) : (
                        <p>Redo</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default StageSettings;
