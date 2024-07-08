import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";

enum PageMode {
  LOGIN,
  SIGNUP,
}

function LoginView() {
  const [userInput, setUserInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [helperPrompt, setHelperPrompt] = useState<string>("");

  const [pageMode, setPageMode] = useState<PageMode>(PageMode["LOGIN"]);

  const handleSignInWithGoogle = async () => {
    await doSignInWithGoogle();
  };

  const handleSignInWithEmail = () => {
    if (pageMode === 0) {
      doSignInWithEmailAndPassword(userInput, passwordInput)
        .then((result) => {
          if (result && !result.success) {
            setHelperPrompt(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // doCreateUserWithEmailAndPassword(userInput, passwordInput)
    // .then((result) => {
    //   if (result && !result.success) {
    //     setHelperPrompt(result.message);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    <div>
      {pageMode === 0 ? <h1>Log In</h1> : <h1>Sign Up</h1>}
      <input
        placeholder="Username"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
      <input
        placeholder="Password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      ></input>
      <button onClick={handleSignInWithEmail}>Login</button>
      <button onClick={handleSignInWithGoogle}>Login with Google</button>
      {helperPrompt ? <p>{helperPrompt}</p> : <></>}
    </div>
  );
}

export default LoginView;
