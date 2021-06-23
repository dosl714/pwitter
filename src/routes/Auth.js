import { authService, firebaseInstance } from "fbase";
import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter,
    faGoogle,
    faGithub,} from "@fortawesome/free-brands-svg-icons";

const Auth =  () => {
    const onSocialClick = async (event) => {
        const { target : {name},
    } = event; //es6 . 들어보기.
    let provider;
    if(name === "google"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if(name === "github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
    }

    return (
    <div className="authContainer">
        <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
        <AuthForm />
        <div className="authBtns">
            <button onClick ={onSocialClick} name ="google" className="authBtns">Continue With Google <FontAwesomeIcon icon={faGoogle} /></button>
            <button onClick ={onSocialClick} name ="github" className="authBtn">Continue With Github <FontAwesomeIcon icon={faGithub} /></button>   
        </div>
    </div>
        )
}

export default Auth; //이 형식이 자동으로 import됨.