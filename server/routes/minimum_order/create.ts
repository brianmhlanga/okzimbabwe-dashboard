import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{amount}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "amount": amount
       
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/minimum-orders`,
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
        console.log('hie',error.response.data);
        
      
        return {    
            success: false,
            error: error.message
        } 
    });
    
    return result;
});
 