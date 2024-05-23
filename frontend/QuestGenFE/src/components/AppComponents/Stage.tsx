import NavBar from "./NavBar";
import StageDisplay from "./StageDisplay";
import StageSettings from "./StageSettings";

function Stage() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "70vh",
                }}
            >
                <StageDisplay />
                <StageSettings />
            </div>
        </>
    );
}

export default Stage;
