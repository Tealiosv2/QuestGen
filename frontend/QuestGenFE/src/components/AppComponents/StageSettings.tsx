import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";
import NavBar from "./NavBar";
function StageSettings() {
    return (
        <>
            <div>
                <NavBar />
                <TextField
                    label="Enter prompt"
                    multiline
                    style={{ width: "500px", height: "500px" }}
                />
                <DefaultButton text="Submit" />
                <DefaultButton text="Undo" />
                <DefaultButton text="Redo" />
            </div>
        </>
    );
}

export default StageSettings;
