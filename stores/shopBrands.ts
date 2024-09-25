import { defineStore } from "pinia";
import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";
import type getAllProducts from "~/server/routes/Products/getAllProducts";
import type signup from "~/server/routes/auth/signup";
import type discount_type from "~/server/routes/discounts/discount_type";
import type shop_default_currency from "~/server/routes/currencies/shop_default_currency";



export const useShopBrandsStore = defineStore('shopBrands', {
    state: () => ({
        name: "",
        full_name: "",
        logo: "",
        allCategories: [] as any[],
        product_brands: [] as any[],
        products: [] as any[],
        parentCategories: [] as any[],
        date: new Date(),
        shopBrands: [],
        posting_date: "",
        
        invoiceList: [],    
    }),
    actions: {
        async createShopBrand(info:any) {
            console.log("zzzzzzzzzzzzzzzzzzzzzzz", info);
          
            // Prepare the FormData object
            const formData = new FormData();
            formData.append('name', info.name); // Assuming `info.name` contains the shop brand name
            formData.append('logo', info.logo); // Assuming `info.logo` is the File object
            
            // Define the configuration for the axios request
            const config = {
              method: 'post',
              url: '/shopBrands/create',
              headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Type': 'multipart/form-data',
              },
              data: JSON.stringify(formData),
            };
          
            // Make the axios request
            const result = await axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                return {
                  data: response.data,
                  success: true,
                };
              })
              .catch(function (error) {
                console.log(error);
                return {
                  success: false,
                };
              });
          
            return result;
          },
        async getAllShopBrands() {
             const token = useCookie('token').value || ""
             var config = {
                method: 'post',
                url: '/shopBrands/getAllShopBrands',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                   
                },
               
            }; 
            const result = await axios(config).then(function (response) { 
                console.log(JSON.stringify(response.data));
                return {
                    data: response.data,
                    success: true
                }
            }).catch(function (error) {
                console.log(error);
                return {
                    success: false
                }
            });
   
            return result;
        },
       
        
        async updateShopBrand() {
            
            const data = {
            
                name: this.name,
                logo: this.logo,
                
            },
             config = {
                method: 'post',
                url: '/shopBrands/updateShopBrands',
                data: data,
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
               
            }; 
    
            const result = await axios(config).then(function (response) {
                console.log(JSON.stringify(response.data));
                return {
                    data: response.data,
                    success: true
                }
            }).catch(function (error) {
                console.log(error);
                return {
                    success: false
                }
            });
   
            return result;
        },
        async removeShopBrand() {
            const data = {
                id: this.id,    
            },
             config = {
                method: 'post',
                url: '/shopBrands/deleteShopBrand',
                data: data,
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
               
            }; 
    
            const result = await axios(config).then(function (response) {
                console.log(JSON.stringify(response.data));
                return {
                    data: response.data,
                    success: true
                }
            }).catch(function (error) {
                console.log(error);
                return {
                    success: false
                }
            });
   
            return result;
        },
        async createCategory (info:any){
            var data = JSON.stringify({
                "data": info,
            });
             const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/Catergories/create',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async updateCategory (info:any){
            var data = JSON.stringify({
                "data": info,
            });
             const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/Catergories/update',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async createShop (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/shops/create',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async createProductBrand (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/brands/create',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async createUserRole (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/roles/create',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async create_order_stage (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/order_stages/create',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async create_order_status (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/order_status/create',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async update_order_status (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/order_status/update',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async updateStatus (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/invoice/update',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async createInventory (info:any){
            var data = JSON.stringify({
                "data": info,
            });
             const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/inventory/create',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async signup (info:any){
            var data = JSON.stringify({
                "data": info,
            });
               const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/auth/signup',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async login (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/auth/login',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            
            console.log('simba',this.full_name)
            console.log('mybddnd',result)
            return result;

        },
        async addFeaturedProducts (info:any){
            var data = JSON.stringify({
                "data": info,
            });
          const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/featuredProducts/add_featured_product',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async createPrice (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/price/addPrice',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async addCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/currencies/add_currency',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async shop_default_currency(info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/currencies/shop_default_currency',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async addDiscount(info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/discounts/add_discount',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async discount_type (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/discounts/discount_type',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async brandCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/currencies/brand_currency',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async defaultCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/currencies/default_currency',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async updateCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/currencies/update',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async updateShop (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/shops/update',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async updateDiscount (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/discounts/update_discount',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/currencies/delete',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteShop (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/shops/delete',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteDiscount (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/discounts/delete_discount',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteShopBrand (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/shopBrands/delete',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteCategory (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/Catergories/delete',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async downloadInvoice (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/invoice/download',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async downloadPickingSlip (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/invoice/download_picking_slip',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async delete_order_status (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/order_status/delete',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteAdvert (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/advert/delete',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteProduct (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/Products/delete',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        async deleteOrder (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            const token = useCookie('token').value || ""
            var config = {
                method: 'post',
                url: '/invoice/delete',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                return {
                    data: response.data,
                    success: true
                 }
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            return result;

        },
        
        async getAllCategories() {
            let url = new URL(`${SHOPIFY_URL}/api/categories`)
            const params:any = {
                per_page: "10",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
            const token = useCookie('token').value || ""
            var config:any = {
               method: 'GET',
               url: url,
               headers: { 
                 "Authorization": `Bearer ${token}`,
                   'Accept': '/',
                   'Cache-Control': 'no-cache',
                  
               },
              
           }; 
           const result = await axios(config).then(function (response) { 
               console.log(JSON.stringify(response.data));
               return {
                   data: response.data,
                   success: true
               }
           }).catch(function (error) {
               console.log(error);
               return {
                   success: false
               }
           });
  
           return result;
       },
       async getFeaturedMenus(id:any) {
        let url = new URL(`${SHOPIFY_URL}/api/featured-menus/${id}`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
             "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
       async getAllDiscounts() {
        let url = new URL(`${SHOPIFY_URL}/api/discounts`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
             "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
   async getAllRoles() {
    let url = new URL(`${SHOPIFY_URL}/api/roles`)
    const params:any = {
        per_page: "10",
    };
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
    const token = useCookie('token').value || ""
    var config:any = {
       method: 'GET',
       url: url,
       headers: { 
         "Authorization": `Bearer ${token}`,
           'Accept': '/',
           'Cache-Control': 'no-cache',
          
       },
      
   }; 
   const result = await axios(config).then(function (response) { 
       console.log(JSON.stringify(response.data));
       return {
           data: response.data,
           success: true
       }
   }).catch(function (error) {
       console.log(error);
       return {
           success: false
       }
   });

   return result;
},
       async get_all_discount_types() {
        let url = new URL(`${SHOPIFY_URL}/api/discount-types`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
             "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
   async get_shop_currencies(id:any) {
    let url = new URL(`${SHOPIFY_URL}/api/shop-currencies`)
    const params:any = {
        shop_brand_id: id,
        per_page: "10",
    };
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
    const token = useCookie('token').value || ""
    var config:any = {
       method: 'GET',
       url: url,
       headers: { 
         "Authorization": `Bearer ${token}`,
           'Accept': '/',
           'Cache-Control': 'no-cache',
          
       },
      
   }; 
   const result = await axios(config).then(function (response) { 
       console.log(JSON.stringify(response.data));
       return {
           data: response.data,
           success: true
       }
   }).catch(function (error) {
       console.log(error);
       return {
           success: false
       }
   });

   return result;
},
async get_order_status() {
    let url = new URL(`${SHOPIFY_URL}/api/order-statuses`)
    const params:any = {
      
        per_page: "10",
    };
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
    const token = useCookie('token').value || ""
    var config:any = {
       method: 'GET',
       url: url,
       headers: { 
         "Authorization": `Bearer ${token}`,
           'Accept': '/',
           'Cache-Control': 'no-cache',
          
       },
      
   }; 
   const result = await axios(config).then(function (response) { 
       console.log(JSON.stringify(response.data));
       return {
           data: response.data,
           success: true
       }
   }).catch(function (error) {
       console.log(error);
       return {
           success: false
       }
   });

   return result;
},
       async get_product_brands() {
        let url = new URL(`${SHOPIFY_URL}/api/product-brands`)
        const params:any = {
            per_page: "70",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
             "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
   async fetchAllProductBrands() {
    let page = 1;
    let per_page = 10;
    let hasMorePages = true;
    let url:any = `${SHOPIFY_URL}/api/product-brands`;
    const token = useCookie('token').value || ""
    var config:any = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`, 
            'Accept': '/',
            'Cache-Control': 'no-cache',
        },
    };

    this.product_brands = []; // Initialize allCategories array

    while (hasMorePages) {
        try {
            config.url = `${url}?page=${page}&per_page=${per_page}`;
            const response = await axios(config);
            console.log('mbilimbi23', response.data.data);
            this.product_brands.push(...response.data.data.data);
            console.log('product_brands',this.product_brands)
            if (page >= response.data.data.totalPages) {
                hasMorePages = false;
            } else {
                page++;
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            hasMorePages = false;
        }
    }

    // Uncomment this line if you want to filter parent categories
    
},
       async get_all_featured_products(id:any,shop_brand:any) {
        let url = new URL(`${SHOPIFY_URL}/api/featured-products/${id}?is_shop_brand=${shop_brand}`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
            "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
       async getInventory(id:any) {
        let url = new URL(`${SHOPIFY_URL}/api/inventory?shop_id=${id}`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: {
               "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
        async getCategoriesPagination(page:any) {
            let url = new URL(`${SHOPIFY_URL}/api/categories?page=${page}`)
            const token = useCookie('token').value || ""
            var config:any = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': '/',
                'Cache-Control': 'no-cache',
                
            },
            
        }; 
        const result = await axios(config).then(function (response) { 
            console.log(JSON.stringify(response.data));
            return {
                data: response.data,
                success: true
            }
        }).catch(function (error) {
            console.log(error);
            return {
                success: false
            }
        });

        return result;
        },
        async getAllShops() {
            let url = new URL(`${SHOPIFY_URL}/api/shops`)
            const params:any = {
                per_page: "100",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
              const token = useCookie('token').value || ""
            var config:any = {
               method: 'GET',
               url: url,
               headers: {
                "Authorization": `Bearer ${token}`, 
                   'Accept': '/',
                   'Cache-Control': 'no-cache',
                  
               },
              
           }; 
           const result = await axios(config).then(function (response) { 
               console.log(JSON.stringify(response.data));
               return {
                   data: response.data,
                   success: true
               }
           }).catch(function (error) {
               console.log(error);
               return {
                   success: false
               }
           });
  
           return result;
       },
        
        async getAllProducts() {
            let url = new URL(`${SHOPIFY_URL}/api/products`)
            const params:any = {
                per_page: "100",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
            const token = useCookie('token').value || ""
            var config:any = {
               method: 'GET',
               url: url,
               headers: { 
                "Authorization": `Bearer ${token}`,
                   'Accept': '/',
                   'Cache-Control': 'no-cache',
                  
               },
              
           }; 
           const result = await axios(config).then(function (response) { 
               console.log(JSON.stringify(response.data));
               return {
                   data: response.data,
                   success: true
               }
           }).catch(function (error) {
               console.log(error);
               return {
                   success: false
               }
           });
  
           return result;
       },
       async getOrders() {
        let url = new URL(`${SHOPIFY_URL}/api/orders`)
        const params:any = {
            per_page: "100",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
            "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
   async getShopOrders(user_shop:any) {
    let url = new URL(`${SHOPIFY_URL}/api/orders/shop/${user_shop}`)
    const params:any = {
        per_page: "100",
    };
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
    const token = useCookie('token').value || ""
    var config:any = {
       method: 'GET',
       url: url,
       headers: { 
        "Authorization": `Bearer ${token}`,
           'Accept': '/',
           'Cache-Control': 'no-cache',
          
       },
      
   }; 
   const result = await axios(config).then(function (response) { 
       console.log(JSON.stringify(response.data));
       return {
           data: response.data,
           success: true
       }
   }).catch(function (error) {
       console.log(error);
       return {
           success: false
       }
   });

   return result;
},
       async getUsers() {
        let url = new URL(`${SHOPIFY_URL}/api/users`)
        const params:any = {
            per_page: "100",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
            "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
        },
        async getShoppingCart() {
            let url = new URL(`${SHOPIFY_URL}/api/carts`)
            const params:any = {
                per_page: "100",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
            const token = useCookie('token').value || ""
            var config:any = {
               method: 'GET',
               url: url,
               headers: { 
                "Authorization": `Bearer ${token}`,
                   'Accept': '/',
                   'Cache-Control': 'no-cache',
                  
               },
              
           }; 
           const result = await axios(config).then(function (response) { 
               console.log(JSON.stringify(response.data));
               return {
                   data: response.data,
                   success: true
               }
           }).catch(function (error) {
               console.log(error);
               return {
                   success: false
               }
           });
    
           return result;
            },
       async getProductsPagination(page:any) {
        let url = new URL(`${SHOPIFY_URL}/api/products?page=${page}`)
          const token = useCookie('token').value || ""
        var config:any = {
        method: 'GET',
        url: url,
        headers: { 
            "Authorization": `Bearer ${token}`,
            'Accept': '/',
            'Cache-Control': 'no-cache',
            
        },
        
    }; 
    const result = await axios(config).then(function (response) { 
        console.log(JSON.stringify(response.data));
        return {
            data: response.data,
            success: true
        }
    }).catch(function (error) {
        console.log(error);
        return {
            success: false
        }
    });

    return result;
    },
       async getAllCurrencies() {
        let url = new URL(`${SHOPIFY_URL}/api/currencies`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
           method: 'GET',
           url: url,
           headers: { 
            "Authorization": `Bearer ${token}`,
               'Accept': '/',
               'Cache-Control': 'no-cache',
              
           },
          
       }; 
       const result = await axios(config).then(function (response) { 
           console.log(JSON.stringify(response.data));
           return {
               data: response.data,
               success: true
           }
       }).catch(function (error) {
           console.log(error);
           return {
               success: false
           }
       });

       return result;
   },
        async getAllAdverts() {
        let url = new URL(`${SHOPIFY_URL}/api/adverts`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        const token = useCookie('token').value || ""
        var config:any = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Accept': '/',
                'Cache-Control': 'no-cache',
                
            },
            
        }; 
        const result = await axios(config).then(function (response) { 
            console.log(JSON.stringify(response.data));
            return {
                data: response.data,
                success: true
            }
        }).catch(function (error) {
            console.log(error);
            return {
                success: false
            }
        });

        return result;
        },
        async getInfluencers() {
            let url = new URL(`${SHOPIFY_URL}/api/influencers`)
            const params:any = {
                per_page: "10",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
            const token = useCookie('token').value || ""
            var config:any = {
                method: 'GET',
                url: url,
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    
                },
                
            }; 
            const result = await axios(config).then(function (response) { 
                console.log(JSON.stringify(response.data));
                return {
                    data: response.data,
                    success: true
                }
            }).catch(function (error) {
                console.log(error);
                return {
                    success: false
                }
            });
    
            return result;
            },
        async fetchAllCategories() {
            let page = 1;
            let per_page = 10;
            let hasMorePages = true;
            let url:any = `${SHOPIFY_URL}/api/categories`;
            const token = useCookie('token').value || ""
            var config:any = {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                },
            };
        
            this.allCategories = []; // Initialize allCategories array
        
            while (hasMorePages) {
                try {
                    config.url = `${url}?page=${page}&per_page=${per_page}`;
                    const response = await axios(config);
                    console.log('mbilimbi', response.data.data);
                    this.allCategories.push(...response.data.data.categories);
        
                    if (page >= response.data.data.totalPages) {
                        hasMorePages = false;
                    } else {
                        page++;
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    hasMorePages = false;
                }
            }
        
            // Uncomment this line if you want to filter parent categories
            
        
            console.log('All Categories:', this.allCategories);
            console.log('Parent Categories:', this.parentCategories);
        },
        async fetchAllProducts() {
            let page = 1;
            let per_page = 10;
            let hasMorePages = true;
            let url:any = `${SHOPIFY_URL}/api/products`;
            const token = useCookie('token').value || ""
            var config:any = {
                method: 'GET',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                },
            };
        
            this.products = []; // Initialize allCategories array
        
            while (hasMorePages) {
                try {
                    config.url = `${url}?page=${page}&per_page=${per_page}`;
                    const response = await axios(config);
                    console.log('mbilimbi', response.data.data);
                    this.products.push(...response.data.data.products);
        
                    if (page >= response.data.data.totalPages) {
                        hasMorePages = false;
                    } else {
                        page++;
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    hasMorePages = false;
                }
            }
        
            // Uncomment this line if you want to filter parent categories
            
        
            console.log('All Products:', this.products);
           
        },
    }
});