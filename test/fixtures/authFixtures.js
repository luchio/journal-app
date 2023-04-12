export const initialState ={
    status: 'checking', //'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL:null,
    errorMessage: null
}

export const authenticatedState ={
    status: 'authenticated', //'checking', 'not-authenticated', 'authenticated'
    uid: '1234abc',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoURL:'https://demo.jpg',
    errorMessage: null
}

export const notAuthenticatedState ={
    status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL:null,
    errorMessage: null
}

export const demoUser = {
    uid: 'abc123',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoURL: 'https://foto.jpg'
}

