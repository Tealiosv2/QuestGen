import { doSignInWithGoogle } from "../../../firebase/auth";

function LoginView() {
    const handleOnClick = () => {
        doSignInWithGoogle();
    };

    return (
        <div>
            <button onClick={handleOnClick}>Login</button>
        </div>
    );
}

export default LoginView;
