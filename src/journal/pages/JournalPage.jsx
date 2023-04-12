//import  MailOutline  from '@mui/icons-material/MailOutline'
import  AddOutlined  from '@mui/icons-material/AddOutlined'
import  IconButton from '@mui/material/IconButton'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savingNewNote } from '../../store/journal/journalSlice'
import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'

export const JournalPage = () => {
  /* el typography recibe muchos componentes pero si queremos aumentar de tamanio usamos variant,
  tambien podemos usar component para especificar al html que es un elemento de tipo */

  const dispatch = useDispatch();
  const {isSaving,active} = useSelector(state =>state.journal);
  
  const onClickNewNote = () =>{
    dispatch(startNewNote());
      
  }

  return (
    <JournalLayout>
     
      {(!!active)
      ?(<NoteView/>)
      : (<NothingSelectedView/>)
      }
      

      <IconButton size='large' onClick={onClickNewNote} disabled={isSaving} sx={{
        color:'white',
        backgroundColor:'error.main',
        ':hover':{backgroundColor:'error.main',opacity:0.9},
        position:'fixed',
        right:50,
        bottom:50}}>
          <AddOutlined sx={{fontSize:30}}/>
      </IconButton>

      {/* <MailOutline/> */}
    </JournalLayout>
  )
}
