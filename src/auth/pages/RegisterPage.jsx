import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'


const formData  = {
  email: '',
  password: '',
  displayName:''
}

const formValidations = {
  email: [(value) => value.includes('@'),'El correo debe de tener una @'],
  password: [(value) => value.length >=6,'El password debe de tener mas de 6 letras'],
  displayName: [(value) => value.length >=1,'El nombre es obligatorio'],

}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status,errorMessage} = useSelector(state=>state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();

  const {displayName,email,password,onInputChange,formState,
        inFormValid, displayNameValid,emailValid,passwordValid} = useForm(formData,formValidations);

  //console.log(displayNameValid);
  
  const onSubmit = (e) =>{
    e.preventDefault();
    setFormSubmitted(true);

    if(!inFormValid) return;
    
    dispatch(startCreatingUserWithEmailPassword(formState));
    //console.log(formState);
  }


  return (
   <AuthLayout title='Register'>
          <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
                <Grid item xs={12} sx={{mt: 2}}>
                    <TextField label="Nombre Completo" type="text" placeholder='Nombre' name='displayName'
                    value={displayName} onChange={onInputChange} error={!!displayNameValid && formSubmitted} helperText={displayNameValid}
                    fullWidth autoComplete='current-name'/>
                </Grid>
                <Grid item xs={12} sx={{mt: 2}}>
                    <TextField label="Correo" type="email" placeholder='correo@gmail.com' name='email'
                    value={email} onChange={onInputChange} error={!!emailValid && formSubmitted} helperText={emailValid}
                    fullWidth autoComplete='current-email'/>
                </Grid>
                <Grid item xs={12} sx={{mt: 2}}>
                    <TextField label="Contraseña" type="password" placeholder='Password' name='password'
                    value={password} onChange={onInputChange} error={!!passwordValid && formSubmitted} helperText={passwordValid}
                    fullWidth autoComplete='current-password'/>
                </Grid>
                <Grid container spacing={2} sx={{mb:2, mt:1}}>
                    <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                       <Alert severity='error'>
                            {errorMessage}
                       </Alert>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' fullWidth disabled={isCheckingAuthentication}>
                            <Typography>Crear Cuenta</Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' justifyContent="end">
                  <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
                  <Link component={RouterLink} color='inherit' to="/auth/login">
                      Ingresar
                  </Link> 
                </Grid>
            </Grid>
          </form>
   </AuthLayout>
          
  )
}
