import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();
/*Debemos crearnos nuestro provider de google, es lo mismo para facebook u otro proveedor. Luego debemos definir 
nuestro config.js donde llamaremos todo loq necesitemos, como el auth, firestore etc. mediante esta funcion async
vamos a guardar en el result lo que devuelva de signInWithPoup que recibe el FirebaseAuth y el googleProvider, luego
creamos los credentials del proveedor y le pasamos el resultado*/
export const signInWithGoogle = async () =>{
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        //console.log({credentials});

        //aca en el result.user se encuentra el email, nombre y foto
        //const user  = result.user;
        const {displayName,email,photoURL,uid}  = result.user;
        return {
            ok: true,
            displayName,email,photoURL,uid
        }

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok:false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({email,password,displayName}) => {
    try {
        //el objeto createuserwhitemailandpasswotd de firebase es asincrono y recibe el FirebaseAuth, email, password
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid,photoURL}  = resp.user;
        //console.log(resp);

        await updateProfile(FirebaseAuth.currentUser,{
            displayName
        });

        return{
            ok:true,
            uid,photoURL,email,displayName
        }
    } catch (error) {
        //console.log(error);
        return {
            ok:false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({email,password}) =>{
    //signinwihtemailandpasswotd
    try {
        const {user} = await signInWithEmailAndPassword(FirebaseAuth,email,password)
        const {uid,displayName,photoURL}  = user;
        return{
            ok:true,
            uid,photoURL,email,displayName
        }
    } catch (error) {
        return {
            ok:false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() =>{
    return await FirebaseAuth.signOut();
}