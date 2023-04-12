import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';


const drawerWidth = 280;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}} className='animate_animated animate_fadeIn animate_faster'>
        {/* NavBar */}
        <NavBar drawerWidth={drawerWidth}/>

        {/* SideBar */}
        <SideBar drawerWidth={drawerWidth}/>

        <Box component='main' sx={{flexGrow:1, p: 3}}>
           <Toolbar/>
            {children}
        </Box>
    </Box>
  )
}
