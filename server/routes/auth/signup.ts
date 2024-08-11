import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{name,email,password,password_confirmation}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation
      });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/auth/signup`,
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
 