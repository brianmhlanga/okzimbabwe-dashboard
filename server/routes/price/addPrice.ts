import axios from "axios";
import { SHOPIFY_URL } from "~~/services/global.variables";

export default defineEventHandler(async (event) => {
    const { data: { product_id, shop_brand_id, price,token } } = await readBody(event);
    
    const results = []; 

    for (let i = 0; i < shop_brand_id.length; i++) {
        const brandId = shop_brand_id[i];
        const priceValue = price[i];

        const data = JSON.stringify({
            "product_id": product_id,
            "shop_brand_id": brandId,
            "price": priceValue
        });

        const config = {
            method: 'POST',
            url: `${SHOPIFY_URL}/api/prices`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
            console.log(error);
            results.push({
                success: false,
                error: error.message
            });
        }
    }

    // Return all results
    return results;
});
