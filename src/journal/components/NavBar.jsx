import  LogoutOutlined  from '@mui/icons-material/LoginOutlined'
import  MenuOutlined  from '@mui/icons-material/MenuOutlined'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'

export const NavBar = ({drawerWidth}) => {

    const dispatch = useDispatch();
    
    const onLogout = () =>{
        dispatch(startLogout());
    }

  return (
    <AppBar position='fixed' sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm:`${drawerWidth}px`}
    }}>
        <Toolbar>
            <IconButton color="inherit" edge="start" sx={{mr:2,display:{sm:'none'}}}>
                <MenuOutlined/>
            </IconButton>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant="h6" noWrap component='div'>Journal App</Typography>
                <IconButton sx={{color:'white'}} onClick={onLogout}>
                    <LogoutOutlined />
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
