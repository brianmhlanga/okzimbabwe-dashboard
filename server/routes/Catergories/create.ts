import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{name,is_parent,is_sub_parent,is_active,token,parent_category_id}} = await readBody(event);
    
    let data = JSON.stringify({
        "name": name,
        "is_parent":is_parent,
        "is_sub_parent": is_sub_parent,
        "is_active": is_active,
        "parent_category_id": parent_category_id
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/categories`,
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
        console.log(error);
        
      
        return {    
            success: false,
            error: error.message
        } 
    });
    
    return result;
});
 