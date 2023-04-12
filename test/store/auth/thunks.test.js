import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

//debemos hacer un mock de toda la dependencia de firebase, porque en el thunks estamos utilizando varias
//funciones.
jest.mock('../../../src/firebase/providers');
describe('Pruebas en thunks', () => {
    
    const dispatch = jest.fn();
    
    beforeEach(() => jest.clearAllMocks())

    test('Debe de invocar el checkingCredentials ', async () => {
        //lo que queremos hacer es llamar el dispatch de la funcion checkingAuthentication con el valor de:
        //{type, payload}
        //el primer () es el llamado de la funcion y el segundo es la funcion de retorno osea ahi mandamos el dispatch
        await checkingAuthentication()(dispatch);

        //expect(dispatch).toHaveBeenCalledWith({"payload": undefined, "type": "auth/checkingCredentials"});
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    })

    test('Debe de llamar checking credentials y login-Exito startGoogleSignIn', async () => {
        const loginData = {ok:true,...demoUser}
        
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    })

    test('Debe de llamar checking credentials y logout-error startGoogleSignIn', async () => {
        const loginData = {ok:false,errorMessage: 'Un error en Google'};
        
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    })

    test('Debe de llamar checkingCredentials y login startLoginWithEmailPassword', async() => {
        const loginData = { ok: true, ...demoUser};

        const formData = {email:demoUser.email,password: '123456'};

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    })

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalledWith();

        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({}));  

    })
    
    
    
    
})
