<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Shop Brand Currencies</div>
                    <div>
                        <div class="card p-4 ml-3 mr-10">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Shop Brand Currency" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                            
                        </div>                    
                    </div>
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create brand currency" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div  class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Shop brand</label> 
                        <Dropdown v-model="shop_id" :options="shop_brand_list" optionLabel="name" optionValue="id" placeholder="Select shop brand" checkmark :highlightOnSelect="false"  />
                    </div>
                    <div  class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Currency</label> 
                        <Dropdown v-model="currency_id" :options="currencies" optionLabel="name" optionValue="id" placeholder="Select currency" checkmark :highlightOnSelect="false"  />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Conversion Rate</label> 
                        <InputText class="form-control" type="text"  v-model="conversion_rate"/>
                    </div>
                    
        
                </div>
                <Button :loading="loading" @click="createCurrency()" label="Create brand Currency" icon="pi pi-plus" />
        </Dialog>
 
    </NuxtLayout>
 </template>
 <script setup lang>
      import { storeToRefs } from "pinia";
     import { useShopBrandsStore } from "~/stores/shopBrands";
     import Swal from 'sweetalert2'
     import { FilterMatchMode } from 'primevue/api';
     const shopBrandsStore = useShopBrandsStore()
     const parentCategories = storeToRefs(shopBrandsStore).parentCategories
     console.log('vbhjnk',parentCategories.value)
     const allCategories = ref([])
     const name = ref('')
     const loading = ref(false);
     const is_parent = ref('')
     const is_sub_parent = ref('')
     const is_active = ref('')
     const parent_category_id = ref('')
     const toast = useToast()
     const shop_brand_list = ref()
     const currencies = ref()
     const shop_id = ref()
     const currency_id = ref()
     const conversion_rate = ref()
     const category_type = ref('Yes')
     const active_status = ref('Yes')
     const categories_list = ref()
     let number_of_categories = ref()
     const addLineItem = ref(false)
     const options = ref([ 'Yes', 'No']);
     definePageMeta({
        middleware: ["auth"]
});
 
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

  

     
    
     const refresh_data = ()=>{
        shop_id.value = ''
        currency_id.value = ''
        conversion_rate.value = ""
       
    }


     
     onMounted(async () => {
        await shopBrandsStore.getAllCurrencies().then((data)=>{
            currencies.value = data.data.data.currencies
            console.log('c list',currencies.value)
        })
        await shopBrandsStore.getAllShopBrands().then((data)=>{
            shop_brand_list.value = data.data.data.data.shopbrands
            console.log('shop list',currencies.value)
        })
        //  let result = await shopBrandsStore.getAllShopBrands().then((data) => {
        //      console.log("dgfa",data.data.data.data.shopbrands)
        //      shop_brand_list.value = data.data.data.data.shopbrands
        //  })
     
     });
 
     const createCurrency = async () =>{
        loading.value = true
        let data = {
            shop_id: shop_id.value,
            currency_id: currency_id.value,
            conversion_rate: conversion_rate.value,
        
        }
            let result = await shopBrandsStore.brandCurrency(data)
            console.log('my result',result)
 
            if (result.data.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Shop Brand Currency Succesfully Created', life: 3000});
                loading.value = false
                addLineItem.value = false
                refresh_data()
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
                loading.value = false
            }
         
     }
    
     const onPage = (event) => {
        let current_page = event.page + 1
        let result =  shopBrandsStore.getCategoriesPagination(current_page).then((data) => {
            
            categories_list.value =  data.data.data.categories
            console.log('hbj',data.data.data.categories.length)
            number_of_categories.value = data.data.data.categories.length
        })

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
  
 </script>
 <style>
   
</style>