import { useEffect, useState } from "react";
import StageDisplay from "./StageDisplay";
import StageSettings from "./StageSettings";

// Each message point that appears on the stage display
export type StageMessage = {
    content: string;
};

function Stage() {
    const [StageMessages, setStageMessages] = useState<Array<StageMessage>>([]);

    useEffect(() => {
        console.log(StageMessages);
    }, [StageMessages]);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "70vh",
                }}
            >
                <StageDisplay StageMessages={StageMessages} />
                <StageSettings
                    StageMessages={StageMessages}
                    setStageMessages={setStageMessages}
                />
            </div>
        </>
    );
}

export default Stage;
