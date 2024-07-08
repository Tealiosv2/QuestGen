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
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Sign In</h1>
        <div>
          <input
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: "100%", padding: 0 }}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ width: "100%", padding: 0 }}
          ></input>
        </div>

        <div style={{ display: "flex" }}>
          <button onClick={handleSignInWithEmail} style={{ width: "50%" }}>
            Sign In
          </button>
          <button
            onClick={handleCreateAccountWithEmail}
            style={{ width: "50%" }}
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
  );
}

export default LoginView;
