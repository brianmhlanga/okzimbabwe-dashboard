<template>
   <NuxtLayout name="dashboard">
      <section class="section">
           <div class="container-fluid pt-3">
               <div class="row">
                   <div class="text-900 font-medium text-xl mb-3">Shop Brands</div>
                   <div class="card p-4 ml-3  ">
                       <div class="grid formgrid p-fluid">
                           <div class="field mb-4 col-12 md:col-6">
                               <Button @click="addLineItem = true" label="Create Shop Brand" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                           </div>
                           <div class="field mb-4 col-12 md:col-12"> 
                            <DataTable :value="shop_brand_list" tableStyle="min-width: 50rem">
                                <template #header>
                                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                        <span class="text-xl text-900 font-bold">Shop brands</span>
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
                           </div>
                          </div>                    
                   </div>
               </div>
           </div>
       </section>
       <Dialog v-model:visible="addLineItem" maximizable modal header="Create Shop Brand" position="top" :style="{ width: '55vw' }">
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
               <Button :loading="loading" @click="createShopBrand()" label="Create shop brand" icon="pi pi-plus" />
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
const logo = ref()
const loading = ref(false)
const open_shop_brand_modal = ref(false)
const toast = useToast()
const shop_brand_list = ref()
const shop_id = ref()
const addLineItem = ref(false)
const logoFile = ref()
onMounted(async () => {
    let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
        shop_brand_list.value = data.data.data.data.shopbrands
    })
});
const handleFileChange = (event:any) => {
const file = event.target.files[0];
const acceptedTypes = ['image/jpeg', 'image/png'];
if (file && acceptedTypes.includes(file.type)) {
    logoFile.value = file;
} else {
    toast.add({ severity: 'info', summary: 'Wrong File Type', detail: 'Upload PNG or JPEG', life: 3000 });
    logoFile.value = null;
}
};
const createShopBrand = async () => {
    loading.value = true
    const url = `${SHOPIFY_URL}/api/shop-brands`;
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