import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import StageView from "./StageView/StageView";
import LoginView from "./LoginView/LoginView";

function DefaultView() {
  const { userLoggedIn } = useContext(AuthContext);
  return userLoggedIn ? <StageView /> : <LoginView />;
}

export default DefaultView;
