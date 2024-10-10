import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{id,name,is_active}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "name": name,
        "is_actie": is_active
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/product-brands/edit/${id}`,
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
            success: false,
            error: error.message
        } 
    });
    
    return result;
});
 