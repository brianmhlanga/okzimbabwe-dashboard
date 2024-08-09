<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Adverts</div>
                    <div class="card p-4 ml-3  ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create Advert" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                             <DataTable :value="advert_list" tableStyle="min-width: 50rem">
                                 <template #header>
                                     <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                         <span class="text-xl text-900 font-bold">Adverts</span>
                                     </div>
                                 </template>
                                 <Column field="name" header="Advert name">
                                     <template #body="slotProps">
                                         {{slotProps.data.name}}
                                     </template>
                                 </Column>
                                 <Column header="Type">
                                     <template #body="slotProps">
                                         {{slotProps.data.type}}
                                     </template>
                                 </Column> 
                                 <Column header="Display Position">
                                     <template #body="slotProps">
                                         {{slotProps.data.display_position}}
                                     </template>
                                 </Column> 
                                 <Column header="Start Date">
                                     <template #body="slotProps">
                                         {{slotProps.data.start_date}}
                                     </template>
                                 </Column> 
                                 <Column header="End Date">
                                     <template #body="slotProps">
                                         {{slotProps.data.end_date}}
                                     </template>
                                 </Column>          
                                 <Column header="Actions">
                                     <template #body="slotProps">
                                         <Button  icon="pi pi-pencil" severity="info" @click="shopBrandModal(slotProps.data)" text rounded aria-label="Cancel" />
                                         <Button  icon="pi pi-trash" severity="danger" @click="deleteShopBrand(slotProps.data.id)" text rounded aria-label="Cancel" />
                                     </template>
                                 </Column>
                                 
                             </DataTable>
                            </div>
                           </div>                    
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Advert" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Advert name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Display Position</label> 
                        <input class="form-control" type="text"  v-model="display_position">
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Shop Brand ID  </label> 
                        <Dropdown v-model="shop_brand_id" :options="shop_brand_list" optionLabel="name" optionValue="id" placeholder="Select  shop" checkmark :highlightOnSelect="false"  />
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Product ID </label> 
                        <Dropdown v-model="product_id" :options="categories_list" optionLabel="name" optionValue="id" placeholder="Select  product" checkmark :highlightOnSelect="false"  />
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Category ID </label> 
                        <Dropdown v-model="category_id" :options="allCategories" optionLabel="name" optionValue="id" placeholder="Select  category" checkmark :highlightOnSelect="false"  />
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Description</label> 
                        <input class="form-control" type="text"  v-model="description">
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Redirect  Url</label> 
                        <input class="form-control" type="text"  v-model="redirect">
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Adverts Banner/Image</label> 
                        <input type="file" accept="image/jpeg, image/png ,image/jpg" @change="handleFileChange">
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Advert Duration</label> 
                        <Dropdown v-model="type" :options="option1"  checkmark :highlightOnSelect="false"  />
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
                <Button  @click="createShopBrand()" label="Create Advert" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="open_shop_brand_modal" maximizable modal header="Create Shop Brand" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Shop brand name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Shop brand logo</label> 
                        <input type="file" accept="image/jpeg, image/png" @change="handleFileChange">
                    </div>
                </div>
                <Button :loading="loading" @click="updateShopBrand()" label="Create shop brand" icon="pi pi-plus" />
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
 const display_position = ref()
 const shop_brand_id = ref()
 const product_id = ref()
 const category_id = ref()
 const description = ref()
 const redirect = ref()
 const logo = ref()
 const type = ref()
 const start_date = ref()
 const end_date = ref()
 const loading = ref(false)
 const open_shop_brand_modal = ref(false)
 const toast = useToast()
 const advert_list = ref([])
 const shop_brand_list = ref()
 const shop_id = ref()
 const option1 = ['timed','open-ended']
 const parentCategories = storeToRefs(shopBrandsStore).parentCategories
     console.log('vbhjnk',parentCategories.value)
     const allCategories = storeToRefs(shopBrandsStore).allCategories
 const addLineItem = ref(false)
 const categories_list:any = ref([])
 const logoFile = ref()
 onMounted(async () => {
   let my_result = await shopBrandsStore.getAllAdverts().then((data:any)=>{
        console.log('my adverts',data.data.data.adverts)
        advert_list.value = data.data.data.adverts
    })
     let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
         shop_brand_list.value = data.data.data.data.shopbrands
     })
     shopBrandsStore.fetchAllCategories().then((data:any)=>{
        
            console.log('rury',allCategories.value)
        })
  
    shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
 });
 const handleFileChange = (event:any) => {
 const file = event.target.files[0];
 const acceptedTypes = ['image/jpeg', 'image/png','image/jpg'];
 if (file && acceptedTypes.includes(file.type)) {
     logoFile.value = file;
 } else {
     toast.add({ severity: 'info', summary: 'Wrong File Type', detail: 'Upload PNG or JPEG', life: 3000 });
     logoFile.value = null;
 }
 };
 function formatDate(date:any) {
    let my_date = new Date(date)
    let year = my_date.getFullYear();
    let month = String(my_date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(my_date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
 const createShopBrand = async () => {
     loading.value = true
   
     const url = `${SHOPIFY_URL}/api/adverts`;
     const formData = new FormData();
     formData.append('name', name.value);
     formData.append('display_position', display_position.value)
     formData.append('shop_brand_id', shop_brand_id.value)
     formData.append('product_id', product_id.value)
     formData.append('category_id', category_id.value)
     formData.append('description', description.value)
     formData.append('redirect', redirect.value)
     formData.append('type', type.value)
     formData.append('start_date',formatDate(start_date.value))
     formData.append('end_date',formatDate(end_date.value))
     if (logoFile.value) {
     formData.append('file', logoFile.value, logoFile.value.name);
     }
     console.log('formdata',formData)
     try {
     const response = await axios.post(url, formData, {
         headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': '*/*'
         },
     });
     toast.add({ severity: 'success', summary: 'Success', detail: 'Advert Created Successfully', life: 3000 });
     loading.value = false
     addLineItem.value = false
     
     } catch (error:any) {
     loading.value = false
     toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error.response.data, life: 3000 });
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
 
 
 
 </script>