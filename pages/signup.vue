<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Register Users</div>
                    <div class="card p-4 ml-3  ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Sign up" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            <!-- <div class="field mb-4 col-12 md:col-12"> 
                             <DataTable :value="shop_brand_list" tableStyle="min-width: 50rem">
                                 <template #header>
                                     <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                         <span class="text-xl text-900 font-bold">Users</span>
                                     </div>
                                 </template>
                                 <Column field="name" header="Shop brand name">
                                     <template #body="slotProps">
                                         {{slotProps.data.name}}
                                     </template>
                                 </Column>
                                 <Column header="Shop brand logo">
                                     <template #body="slotProps">
                                         <img :src="`${slotProps.data.logo}`"  class="w-6rem border-round" />
                                     </template>
                                 </Column>          
                                 <Column header="Actions">
                                     <template #body="slotProps">
                                         <Button  icon="pi pi-pencil" severity="info" @click="shopBrandModal(slotProps.data)" text rounded aria-label="Cancel" />
                                         <Button  icon="pi pi-trash" severity="danger" @click="deleteShopBrand(slotProps.data.id)" text rounded aria-label="Cancel" />
                                     </template>
                                 </Column>
                                 
                             </DataTable>
                            </div> -->
                           </div>                    
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Register User" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Email</label> 
                        <input class="form-control" type="text"  v-model="email">
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Shop Brand </label> 
                        
                        <Dropdown v-model="shop_brand_id" :options="shop_brand_list" filter optionLabel="name" optionValue="id" placeholder="Select shop brand" required>
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ shop_brand_list.find(brand => brand.id === slotProps.value)?.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Shop</label> 
                        
                        <Dropdown v-model="shop_id" :options="shops_list" filter optionLabel="name" optionValue="id" placeholder="Select shop" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ shops_list.find(brand => brand.id === slotProps.value)?.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Role</label> 
                        
                        <Dropdown v-model="role_id" :options="roles_list" filter optionLabel="name" optionValue="id" placeholder="Select  role" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ roles_list.find(brand => brand.id === slotProps.value)?.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Password </label> 
                        <Password  type="text" toggleMask v-model="password" />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Password Confirmation</label> 
                        <Password  type="text" toggleMask v-model="password_confirmation"/>
                    </div>
                    <div class="mb-4" v-if="password != password_confirmation">
                        <InlineMessage severity="error">Password does not match</InlineMessage>
                    </div>
                   
                </div>
                <Button :loading="loading" @click="signup()" label="Register User" icon="pi pi-plus" />
        </Dialog>
        
        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
 import { SHOPIFY_URL } from "~/services/global.variables";
 import { useShopBrandsStore } from "~/stores/shopBrands";
 import { useConfirm } from "primevue/useconfirm";
import Password from "primevue/password";
 const confirm = useConfirm();
 const shopBrandsStore = useShopBrandsStore()
 
 const name = ref()
 const email = ref()
 const password = ref()
 const password_confirmation = ref()
 const loading = ref(false)
 const open_shop_brand_modal = ref(false)
 const toast = useToast()
 const shop_brand_list = ref()
 const shop_id = ref()
 const shops_list = ref()
 const shop_brand_id =  ref()
 const role_id = ref()
 const roles_list = ref()
 const addLineItem = ref(false)
 const logoFile = ref()
 definePageMeta({
        middleware: ["auth"]
});
 onMounted(async () => {
     let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
         shop_brand_list.value = data.data.data.data.shopbrands
     })
     await shopBrandsStore.getAllShops().then((data:any) => {
        shops_list.value = data.data.data.shops
        console.log('my shops',shops_list.value)
    });
    await shopBrandsStore.getAllRoles().then((data:any) => {
        console.log('roles',data.data.data.data)
         roles_list.value = data.data.data.data
     })
 });
 

 const shopBrandModal = (data:any)=>{
     open_shop_brand_modal.value = true
     shop_id.value = data.id
     name.value = data.name
     logoFile.value = data.logo
     console.log('my brand id',data.id)
 }
 const signup = async () => {
  loading.value = true
    const data = {
    
        name: name.value,
        email: email.value,
        shop_brand_id: shop_brand_id.value,
        shop_id: shop_id.value,
        role_id: role_id.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        
    };
    const result = await shopBrandsStore.signup(data);
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'User Successfully Created', life: 3000 });
        loading.value = false
        addLineItem.value = false;
        
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = true
    }
};
 
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
 
 
 
 </script>