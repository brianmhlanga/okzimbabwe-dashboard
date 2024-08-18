import axios from "axios";
import { SHOPIFY_URL } from "~~/services/global.variables";

export default defineEventHandler(async (event) => {
    const { data: { referenced_id, product_id, is_shop_brand } } = await readBody(event);
    
    // To store all results
    const results = [];

    for (let i = 0; i < product_id.length; i++) {
        let data = JSON.stringify({
            "referenced_id": referenced_id,
            "product_id": product_id[i],
            "is_shop_brand": is_shop_brand
        });

        var config = {
            method: 'POST',
            url: `${SHOPIFY_URL}/api/featured-products`,
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
