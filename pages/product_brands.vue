<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                 <div class="text-900 font-medium text-xl mb-3">Product Brands</div>
                  
                    <div>
                    <div class="card p-4 m-3 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Product Brand" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="product_brands_list" ref="dt" class="p-datatable-customers" showGridlines :rows="10"
                                           dataKey="id" v-model:filters="filters" filterDisplay="menu"  responsiveLayout="scroll">
                                    <template #header>
                                        <div class="flex justify-content-between">
                                           
                                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()" />
                                            <Button icon="pi pi-external-link" label="Table Export" @click="exportCSV($event)" />
                                            <IconField iconPosition="left">
                                                <InputIcon class="pi pi-search"></InputIcon>
                                                <InputText v-model="searchParams" placeholder="Keyword Search" @input="searchProductBrands()"/>
                                            </IconField>
                                        </div>
                                    </template>
                                    <template #empty>
                                        No product brands found.
                                    </template>
                                    <template #loading>
                                        Loading product brands data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Product Brand name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.name }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="description" header="Brand Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.brand_code }}
                                        </template>
                                    </Column>
                                   
                                
                                 
                                    <Column frozen field="created_at" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ formatDate( data?.created_at )}}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                    <template #body="slotProps">
                                        <Button  icon="pi pi-pencil" severity="info" @click="shopBrandModal(slotProps.data)" text rounded aria-label="Cancel" />
                                        <Button  icon="pi pi-trash" severity="danger" @click="deleteShopBrand(slotProps.data.id)" text rounded aria-label="Cancel" />
                                    </template>
                                </Column>
                                </DataTable>
                                <Paginator @page="onPage($event)"
                                           :template="{
                                               '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                                               '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                                               '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                                               default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
                                           }"
                                           :rows="10"
                                           :totalRecords="120">
                                </Paginator>
                            </div> 
                           </div>                    
                    </div>
                 </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Product Brand" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Product brand name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                  
                </div>
                <Button :loading="loading" @click="createProductBrand()" label="Create product brand" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="open_shop_brand_modal" maximizable modal header="Edit Product Brand" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Product brand name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                  
                </div>
                <Button :loading="loading" @click="editProductBrand()" label="Edit product brand" icon="pi pi-plus" />
        </Dialog>
       
        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
 import { FilterMatchMode } from 'primevue/api';
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
 const searchParams = ref()
 const shop_brand_list = ref()
 const token = useCookie('token')
 const product_brands_list = ref()
 const shop_id = ref()
 const addLineItem = ref(false)
 const logoFile = ref()
 const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const dt = ref();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};

const clearFilter1 = () => {
    initFilters();
};
 definePageMeta({
         middleware: ["auth"]
 });
 onMounted(async () => {
     let result = await shopBrandsStore.getAllProductBrandss().then((data:any) => {
         product_brands_list.value = data.data.data.data
       
     })
 });

 const createProductBrand = async () => {
    const data = {
        name: name.value,
        token: token.value
       
    };
    loading.value = true
    const result = await shopBrandsStore.createProductBrand(data);
   

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Product Brand Successfully Created', life: 3000 });
        loading.value = false
        addLineItem.value = false;
        const result = await shopBrandsStore.getAllProductBrandss().then((data:any) => {
         product_brands_list.value = data.data.data.data
       
     })
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false
    }
};
const editProductBrand = async () => {
    const data = {
        id: shop_id.value,
        name: name.value,
        is_active: true,
        token: token.value
       
    };
    loading.value = true
    const result = await shopBrandsStore.editProductBrand(data);
    

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Product Brand Successfully Updated', life: 3000 });
        loading.value = false
        addLineItem.value = false;
        let result = await shopBrandsStore.getAllProductBrandss().then((data:any) => {
         product_brands_list.value = data.data.data.data
        
     })
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false
    }
};
 const shopBrandModal = (data:any)=>{
     open_shop_brand_modal.value = true
     shop_id.value = data.id
     name.value = data.name
     
     
 }

 
 const deleteShopBrand = (shop_brand_id:any) => {
    
     let data = {
     "id": shop_brand_id,
     token: token.value
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
         let result = await shopBrandsStore.deleteProductBrand(data)
         if (result.data.success){
         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
         let result = await shopBrandsStore.getAllProductBrandss().then((data:any) => {
            product_brands_list.value = data.data.data.data
          
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
 const onPage = (event:any) => {
        let current_page = event.page + 1
        let result =  shopBrandsStore.getProductsBrandsPagination(current_page).then((data:any) => {
            
            product_brands_list.value =  data.data.data.data
          
        })
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
const searchProductBrands = async()=>{
        await shopBrandsStore.searchProductBrands(searchParams.value).then((data)=>{
            product_brands_list.value = data.data.data.data
        })
    }
 
 </script>