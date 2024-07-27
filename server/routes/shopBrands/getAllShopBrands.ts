import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const { name,logo} = await readBody(event);
    
    var config = {
        method: 'GET',
        url: `${SHOPIFY_URL}/api/shop-brands`,
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
        console.log(error);
        
      
        return {    
            success: false
        } 
    });
    
    return result;
});
 