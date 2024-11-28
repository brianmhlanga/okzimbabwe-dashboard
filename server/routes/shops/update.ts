import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{id,shop_brand_id,name,address,city,store_code,contact_person,contact_number,contact_email,token}} = await readBody(event);
    
    
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
    console.log('data',data)
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/shops/edit/${id}`,
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
        console.log('my error',error.message);
        
      
        return {    
            success: false,
            error: error.message
        } 
    });
    
    return result;
});
 