import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async(uid='') =>{
    if(!uid) throw new Error('El uid del usuario no existe');

    //cuidado porque hay que ver de no traer colecciones y poner doc, o viceversa
    //aqui apuntamos a esa coleccion, y podemos traer los documentos 
     const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
     const docs = await getDocs(collectionRef);
     //docs solo es la referencia
     //console.log(docs);

     const notes = [];
     // el id lo tenemos en doc.id, y la data restante en getdata(), mediante spread operator vamos a poner todos los atributos

     docs.forEach(doc =>{
        //console.log(doc.data());
        notes.push({id: doc.id,...doc.data()})
     });

     //console.log(notes);
     return notes;
}