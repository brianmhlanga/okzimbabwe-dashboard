import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{delivery_option,stage}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "id": 1,
        "delivery_option": delivery_option,
        "stage": stage,
        "sequence": 1,
        "is_active": true
       
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/order-stages`,
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
 