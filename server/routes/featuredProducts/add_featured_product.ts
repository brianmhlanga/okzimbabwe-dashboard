import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{referenced_id,product_id,is_shop_brand}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "referenced_id": referenced_id,
        "product_id": product_id,
        "is_shop_brand": is_shop_brand
      });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/featured-products`,
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
 