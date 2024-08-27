import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";
import discount_type from "./discount_type";

export default defineEventHandler(async (event)=>{
    const {data:{name,code,influencer_id,discount_type_id,product_id,shop_id,category_id,product_brand_id,value,starts_at,expires_at}} = await readBody(event);
    
    let data = JSON.stringify({
        "name": name,
        "code": code,
        "influencer_id": influencer_id,
        "discount_type_id": discount_type_id,
        "product_id": product_id,
        "shop_brand_id": shop_id,
        "category_id": category_id,
        "product_brand_id": product_brand_id,
        "value": value,
        "starts_at": starts_at,
        "expires_at": expires_at
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/discounts`,
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
        console.log("error",error.response.data);
        return {    
            success: false,
            error: error.message
        } 
    });
    
    return result;
});
 