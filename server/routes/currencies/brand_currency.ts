import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{shop_id,currency_id,conversion_rate,token}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "shop_brand_id": shop_id,
        "currency_id": currency_id,
        "conversion_rate": parseFloat(conversion_rate),
        
        
    });
    console.log('data',data)
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/shop-currencies`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            
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
        console.error('Error:', error.response ? error.response.data : error.message);
        
      
        return {    
            success: false,
            error:  error.response.data
        } 
    });
    
    return result;
});
 