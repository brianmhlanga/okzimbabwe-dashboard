import axios from "axios";
import { SHOPIFY_URL } from "~~/services/global.variables";

export default defineEventHandler(async (event) => {
    const { data: { product_id, shop_id, quantity } } = await readBody(event);
    
    // To store all results
    const results = [];

    for (let i = 0; i < shop_id.length; i++) {
        const brandId = shop_id[i];
        let data = JSON.stringify({
            "product_id": product_id,
            "shop_id": brandId,
            "quantity": quantity,
        });

        var config = {
            method: 'POST',
            url: `${SHOPIFY_URL}/api/inventory`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        
        try {
            const response = await axios(config);
            results.push({
                success: true,
                data: response.data
            });
        } catch (error) {
            results.push({
                success: false,
                error: error.message
            });
        }
    }

    return results;
});
