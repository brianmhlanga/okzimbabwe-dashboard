import { defineStore } from "pinia";
import axios from "axios";
import { SHOPIFY_URL} from "~~/services/global.variables";
import type getAllProducts from "~/server/routes/Products/getAllProducts";
import type signup from "~/server/routes/auth/signup";



export const useShopBrandsStore = defineStore('shopBrands', {
    state: () => ({
        name: "",
        
        logo: "",
        allCategories: [] as any[],
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
        async createShop (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/shops/create',
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
        async createInventory (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/inventory/create',
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
        async signup (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/auth/signup',
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
            return result;

        },
        async addFeaturedProducts (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/featuredProducts/add_featured_product',
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
        async createPrice (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/price/addPrice',
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
        async addCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/currencies/add_currency',
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
        async updateCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/currencies/update',
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
        async updateShop (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/shops/update',
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
        async deleteCurrency (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/currencies/delete',
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
        async deleteShop (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/shops/delete',
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
        async deleteShopBrand (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/shopBrands/delete',
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
        async deleteProduct (info:any){
            var data = JSON.stringify({
                "data": info,
            });
            var config = {
                method: 'post',
                url: '/Products/delete',
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
            var config:any = {
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
       async get_all_featured_products(id:any,shop_brand:any) {
        let url = new URL(`${SHOPIFY_URL}/api/featured-products/${id}?is_shop_brand=${shop_brand}`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        var config:any = {
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
       async getInventory(id:any) {
        let url = new URL(`${SHOPIFY_URL}/api/inventory?shop_id=${id}`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        var config:any = {
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
        async getCategoriesPagination(page:any) {
            let url = new URL(`${SHOPIFY_URL}/api/categories?page=${page}`)
        
            var config:any = {
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
        async getAllShops() {
            let url = new URL(`${SHOPIFY_URL}/api/shops`)
            const params:any = {
                per_page: "10",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
            var config:any = {
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
        
        async getAllProducts() {
            let url = new URL(`${SHOPIFY_URL}/api/products`)
            const params:any = {
                per_page: "10",
            };
            Object.keys(params).forEach((key) =>
                url.searchParams.append(key, params[key])
            );
            var config:any = {
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
       async getProductsPagination(page:any) {
        let url = new URL(`${SHOPIFY_URL}/api/products?page=${page}`)
    
        var config:any = {
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
       async getAllCurrencies() {
        let url = new URL(`${SHOPIFY_URL}/api/currencies`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        var config:any = {
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
        async getAllAdverts() {
        let url = new URL(`${SHOPIFY_URL}/api/adverts`)
        const params:any = {
            per_page: "10",
        };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
        var config:any = {
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
        async fetchAllCategories() {
            let page = 1;
            let per_page = 10;
            let hasMorePages = true;
            let url:any = `${SHOPIFY_URL}/api/categories`;
        
            var config:any = {
                method: 'GET',
                headers: { 
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
            this.parentCategories = this.allCategories.filter(category => category.is_parent == true);
        
            console.log('All Categories:', this.allCategories);
            console.log('Parent Categories:', this.parentCategories);
        },
        async fetchAllProducts() {
            let page = 1;
            let per_page = 10;
            let hasMorePages = true;
            let url:any = `${SHOPIFY_URL}/api/products`;
        
            var config:any = {
                method: 'GET',
                headers: { 
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