import { defineStore } from "pinia";
import axios from "axios";


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

        async createShopBrand() {
            
            const data = { 
                name: this.name,
                logo: this.logo,
                
            },
             config = {
                method: 'post',
                url: '/shopBrands/create',
                data: data,
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'multipart/form-data'
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
                logo: "this.logo",
                
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

       
    }
});