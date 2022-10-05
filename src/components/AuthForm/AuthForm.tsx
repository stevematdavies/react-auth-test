import {FormEvent, useRef, useState} from "react";
import classes from "./AuthForm.module.css";
import {SIGNUP_URL} from "../../app.config";


const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const switchAuthModeHandler = () => {
        setIsLogin(previousIsLoggedIn => !previousIsLoggedIn)
    }

    const onRequestSuccess = (data: any) => {
        console.log(data)
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        if (isLogin) {
            console.log("...logging in")
        } else {
            console.log("...submitting")
            fetch(SIGNUP_URL, {
                method: "post",
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({
                    email: emailInputRef.current?.value,
                    password: passwordInputRef.current?.value,
                    returnSecureToken: true,
                    mode: "no-cors"
                })
            }).then(res => {
                setIsLoading(false);
                if (res.ok) {
                    res.json().then(d => {
                        onRequestSuccess(d)
                    })
                } else {
                    return res.json().then(d => {
                        const errorMessage = (d && d.error && d.error.message)
                            ? d.error.message
                            : "Authentication failed"
                        alert(errorMessage);
                    })
                }
            }).catch(e => {
                console.log(e)
            })
        }

    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={onSubmit}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' ref={emailInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input ref={passwordInputRef} type='password' id='password' required/>
                </div>
                <div className={classes.actions}>
                    {!isLoading
                        ?  <button>{isLogin ? 'Login' : 'Create Account'}</button>
                        :   <p>Sending request...</p>
                    }
                    <button
                        type='submit'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;