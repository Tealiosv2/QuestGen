import DefaultView from "./components/AppComponents/DefaultView.tsx";
import Stage from "./components/AppComponents/Stage";
import AuthProvider from "./contexts/authContext/index.tsx";

const wrapperStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
} as React.CSSProperties;

const marginStyles = {
  marginLeft: "100px",
  marginRight: "100px",

  height: "100%",
} as React.CSSProperties;

const headerStyles = {
  height: "10vh",
} as React.CSSProperties;

const footerStyles = {
  height: "10vh",
} as React.CSSProperties;

function App() {
  return (
    <div style={wrapperStyles} className="font-sans">
      <div style={headerStyles}>Header</div>
      <div style={marginStyles}>
        <AuthProvider children={<DefaultView />} />
      </div>
      <div style={footerStyles}>Footer</div>
    </div>
  );
}

export default App;
