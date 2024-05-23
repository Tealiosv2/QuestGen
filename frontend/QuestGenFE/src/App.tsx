import Stage from "./components/AppComponents/Stage";

const marginStyles = {
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "40px",
};

function App() {
    return (
        <>
            <div style={marginStyles}>
                <Stage />
            </div>
        </>
    );
}

export default App;
