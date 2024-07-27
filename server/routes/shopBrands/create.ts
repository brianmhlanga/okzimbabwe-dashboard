import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const { name,logo} = await readBody(event);
    
    
    const body = new FormData();
    
    body.append('logo', logo);
    body.append('name',name)
   
   
    axios.post(`${SHOPIFY_URL}/api/shop-brands`, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('File uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });   
    
});
 