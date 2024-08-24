import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{shop_brand_id}} = await readBody(event);
    
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/shop-currencies/default/${shop_brand_id}`,
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
        console.error('Error:', error.response ? error.response.data : error.message);
        
      
        return {    
            success: false,
            error:  error.response.data
        } 
    });
    
    return result;
});
 