<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Adverts</div>
                    <div>
                        <div class="card p-4   ">
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
                                         <Button  icon="pi pi-trash" severity="danger" @click="deleteAdvert(slotProps.data.id)" text rounded aria-label="Cancel" />
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
                <Button  :loading="loading" @click="createAdvert()" label="Create Advert" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="open_shop_brand_modal" maximizable modal header="Update Advert" position="top" :style="{ width: '55vw' }">
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
                        <input type="file" accept=".png, .jpg, .jpeg, .svg"  @change="handleFileChange">
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
                <Button :loading="loading" @click="update_advert()" label="Update Advert" icon="pi pi-plus" />
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
 import { SHOPIFY_URL } from "~/services/global.variables";
 import { useShopBrandsStore } from "~/stores/shopBrands";
 import { useConfirm } from "primevue/useconfirm";
 definePageMeta({
        middleware: ["auth"]
});
 const confirm = useConfirm();
 const shopBrandsStore = useShopBrandsStore()
 const name = ref()
 const display_position = ref()
 const shop_brand_id = ref()
 const product_id = ref()
 const category_id = ref()
 const description = ref()
 const id = ref()
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
     })
  
    shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
 });

 const handleFileChange = (event:any) => {
const file = event.target.files[0];
const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
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
const createAdvert = async () => {
  loading.value = true;

  const url = `${SHOPIFY_URL}/api/adverts`;
  const formData = new FormData();
  
  // Append only if the value exists
  if (name.value) {
    formData.append('name', name.value);
  }
  if (display_position.value) {
    formData.append('display_position', display_position.value);
  }
  if (shop_brand_id.value) {
    formData.append('shop_brand_id', shop_brand_id.value);
  }
  if (product_id.value) {
    formData.append('product_id', product_id.value);
  }
  if (category_id.value) {
    formData.append('category_id', category_id.value);
  }
  if (description.value) {
    formData.append('description', description.value);
  }
  if (redirect.value) {
    formData.append('redirect_url', redirect.value);
  }
  if (type.value) {
    formData.append('type', type.value);
  }
  if (start_date.value) {
    formData.append('start_date', formatDate(start_date.value));
  }
  if (end_date.value) {
    formData.append('end_date', formatDate(end_date.value));
  }
  
  if (logoFile.value) {
    formData.append('file', logoFile.value, logoFile.value.name);
   }

  console.log('formdata', formData);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      },
    });
    toast.add({ severity: 'success', summary: 'Success', detail: 'Advert Created Successfully', life: 3000 });
    
    await shopBrandsStore.getAllAdverts().then((data) => {
    //@ts-ignore
      advert_list.value = data.data.data.adverts;
    });
    
    refresh_data();
    loading.value = false;
    addLineItem.value = false;

  } catch (error:any) {
    loading.value = false;
    toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error.response.data, life: 3000 });
  }

  refresh_data();
};


 const update_advert = async ()=>{
    loading.value = true
   
   const url = `${SHOPIFY_URL}/api/adverts/${id.value}`;
   const formData = new FormData();
   formData.append('name', name.value);
   formData.append('display_position', display_position.value)
   formData.append('shop_brand_id', shop_brand_id.value)
   formData.append('product_id', product_id.value)
   formData.append('category_id', category_id.value)
   formData.append('description', description.value)
   formData.append('redirect_url', redirect.value)
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
   toast.add({ severity: 'success', summary: 'Success', detail: 'Advert  Successfully Updated', life: 3000 });
   refresh_data()
    await shopBrandsStore.getAllAdverts().then((data:any)=>{
      console.log('my adverts',data.data.data.adverts)
      advert_list.value = data.data.data.adverts
  })
  open_shop_brand_modal.value = false
   
   loading.value = false
   addLineItem.value = false
   
   } catch (error:any) {
   loading.value = false
   toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error.response.data, life: 3000 });
   }
   
 }

 const shopBrandModal = (data:any)=>{
     open_shop_brand_modal.value = true
     id.value = data.id
     shop_brand_id.value = data.shop_brand_id
     display_position.value = data.display_position
     description.value = data.description
     category_id.value = data.category_id
     product_id.value = data.product_id
     redirect.value = data.redirect_url
     type.value = data.type
     start_date.value = data.start_date
     end_date.value = data.end_date
     name.value = data.name
     console.log('my brand id',data)
 }
 
        
 const refresh_data = ()=>{
        name.value = ''
        description.value = ''
        category_id.value = "",
        shop_brand_id.value = "",
        product_id.value = "" 
        category_id.value = ''
        redirect.value = ''
        logoFile.value = ''
        start_date.value = ''
        end_date.value = ''
        type.value = ''
        display_position.value = ''

    }


 
 const deleteAdvert= (advert_id:any) => {
     console.log('shop_id',shop_brand_id)
     let data = {
     "id": advert_id
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
        loading.value = true
         let result = await shopBrandsStore.deleteAdvert(data)
         if (result.data.success){
        loading.value = false
         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
         await shopBrandsStore.getAllAdverts().then((data:any)=>{
            console.log('my adverts',data.data.data.adverts)
            advert_list.value = data.data.data.adverts
        })
         }
         else{
            loading.value = false
             toast.add({ severity: 'warn', summary: 'Failed', detail: 'Deletion Failed', life: 3000 });
         }
     },
     reject: () => {
         toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
     } 
 });
 }
 
 
 
 </script>