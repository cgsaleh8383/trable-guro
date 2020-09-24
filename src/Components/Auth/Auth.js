import { FormGroup } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import "./Auth.css"
import Header from '../Header/Header'
import logoBlack from '../../image/Logo2.png'
import fb from '../../image/Icon/fb.png';
import google from '../../image/Icon/google.png';
import * as firebase from "firebase/app";
import { userContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Auth = () => {

    const [showArea, setShowArea, loggedIn, setLoggedIn, name, setName] = useContext(userContext);
    const [confirmationError, setConfirmationError] = useState(false);
    const [isSignedUp, setisSignedUp] = useState(false);
    const [submiter, setSubmiter] = useState("");
    const [user, setUser] = useState({});
    const location = useLocation().location?.pathname;
    const history = useHistory();
    const [verified, setVerified] = useState("null");
    const [verifyMessage, setVerifyMessage] = useState(false);


    const formHandler = (event) => {
        event.preventDefault()

        if (submiter === "signup") {
            user.password === user.confirmationPassword ?
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        setConfirmationError(false);
                        setUser({ ...user, signupError: "" });
                        setisSignedUp(true);
                        setVerifyMessage(true);
                        const currentUser = firebase.auth().currentUser;
                        currentUser.updateProfile({
                            displayName: `${user.fname} ${user.lname}`
                        })
                        currentUser.sendEmailVerification();

                    })
                    .catch(err => {
                        setUser({ ...user, signupError: err.message });
                    })
                : setConfirmationError(true);
        }

        if (submiter === "signin") {
            setVerifyMessage(false);
            setUser({ ...user, signinError: "" });
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const currentUser = firebase.auth().currentUser;
                    setName(currentUser.displayName);
                    if (currentUser.emailVerified) {
                        setLoggedIn(true);
                        history.replace(location || "/");
                    } else {
                        currentUser.sendEmailVerification();
                        setVerified("false");
                    }

                })
                .catch(err => {
                    setUser({ ...user, signinError: err.message });
                })

        }
    }

    const facebookSigninHandler = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const currentUser = firebase.auth().currentUser;
                setName(currentUser.displayName);
                setLoggedIn(true);
                history.replace(location || '/');
            })
            .catch(err => {
                setUser({ ...user, signinError: err.message });
            })
    }

    const googleSigninHandler = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const currentUser = firebase.auth().currentUser;
                setName(currentUser.displayName);
                setLoggedIn(true);
                history.replace(location || '/');
            })
            .catch(err => {
                setUser({ ...user, signinError: err.message });
            })
    }

    const loginToggleHandler = () => {
        setisSignedUp(true);
        setConfirmationError(false);
        setUser({ ...user, signupError: "" });
    }

    const signupToggleHandler = () => {
        setisSignedUp(false);
        setUser({ ...user, signinError: "" });
    }

    const sendVerification = (email) => {
        firebase.auth().sendPasswordResetEmail(email);
    }

    return (
        <div style={
            { position: 'absolute',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)),
                 url(${showArea.img})`,
                 width: "100%",
                height: "130vh",
                 backgroundSize: "cover"
            }
        }>
            
            <form onSubmit={formHandler}
                className="form-group auth-form-group">
                {
                    verifyMessage &&
                    <h5 style={{
                        textAlign: "center",
                        width: "200px",
                        margin: "auto",
                        padding: "7px",
                        borderRadius: "30px",
                        background: "#268b268c",
                        color: "white"
                    }}>
                        This Email Is Verified
                            </h5>
                }
                <FormGroup>
                    {
                        isSignedUp ? <h2 style={{ textAlign: "left" }}>Login</h2>
                            : <h2 style={{ textAlign: "left" }}>Create an account</h2>
                    }

                    {
                        !isSignedUp && <>
                            <input className='form_control' onBlur={(event) => setUser({ ...user, fname: event.target.value })}
                                type="text" placeholder="First name" required />
                            <input className='form_control' onBlur={(event) => setUser({ ...user, lname: event.target.value })}
                                type="text" placeholder="Last name" required />
                        </>
                    }
                    <input className='form_control' onBlur={(event) => setUser({ ...user, email: event.target.value })}
                        type="email" placeholder="Email address" required />

                    <input className='form_control' onBlur={(event) => setUser({ ...user, password: event.target.value })}
                        type="password" placeholder="Password" required />
                    {
                        !isSignedUp &&
                        <input className='form_control' onBlur={(event) => setUser({ ...user, confirmationPassword: event.target.value })}
                            type="password" placeholder="Confirm Password" required />
                    }

                    {
                        isSignedUp &&
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "500", paddingRight: '15px' }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input id="checkbox" type="Checkbox" />
                                <label htmlFor="checkbox" style={{ marginBottom: "6px" }}>
                                    Remember me
                                 </label>
                            </div>
                            <p onClick={() => user.email && sendVerification(user.email)} style={{ color: "orange", cursor: "pointer"}}><Link> Forget Password</Link></p>
                        </div>
                    }

                    {
                        user.signinError ?
                            <p style={{ color: "red", fontSize: "13px" }}>
                                {user.signinError}
                            </p>
                            : ""
                    }
                    {
                        verified &&
                        verified === "false" &&
                        <p style={{ color: "red", fontSize: "13px" }}>
                            Email is Not verified !
                            </p>

                    }
                    {
                        user.signupError ?
                            <p style={{ color: "red", fontSize: "13px" }}>
                                {user.signupError}
                            </p>
                            : ""
                    }

                    {
                        confirmationError ?
                            <p style={{ color: "red", fontSize: "13px" }}>
                                Doesn't match your password
                            </p>
                            : ""
                    }
                    {
                        isSignedUp ?
                            <input className="booking_submit"  name="signin" type="submit" value="Sign In"
                                style={{ cursor: "pointer" }}
                                onClick={(event) => setSubmiter(event.target.name)} />

                            : <input className="booking_submit"  name="signup" type="submit" value="Sign Up"
                                style={{ cursor: "pointer" }}
                                onClick={(event) => setSubmiter(event.target.name)} />
                    }
                </FormGroup>
                {
                    isSignedUp ?
                        <>
                            <span>Don't have an account? </span>
                            <span onClick={signupToggleHandler}
                                style={{ color: "orange", cursor: "pointer" }}>
                                Sign Up
                                </span>
                        </>

                        : <>
                            <span>Already have an account? </span>
                            <span onClick={loginToggleHandler}
                                style={{ color: "orange", cursor: "pointer" }}>
                                Login
                            </span>
                        </>
                }
            </form>
            <p className='up_bottom'>
                <span></span>
                Or
                
            </p>
            <div style={{ width: "300px", margin: " 10px auto", marginTop: '40px' }}>
               
                <div onClick={facebookSigninHandler}
                    style={{ cursor: "pointer" }}
                    className="auth-provider-section">
                    <img style={{ width: "30px", height: "30px", marginRight: "10px" }} src={fb} alt="" />
                    <h6>
                        Continue with Facebook
                    </h6>
                </div>
                <div onClick={googleSigninHandler}
                    style={{ cursor: "pointer" }}
                    className="auth-provider-section">
                    <img style={{ width: "30px", height: "30px", marginRight: "10px" }} src={google} alt="" />
                    <h6>
                        Continue with Google
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default Auth;