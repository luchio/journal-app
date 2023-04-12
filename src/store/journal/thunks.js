import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () =>{
    return async(dispatch,getState) =>{
        //poner en true el isSaving
        dispatch(savingNewNote());

        // para grabar en firebase  vamos a necesitar el uid
        //el primer parametro es el dispatch para despachar una accion, 
        //el segundo es el getState para poder tener todo el store
        //console.log(dispatch,getState());

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        //apuntamos al documento, que recibe una collecion la cual recibe la config de FirebaseDB que hemos configurado
        //el segundo parametro es la ruta a insertar dentro de nuestra db
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`));
        //realizamos un await del path, y del objeto a insertar en ese path
        //con esto ya hemos insertado un dato en la bd
        await setDoc(newDoc,newNote);

        // el newDoc va a tener un atributo id, que pertence al id que genero firebase para el registro
       // console.log(newDoc);

        newNote.id= newDoc.id

        //aqui llamamos a los reducers del slice
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

        //debemos especificar las reglas para que solo autenticados puedan leer y modificar la bd
    }
}

export const startLoadingNotes = () =>{
    return async(dispatch,getState) => {
        const {uid} = getState().auth;

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSetActiveNote = ({title,body,id,date,imageUrls}) =>{
    return async(dispatch) =>{
        dispatch(setActiveNote({title,body,id,date,imageUrls}));
    }
}

export const startSaveNote = () =>{
    return async ( dispatch, getState) =>{

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        //eliminamos el id porque eso no existe en firebase, lo va a crear si no eliminamos
        const noteToFirestore = {...note};
        delete noteToFirestore.id;


        //la referencia al note
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        // el tercer parametro es de opciones, y lo ponemos en merge, para que mantengas los paramentros si no le pasamos algunos de ellos.
        await setDoc(docRef,noteToFirestore,{merge: true})

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files=[]) =>{
    return async(dispatch) =>{
        dispatch(setSaving());

        //NOTA: no hay que hacer un foreach y dentro un await async
        //await fileUpload(files[0])
        const fileUploadPromises = [];
        //en este paso solo estamos creando el arreglo de promesas, no estamos disparando la promesa.
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        //vamos a disparar las promesas simultaneamente
        const photosUrls = await Promise.all(fileUploadPromises);
        //console.log(photosUrls);

        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () =>{
    return async(dispatch, getState)=>{
        const {uid} = getState().auth;
        const {active:activeNote} = getState().journal;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${activeNote.id}`);
        //deleteDoc pide la referencia al documento, no devuelve nada
        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));

        //console.log({uid,activeNote});
    }
}