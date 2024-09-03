import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{name}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "name": name
       
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/order-statuses`,
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
 