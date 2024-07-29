import axios from "axios";
import { SHOPIFY_URL } from "~~/services/global.variables";

// Define the handler for the GET request
export default defineEventHandler(async (event) => {
  // Extract query parameters from the event
  const query= useQuery(event);
  const page = query.page ? parseInt(query.page as string) : 1;
  const per_page = query.per_page ? parseInt(query.per_page as string) : 10;
  const offset = (page - 1) * per_page;

  try {
    // Send a GET request to fetch categories with pagination
    const response = await axios.get(`${SHOPIFY_URL}/api/categories`, {
      params: {
        is_parent: true,
        _limit: per_page,
        _start: offset
      }
    });

    // Filter categories where is_parent is true
    const filteredCategories = response.data.filter((category: any) => category.is_parent);

    // Return the filtered categories
    return {
      success: true,
      data: filteredCategories
    };
  } catch (error) {
    console.log(error);

    // Handle errors and return a failure response
    return {
      success: false,
      message: error.message
    };
  }
});
