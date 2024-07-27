import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {id} = await readBody(event);

      
    
   
    var config = {
        method: 'GET',
        url: `${SHOPIFY_URL}/api/shop-brands/${id}`,
        
        headers: {
            'Content-Type': 'application/json',
            
        },
       
       
    
    };
    console.log('Making GET request to URL',config.url);
        
    const result = await axios(config)
    .then(function (response) {
        const result = response.data;

        return {
            success: true,
            data: result
            
        };
    }) .catch(async (error)=>{
        console.log(error);
        
      
        return {    
            success: false
        } 
    });
    
    return result;
});
 