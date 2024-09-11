import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";

export default defineEventHandler(async (event)=>{
    const {data:{name}} = await readBody(event);
    
    
    let data = JSON.stringify({
        "name": name
       
        
        
    });
    var config = {
        method: 'POST',
        url: `${SHOPIFY_URL}/api/roles`,
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
            error: error.response.data
        } 
    });
    
    return result;
});
 