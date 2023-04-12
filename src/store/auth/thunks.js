import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email,password) =>{
    return async (dispatch) =>{

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIn = () =>{
    return async (dispatch) =>{

        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

        console.log({result});

    }
}

export const startCreatingUserWithEmailPassword = ({email,password,displayName}) =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());

        // const resp = await registerUserWithEmailPassword({email,password,displayName});
        const {ok,uid,photoURL,errorMessage} = await registerUserWithEmailPassword({email,password,displayName});

        if(!ok) return dispatch(logout({errorMessage}))
         //console.log(resp);

         dispatch(login({uid,displayName,email,photoURL}));
    }
}

export const startLoginWithEmailPassword = ({email,password}) =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials());
        const {ok,uid,displayName,photoURL,errorMessage} = await loginWithEmailPassword({email,password});
        //console.log(ok,uid,displayName,photoURL,errorMessage);
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({ok,uid,displayName,email,photoURL}));
    }
}

export const startLogout = () =>{
    return async(dispatch) =>{
        await logoutFirebase();

        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }
}