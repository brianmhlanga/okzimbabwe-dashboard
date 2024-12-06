import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{name,iso_code,symbol,token}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "name": name,
        "iso_code": iso_code,
        "symbol": symbol,
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/currencies`,
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
 