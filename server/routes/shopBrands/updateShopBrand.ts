import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const { name,logo,id} = await readBody(event);
    
    let data = JSON.stringify({
        "name" : name,
        "logo" : logo
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/shop-brands/edit/${id}`,
        headers: {
            'Content-Type': 'application/json',
            
        },
        data: data
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
 