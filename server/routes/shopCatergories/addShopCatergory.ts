import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const { shop_brand_id,category_id,position} = await readBody(event);
    
    let data = JSON.stringify({
        shop_brand_id,
        category_id,
        position
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/shop-categories`,
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
 