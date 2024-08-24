<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                 <div class="text-900 font-medium text-xl mb-3">Default Currency</div>
                  
                    <div>
                    <div class="card p-4 m-3 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Default Currency" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                          
                           </div>                    
                    </div>
                 </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Set Default Currency" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div  class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Set default currency</label> 
                        <Dropdown v-model="id" :options="currencies" optionLabel="name" optionValue="id" placeholder="Select currency" checkmark :highlightOnSelect="false"  />
                    </div>
                  
                </div>
                <Button :loading="loading" @click="createCurrency()" label="Set default currency" icon="pi pi-plus" />
        </Dialog>
       
        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
 import { SHOPIFY_URL } from "~/services/global.variables";
 import { useShopBrandsStore } from "~/stores/shopBrands";
 import { useConfirm } from "primevue/useconfirm";
 const confirm = useConfirm();
 const shopBrandsStore = useShopBrandsStore()
 const id = ref()
 const logo = ref()
 const loading = ref(false)
 const open_shop_brand_modal = ref(false)
 const toast = useToast()
 const shop_brand_list = ref()
 const shop_id = ref()
 const addLineItem = ref(false)
 const currencies = ref()
 definePageMeta({
         middleware: ["auth"]
 });
 onMounted(async () => {
    await shopBrandsStore.getAllCurrencies().then((data:any)=>{
            currencies.value = data.data.data.currencies
            console.log('c list',currencies.value)
        })
 });
 
 const refresh_data = ()=>{
        id.value = ''
       
       
    }
 const createCurrency = async () =>{
        loading.value = true
        let data = {
            id: id.value,
            
        }
            let result = await shopBrandsStore.defaultCurrency(data)
            console.log('my result',result)
 
            if (result.data.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Default Currency Succesfully Created', life: 3000});
                loading.value = false
                addLineItem.value = false
                refresh_data()
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
                loading.value = false
            }
         
     }
 
 </script>