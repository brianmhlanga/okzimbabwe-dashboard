import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{ref}} = await readBody(event);
    
    
    
    var config = {
        method: 'GET',
        url: `${SHOPIFY_URL}/picking-list/${ref}`,
        headers: {
            'Content-Type': 'application/json',
            
        },
        
    };
      
    const result = await axios(config)
    .then(function (response) {
        const result = response.data;
        

        return {
            success: true,
            data: result
            
        };
    }) .catch(async (error)=>{
        console.log('hie',error.response.data);
        
      
        return {    
            success: false,
            error: error.message
        } 
    });
    
    return result;
});
 