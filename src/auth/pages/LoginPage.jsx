import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  /* el grid es un div pero con ciertas propiedades */
  /* el sx, es un style extender, podemos definir css, y tambien podemos acceder el theme
  que es en realidad el purple, que le pasamos al provider = primary.main */

  /*Link es un estilo de mui, pero hay conflicto con reactrouter, entonces llamamos con un alias
  y mediante component en el Link de mui le pasamos el Link de reactRouterDom */


  const {email,password,onInputChange} = useForm(formData);

  const dispatch = useDispatch();
  
  const {status,errorMessage} = useSelector(state => state.auth);
  
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (e) =>{
    e.preventDefault();
    //console.log({email,password});
    dispatch(startLoginWithEmailPassword({email,password}));
  }

  const onGoogleSignIn = () =>{
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }


  return (
   <AuthLayout title='Login'>
          <form 
          aria-label='submit-form'
          onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
                <Grid item xs={12} sx={{mt: 2}}>
                    <TextField label="Correo" type="email" 
                    placeholder='correo@gmail.com' name='email' onChange={onInputChange} value={email}
                    fullWidth autoComplete='current-email'/>
                </Grid>
                <Grid item xs={12} sx={{mt: 2}}>
                    <TextField label="Contraseña" type="password" 
                    inputProps ={{
                      'data-testid': 'password'
                    }}
                    placeholder='Password' name='password' onChange={onInputChange} value={password}
                    fullWidth autoComplete='current-password'/>
                </Grid>

                

                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    
                    <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>
                            {errorMessage}
                       </Alert>  
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button 
                        variant='contained' 
                        fullWidth type='submit' 
                        onClick={() => {}}
                        disabled = {isAuthenticating}> 
                          <Typography>Login</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                        aria-label="google-btn"
                        variant='contained' 
                        fullWidth onClick={onGoogleSignIn}
                        disabled = {isAuthenticating}>         
                         <Typography> Google</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent="end">
                  <Link component={RouterLink} color='inherit' to="/auth/register">
                      Crear una cuenta
                  </Link> 
                </Grid>
            </Grid>
          </form>
   </AuthLayout>
          
  )
}
