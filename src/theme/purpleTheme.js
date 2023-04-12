import { createTheme } from "@mui/material";
import { red, } from "@mui/material/colors";

//podemos exportar temas, mediante createTheme que vamos a extender y sobreescribimos lo que queremos usar
export const purpleTheme = createTheme({
    palette:{
        primary:{
            main: '#262254'
        },
        secondary:{
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
});