import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";

function LoginView() {
  const [emailInput, setUserInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [helperPrompt, setHelperPrompt] = useState<string>("");

  /** Custom params for valid passwords */
  const passwordIsValid = (password: string) => {
    if (password && password.length > 8) {
      return true;
    }
    return false;
  };

  /** Custom params for valid usernames */
  const emailIsValid = (username: string) => {
    if (username) {
      return true;
    }
    return false;
  };

  const handleSignInWithGoogle = async () => {
    await doSignInWithGoogle();
  };

  const handleSignInWithEmail = () => {
    doSignInWithEmailAndPassword(emailInput, passwordInput)
      .then((result) => {
        if (result && !result.success) {
          setHelperPrompt(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateAccountWithEmail = () => {
    if (passwordIsValid(passwordInput) && emailIsValid(emailInput)) {
      doCreateUserWithEmailAndPassword(emailInput, passwordInput)
        .then((result) => {
          if (result && !result.success) {
            setHelperPrompt(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setHelperPrompt("Email or password is not valid");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <div className="border p-5">
          <h1 className="text-xl font-display font-bold">Sign In</h1>
          <div>
            <input
              placeholder="Email"
              value={emailInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            ></input>
          </div>

          <div style={{ display: "flex" }}>
            <button
              onClick={handleSignInWithEmail}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
            >
              Sign In
            </button>
            <button
              onClick={handleCreateAccountWithEmail}
              className="text-white bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            >
              Create Account
            </button>
          </div>
          <button onClick={handleSignInWithGoogle} style={{ width: "100%" }}>
            Sign In with Google
          </button>
          {helperPrompt ? <p>{helperPrompt}</p> : <></>}
        </div>
      </div>
    </div>
  );
}

export default LoginView;
