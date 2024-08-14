<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Influencers</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create Influencer" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            
                          
                           </div>                    
                    </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Influencer" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-6 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Influencer name</label> 
                        <InputText class="form-control" type="text"  v-model="name"/>
                    </div>
                    <div class="field mb-4 col-6 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Email</label> 
                        <InputText class="form-control" type="text"  v-model="email"/>
                    </div>
                    <div class="field mb-4 col-6 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Whatsapp Number</label> 
                        <InputText class="form-control" type="text"  v-model="whatsapp_number"/>
                    </div>
                    <div class="field mb-4 col-6 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Phone Number</label> 
                        <InputText class="form-control" type="text"  v-model="phone_number"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Discount Type</label> 
                        <InputText class="form-control" type="text"  v-model="discount_type"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Start Date</label> 
                        <Calendar v-model="start_date" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">End Date</label> 
                        <Calendar v-model="end_date" />
                    </div>
                    
                </div>
                <Button @click="createProduct()" label="Apply   " icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="product_modal" maximizable modal header="Update Product" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product name</label> 
                        <InputText class="form-control" type="text"  v-model="name"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product description</label> 
                        <Textarea v-model="description" autoResize rows="3" cols="30" />
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Images</label> 
                        <input type="file" accept="image/jpeg, image/png" @change="handleFileChange">
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Select category </label> 
                        <Dropdown v-model="category_id" :options="allCategories" optionLabel="name" optionValue="id" placeholder="Select  category" checkmark :highlightOnSelect="false"  />
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product Code</label> 
                        <InputText class="form-control" type="text"  v-model="product_code"/>
                    </div>
                    
                </div>
                <Button @click="updateProduct()" label="Update Product" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="add_price" modal header="Add Price" :style="{ width: '25rem' }">
            <span class="text-center block mb-5">{{selectedProduct}}</span>
            <div v-for="(brand,index) in shop_brand_list" class="flex align-items-center gap-3 mb-3">
                <div class="grid formgrid p-fluid w-full">
                            <div class=" mb-2 col-12 md:col-12">
                                {{ brand.name}}
                            </div>
                            <div class=" mb-2 col-12 md:col-12">
                                <InputText id="username" v-model="brandPrices[index]" class="w-full" placeholder="Add Price" autocomplete="off" />
                            </div>
                            
                </div>
            </div>
            
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="addPrice()"></Button>
            </div>
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
   
 
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
  import { SHOPIFY_URL } from "~/services/global.variables";
      import { storeToRefs } from "pinia";
     import { useShopBrandsStore } from "~/stores/shopBrands";
     import Swal from 'sweetalert2'
     import { FilterMatchMode } from 'primevue/api';
     import { useConfirm } from "primevue/useconfirm";
    const confirm = useConfirm();
     const shopBrandsStore = useShopBrandsStore()
     const parentCategories = storeToRefs(shopBrandsStore).parentCategories
     console.log('vbhjnk',parentCategories.value)
     const allCategories = storeToRefs(shopBrandsStore).allCategories
     const name = ref('')
     const email = ref('')
     const whatsapp_number = ref('')
     const phone_number = ref('')
     const product_modal = ref()
     const start_date = ref()
     const end_date = ref()
     const discount_type = ref()
     const is_active = ref('')
     const category_id = ref('')
     const product_code = ref()
     const price = ref()
     const toast = useToast()
     const imageFiles = ref([])
     const shop_brand_list:any = ref()
     const category_type = ref('Yes')
     const active_status = ref('Yes')
     const categories_list = ref()
     let number_of_categories = ref()
     const selectedProductId = ref()
     const addLineItem = ref(false)
     const brandPrices:any = ref([]);
     const options = ref([ 'Yes', 'No']);
     const selectedProduct = ref()
     const add_price = ref(false)
     definePageMeta({
        middleware: ["auth"]
});
    
   
    const items = (product:any) => [
      {
        label: 'Add Price',
        command: () => getProduct(product)
      },
      {
        label: 'Update Product',
        command: () => showProduct(product)
      },
      {
        label: 'Delete Product',
        command: () => deleteProduct(product)
      }
      // Add more actions if needed
    ];

    const getProduct = (product:any) => {
      selectedProduct.value = product.data.name;
      selectedProductId.value = product.data.id
      console.log(selectedProduct.value)
      add_price.value = true;
    };
    
    const getParsedImages = (images: string) => {
  try {
    const parsedImages = JSON.parse(images);
    const cleanedString = JSON.parse(parsedImages.replace(/\\/g, ''));
    return cleanedString[0]
  } catch (error) {
    console.error('Error parsing images JSON:', error);
  }
  return null; // Return null if parsing fails or no images are found
};
     const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const dt = ref();

    const initFilters = () => {
        filters.value = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    };

    const clearFilter1 = () => {

        initFilters();
    };

     
 
     onMounted(async () => {
        await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
        await shopBrandsStore.getAllShopBrands().then((data:any)=>{
            shop_brand_list.value = data.data.data.data.shopbrands
            shop_brand_list.value.forEach(() => brandPrices.value.push(""));
            console.log(data.data.data.data.shopbrands)
        })
        await shopBrandsStore.fetchAllCategories().then((data:any)=>{
            allCategories.value.push(...data.data.categories)
        })
        //  let result = await shopBrandsStore.getAllShopBrands().then((data) => {
        //      console.log("dgfa",data.data.data.data.shopbrands)
        //      shop_brand_list.value = data.data.data.data.shopbrands
        //  })
     
     });
     
     const showProduct = async(product:any) => {
      name.value = product.data.name;
      description.value = product.data.description
      category_id.value = product.data.category_id
      product_code.value = product.data.product_code
      selectedProductId.value = product.data.id
      product_modal.value = true
     
}
    
     const onPage = (event:any) => {
        let current_page = event.page + 1
        let result =  shopBrandsStore.getProductsPagination(current_page).then((data:any) => {
            
            categories_list.value = data.data.data.products
            console.log('hbj',data.data.data.categories.length)
            number_of_categories.value = data.data.data.categories.length
        })

    }
     
    const deleteProduct = (product:any) => {
      let data = {
        "id": product.data.id
      }
      
      confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async() => {
            let result = await shopBrandsStore.deleteProduct(data)
            if (result.data.success){
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            await shopBrandsStore.getAllProducts().then((data:any)=>{
                categories_list.value = data.data.data.products
            })
            }
            else{
                toast.add({ severity: 'warn', summary: 'Failed', detail: 'Deletion Failed', life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        } 
    });
}
    const addPrice = async () =>{
       
         
            
            let data = {
                product_id : selectedProductId.value,
                shop_brand_id : shop_brand_list.value.map(brand => brand.id),
                price: brandPrices.value.map(price=> (price))
                
         
            }
            let result = await shopBrandsStore.createPrice(data)
            console.log('my result',result.success)
            
 
            if (result.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Price Succesfully Added', life: 3000});
                addLineItem.value = false
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
            }
        } 
        
       
           
         
         
      
        
         
     

    const formatDate = (value) => {
        const date = new Date(value);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        //@ts-ignore
        return date.toLocaleString('en-US', options);
    };
  
    const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    const acceptedTypes = ['image/jpeg', 'image/png','image/jpg'];
    if (file && acceptedTypes.includes(file.type)) {
        imageFiles.value.push(file) 
    } else {
        toast.add({ severity: 'info', summary: 'Wrong File Type', detail: 'Upload PNG or JPEG', life: 3000 });
        imageFiles.value = null;
    }
    };
    const createProduct = async () => {
        console.log('simba')
      
      const url = `${SHOPIFY_URL}/api/products`;
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);
      formData.append('category_id', category_id.value);
      formData.append('product_code', product_code.value);
      console.log('form',formData)
   
      if (imageFiles.value) {
        imageFiles.value.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
      }
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
          },
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Shop Brand Created Successfully', life: 3000 });
        await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
        addLineItem.value = false
        // let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
        //     shop_brand_list.value = data.data.data.data.shopbrands
        // })
      } catch (error:any) {
        console.log('error', error)
       
        toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error, life: 3000 });
      }
    };
    const updateProduct = async () => {
        console.log('simba')
      
      const url = `${SHOPIFY_URL}/api/products/edit/${selectedProductId.value}`;
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);
      formData.append('category_id', category_id.value);
      formData.append('product_code', product_code.value);
      console.log('form',formData)
   
      if (imageFiles.value) {
        imageFiles.value.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
      }
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
          },
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Shop Brand Created Successfully', life: 3000 });
        await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
        product_modal.value = false
        // let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
        //     shop_brand_list.value = data.data.data.data.shopbrands
        // })
      } catch (error:any) {
        console.log('error', error)
       
        toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error, life: 3000 });
      }
    };


    
 </script>
 <style>
   
</style>