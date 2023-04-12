import { CssBaseline} from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { purpleTheme } from './purpleTheme'

export const AppTheme = ({children}) => {
    /* El theme provider esta proveendo algun tema (Material UI)*/
    
    /* CssBaseline nos da un punto de entrada para que en todos los navegadores renderice lo mismo */

    //nos hemos creado un theme donde sobreescribimos los colores que vamos a querer utiizar, le pasamos 
    //al themeProvider el theme creado
  return (
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
    
  )
}
