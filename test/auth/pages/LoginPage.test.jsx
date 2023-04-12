import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";



//importate poner la palabra mock
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks',()=>({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email,password}) => {
      return () =>  mockStartLoginWithEmailAndPassword({email,password})
    } //aca nos aseguramos que esta funcion se llame y retorne el mock con los argumentos que le hemos pasado
}))

//en este caso no queremos hacer el mock de todo el paquete, sino queremos hacer solo el de useDispatch
//devuelve una funcion que recibe de parametro otra funcion que la estamos llamando
jest.mock('react-redux',()=>({
    ...jest.requireActual('react-redux'),
    useDispatch: ()=> (fn) => fn(),
}))

const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
     preloadedState:{
        auth: notAuthenticatedState
     }
});
//por defecto el estado de nuetra app esta en checking, para eso le pasamos el preloadedState, para que el auth
//tome el estado de no autenticado para que el boton este habilitado.

describe('Pruebas en el loginPage', () => {

    beforeEach(()=> jest.clearAllMocks());
    test('Debe de mostrar el componente correctamente', () => {
//va a dar un error porque el useSelector y el useDispatch en el arbol de componentes los valores. por eso ponemos
//todo en un provider
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
      
    })
    

    test('boton de google debe de llamr al startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

       // screen.debug()

       const googleBtn = screen.getByLabelText('google-btn');
        
       fireEvent.click(googleBtn);

       expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'luisegp10@hotmail.com';
        const password = '123456';  

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox',{name: 'Correo'});
       // console.log(emailField);

       fireEvent.change(emailField,{target: {name:'email',value:email}});
       
       const passwordField = screen.getByTestId('password');
       
       fireEvent.change(passwordField,{target: {name:'password',value:password}});
       
       const loginForm = screen.getByLabelText('submit-form');
       fireEvent.submit(loginForm);

       expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({
        email: email,
        password: password
       })

    })  
    
    
})
