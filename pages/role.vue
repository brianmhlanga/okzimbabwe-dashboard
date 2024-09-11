<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                 <div class="text-900 font-medium text-xl mb-3">Roles</div>
                  
                    <div>
                    <div class="card p-4 m-3 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create Role" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                            <DataTable :value="roles_list" tableStyle="min-width: 50rem">
                                <template #header>
                                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                        <span class="text-xl text-900 font-bold">User Roles</span>
                                    </div>
                                </template>
                                <Column field="name" header="Role name">
                                    <template #body="slotProps">
                                        {{slotProps.data.name}}
                                    </template>
                                </Column>
                                <Column header="Date Created">
                                    <template #body="slotProps">
                                        {{formatDate(slotProps.data.created_at)}} 
                                    </template>
                                </Column>          
                                <Column header="Actions">
                                    <template #body="slotProps">
                                        <Button  icon="pi pi-pencil" severity="info"  text rounded aria-label="Cancel" />
                                        <Button  icon="pi pi-trash" severity="danger"  text rounded aria-label="Cancel" />
                                    </template>
                                </Column>
                                
                            </DataTable>
                           </div>
                            
                           </div>                    
                    </div>
                 </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add New User Role" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Role Name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                  
                </div>
                <Button :loading="loading" @click="createRole()" label="Create role" icon="pi pi-plus" />
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
 const name = ref()
 const logo = ref()
 const loading = ref(false)
 const open_shop_brand_modal = ref(false)
 const toast = useToast()
 const shop_brand_list = ref()
 const roles_list = ref()
 const shop_id = ref()
 const addLineItem = ref(false)
 const logoFile = ref()
 definePageMeta({
         middleware: ["auth"]
 });
 onMounted(async () => {
     let result = await shopBrandsStore.getAllRoles().then((data:any) => {
        console.log('roles',data.data.data.data)
         roles_list.value = data.data.data.data
     })
 });

 const refresh_data = ()=>{
    name.value = ''
 }
 const createRole = async () => {
    const data = {
        name: name.value,
       
    };
    loading.value = true
    const result = await shopBrandsStore.createUserRole(data);
    console.log('resultvggucuhhh',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'User Role Successfully Created', life: 3000 });
        loading.value = false
        addLineItem.value = false;
        refresh_data()
        let result = await shopBrandsStore.getAllRoles().then((data:any) => {
         roles_list.value = data.data.data.data
     })
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false
        refresh_data()
    }
};
 const shopBrandModal = (data:any)=>{
     open_shop_brand_modal.value = true
     shop_id.value = data.id
     name.value = data.name
     logoFile.value = data.logo
     console.log('my brand id',data.id)
 }
 const updateShopBrand = async ()=>{
    loading.value = true
     const url = `${SHOPIFY_URL}/api/shop-brands/${shop_id.value}`;
     const formData = new FormData();
     formData.append('name', name.value);
     if (logoFile.value) {
     formData.append('logo', logoFile.value, logoFile.value.name);
     }
     try {
     const response = await axios.post(url, formData, {
         headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': '*/*'
         },
     });
     toast.add({ severity: 'success', summary: 'Success', detail: 'Shop Brand Created Successfully', life: 3000 });
     loading.value = false
     addLineItem.value = false
     let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
         shop_brand_list.value = data.data.data.data.shopbrands
     })
     } catch (error:any) {
     loading.value = false
     toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error.response.data, life: 3000 });
     }
 }
 
 const deleteShopBrand = (shop_brand_id:any) => {
     console.log('shop_id',shop_brand_id)
     let data = {
     "id": shop_brand_id
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
         let result = await shopBrandsStore.deleteShopBrand(data)
         if (result.data.success){
         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
     
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
 
 const formatDate = (value: string) => {
    const date = new Date(value);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    };
    return date.toLocaleString('en-US', options);
};
 
 </script>