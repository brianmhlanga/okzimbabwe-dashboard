import { defineStore } from "pinia";
import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";



export const useShopBrandsStore = defineStore('shopBrands', {
    state: () => ({
        name: "",
        id: "",
        logo: "",
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
             var config = {
                method: 'post',
                url: '/shopBrands/getAllShopBrands',
                headers: { 
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
                id: this.id, 
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
            var config = {
                method: 'post',
                url: '/Catergories/create',
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
            var config = {
               method: 'GET',
               url: url,
               headers: { 
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
       async getCategoriesPagination(page) {
        let url = new URL(`${SHOPIFY_URL}/api/categories?page=${page}`)
       
        var config = {
           method: 'GET',
           url: url,
           headers: { 
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
    }
});