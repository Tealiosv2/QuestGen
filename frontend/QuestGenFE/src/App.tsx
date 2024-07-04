import DefaultView from "./components/AppComponents/DefaultView.tsx";
import Stage from "./components/AppComponents/Stage";
import AuthProvider from "./contexts/authContext/index.tsx";

const marginStyles = {
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "40px",
};

function App() {
    return (
        <>
            <div style={marginStyles}>
                <AuthProvider children={<DefaultView />} />
            </div>
        </>
    );
}

export default App;
