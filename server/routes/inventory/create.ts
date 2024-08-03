import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{product_id,shop_id,quantity}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "product_id": product_id,
        "shop_id": shop_id,
        "quantity": quantity,
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/inventory`,
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
 