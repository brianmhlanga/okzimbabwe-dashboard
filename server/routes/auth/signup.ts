import axios from "axios";
import Role from "~/pages/role.vue";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{name,email,shop_brand_id,role_id, shop_id,password,password_confirmation}} = await readBody(event);
    
    
    let data = JSON.stringify({
         "name": name,
         "email": email,
         "shop_brand_id": shop_brand_id,
         "shop_id": shop_id,
         "role_id": role_id,
         "password": password,
        "password_confirmation": password_confirmation
      });
      console.log('sign',data)
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/users`,
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
            error: error.errors
        } 
    });
    
    return result;
});
 