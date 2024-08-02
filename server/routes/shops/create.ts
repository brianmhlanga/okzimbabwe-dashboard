import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{shop_brand_id,name,address,city,store_code,contact_person,contact_number,contact_email}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "shop_brand_id": shop_brand_id,
        "name": name,
        "address":address,
        "city": city,
        "store_code": store_code,
        "contact_person": contact_person,
        "contact_number": contact_number,
        "contact_email": contact_email
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/shops`,
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
 