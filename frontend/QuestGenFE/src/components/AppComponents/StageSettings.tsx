import { useState } from "react";
import NavBar from "./NavBar";
import { StageMessage } from "./Stage";
function StageSettings({ StageMessages, setStageMessages }) {
    const [deletedMessages, setDeletedMessages] = useState<Array<StageMessage>>(
        []
    );

    const submitPrompt = () => {
        setStageMessages((prevStageMessages) =>
            prevStageMessages.concat({
                content: "Stage Data",
                key: prevStageMessages.length,
            })
        );
    };

    const popMessage = () => {
        setStageMessages((prevStageMessages) => prevStageMessages.pop());
    };

    return (
        <>
            <div style={{ width: "50vw" }}>
                <NavBar
                    StageMessages={StageMessages}
                    setStageMessages={setStageMessages}
                />
                <input type="text" style={{ width: "100%", height: "500px" }} />
                <button onClick={submitPrompt}>Submit</button>
                <button onClick={popMessage}>Undo</button>
                <button>Redo</button>
            </div>
        </>
    );
}

export default StageSettings;
