import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

//estamos utilizando cloudinary, hemos instalado para poder eliminar las imagenes que subimos al hacer las pruebas
//estas credenciales son de nuestro dashboard en cloudinary
cloudinary.config({
    cloud_name: 'dgsjl7vcp',
    api_key: '768261413646422',
    api_secret: 'asRG1bGm_H47BfHFnUEtN9kWp2g',
    secure: true,
}); 

describe('Pruebas en fileUpload', () => {
    test('Debe de subir el archivo correctamente al cloudinary', async() => {
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSqJlcyEYKihXEhP_z0mC1hZ75SctwoELpg&usqp=CAU';

        const resp = await fetch(imageUrl);
       
        const blob = await resp.blob();
        
        const file = new File([blob],'foto.jpg');
        
        const url = await fileUpload(file);
       

        expect(typeof url).toBe('string');

        //aqui encontramos el id para eliminar la imagen
        //console.log(url);
        const segments = url.split('/');

        const imageId = segments[segments.length -1].replace('.jpg','');
        await cloudinary.api.delete_resources(['journal/'+imageId],{
            resource_type: 'image'
        });
        

    });

    test('debe de retornar null', async() => {
      
        const file = new File([],'foto.jpg');
        
        const url = await fileUpload(file);
    })
    
    
})
