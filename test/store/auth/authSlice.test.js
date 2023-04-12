import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";


//hemos creado un fixture para tener el codigo mas limpio y tener los objetos a parte
describe('Pruebas en authSlice', () => {
    test('Debe de regresar el estado inicial y llamarse "auth"', () => {
        //si mandamos a la consola el authSlice, es un objeto que podemos evaluar
        expect(authSlice.name).toBe('auth');
        //reducer(initialState, action) es una accion en este caso por defecto mandamos {}
        const state = authSlice.reducer(initialState,{});
        //console.log(state);
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('Debe de realizar la autenticacion', () => {
       // console.log(login(demoUser));
        const state = authSlice.reducer(initialState,login(demoUser));
        //console.log(state);
        expect(state).toEqual({
            status: 'authenticated', //'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL:demoUser.photoURL,
            errorMessage: null
        });
    })

    test('Debe de realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState,logout());

        console.log(state);

        expect(state).toEqual({
            status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL:null,
            errorMessage: undefined
        })
    })

    test('Debe de realizar el logout y mostrar el mensaje de error', () => {
        
        const errorMessage = 'Credenciales no validas';
        const state = authSlice.reducer(notAuthenticatedState,logout({errorMessage}));

        console.log(state);

        expect(state).toEqual({
            status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL:null,
            errorMessage: errorMessage
        })
    
    })

    test('Debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState,checkingCredentials());
        expect(state.status).toBe('checking');
    })
    

})
