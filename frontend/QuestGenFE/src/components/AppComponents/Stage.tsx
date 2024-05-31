import { useEffect, useState } from "react";
import StageDisplay from "./StageDisplay";
import StageSettings from "./StageSettings";

// Each message point that appears on the stage display
export type StageMessage = {
    content: string;
    key: number;
};

function Stage() {
    const [stageMessages, setStageMessages] = useState<StageMessage[]>([]);

    // Should only store the length-1 element
    const [deletedMessage, setDeletedMessage] = useState<StageMessage>();

    const submitMessage = () => {
        setStageMessages((prevStageMessages) =>
            prevStageMessages.concat({
                content: "Stage Data",
                key: prevStageMessages.length,
            })
        );
        setDeletedMessage(undefined);
    };

    const undoMessage = () => {
        const finalMessage = stageMessages[stageMessages.length - 1];
        const newMessageArray = stageMessages.slice(
            0,
            stageMessages.length - 1
        );
        setStageMessages(newMessageArray);
        setDeletedMessage(finalMessage);
    };

    const redoMessage = () => {
        const newMessageArray = [...stageMessages, deletedMessage!];
        setStageMessages(newMessageArray);
        setDeletedMessage(undefined);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "70vh",
                }}
            >
                <StageDisplay StageMessages={stageMessages} />
                <StageSettings
                    StageMessages={stageMessages}
                    submitPrompt={submitMessage}
                    popMessage={undoMessage}
                    deletedMessage={deletedMessage}
                    redoMessage={redoMessage}
                />
            </div>
        </>
    );
}

export default Stage;
