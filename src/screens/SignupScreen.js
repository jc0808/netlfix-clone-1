import { useRef, useState } from "react";
import "./SignupScreen.css";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const ConfirmPasswordRef = useRef(null);

    const [screen, setScreen] = useState(0);

    const register = (e) => {
        e.preventDefault();

        if (passwordRef.current.value === ConfirmPasswordRef.current.value) {
            createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
                .then(() => window.location.reload())
                // .then((authUser) => {
                //     console.log(authUser)
                // })
                .catch(error => alert(error.message));




        } else {
            alert("Passwords do not match.")
        }

        e.target["email"].value = null;
        e.target["password"].value = null;
        e.target["confirmP"].value = null;


    };

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
            // .then(authUser => console.log(authUser))
            .catch(error => alert(error.message));

        e.target["email"].value = null;
        e.target["password"].value = null;
        e.target["confirmP"].value = null;
    };


    const displayFormBox = (s) => {
        switch (s) {
            case 1:
                return (
                    <form onSubmit={register}>
                        <h1>Sign Up</h1>
                        <input ref={emailRef} placeholder="Email" type="email" id="email" />
                        <input ref={passwordRef} placeholder="Password" type="password" id="password" />
                        <input ref={ConfirmPasswordRef} placeholder="Confirm Password" type="password" id="confirmP" />
                        <button type="submit">Sign Up</button>

                        <h4><span className="signupScreen__gray">Already have an Account? </span>
                            <span className="signupScreen__link" onClick={() => setScreen(0)}> Sign In</span></h4>
                    </form>
                )
            default:
                return (
                    <form onSubmit={signIn}>
                        <h1>Sign In</h1>
                        <input ref={emailRef} placeholder="Email" type="email" id="email" />
                        <input ref={passwordRef} placeholder="Password" type="password" id="password" />
                        <button type="submit">Sign In</button>

                        <h4><span className="signupScreen__gray">New to Netflix? </span>
                            <span className="signupScreen__link" onClick={() => setScreen(1)}> Sign Up Now</span></h4>
                    </form>
                )
        }
    }
    return (
        <div className="signupScreen">
            {displayFormBox(screen)}
        </div>
    )
};

export default SignupScreen;