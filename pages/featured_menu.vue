<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Featured Menus</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="open_create_shop_modal()" label="Featured Menus" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                            <div class="field mb-4 col-12 md:col-6">
                                <TabMenu :model="shop_brand_list">
                                    <template #item="{ item, props }">
                                        <a v-ripple v-bind="props.action" class="flex align-items-center gap-2"  @click='selectShop(item.id)'>
                                            <img  :src="`${item.logo}`" style="width: 32px" />
                                            <span class="font-bold">{{ item.name }}</span>
                                           
                                        </a>
                                    </template>
                                </TabMenu>
                                <Toast />
                            </div>
                            <div v-if="branches" class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="branches" ref="dt" class="p-datatable-customers" showGridlines :rows="10"
                                           dataKey="id" v-model:filters="filters" filterDisplay="menu" :loading="loading" responsiveLayout="scroll">
                                    <template #header>
                                        <div class="flex justify-content-between">
                                           
                                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()" />
                                            <Button icon="pi pi-external-link" label="Table Export" @click="exportCSV($event)" />
                                            <IconField iconPosition="left">
                                                <InputIcon class="pi pi-search"></InputIcon>
                                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                                            </IconField>
                                        </div>
                                    </template>
                                    <template #empty>
                                        No Featured Menus found.
                                    </template>
                                    <template #loading>
                                        Loading categories data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Category/Product Brand name " style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.referenceable.name }}
                                        </template>
                                    </Column>
                                
                                   
                                   
                                   
                                    
                                    
                                    <Column frozen field="created_at" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data?.created_at ? formatDate(data?.created_at) : "NOT SET" }}
                                        </template>
                                    </Column>
                                    <Column frozen  field="created_at" header="Actions" style="min-width:12rem">
                                        <template #body="{data}">
                                            <Button  icon="pi pi-pencil" severity="info"  text rounded aria-label="Cancel" />
                                        <Button  icon="pi pi-trash" severity="danger"  text rounded aria-label="Cancel" />
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add Featured Menu" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                
                <div  class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Shop Brand </label> 
                    <Dropdown v-model="shop_brand_id" :options="shop_brand_list" optionLabel="name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">What do you want to feature</label> 
                        <SelectButton v-model="selected_reference_type" :options="options"  aria-labelledby="basic" />
                    </div>
                <div v-if="selected_reference_type == 'Category'" class="field mb-4 col-12 md:col-6"> 
                    <Dropdown v-model="referenced_id" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select  category" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ allCategories.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                <div v-else-if="selected_reference_type == 'Product Brand'"class="field mb-4 col-12 md:col-6"> 
                    <Dropdown v-model="referenced_id" :options="product_brands" filter optionLabel="name" optionValue="id" placeholder="Select Product Brand" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ product_brands.find(brand => brand.id === slotProps.value)?.name }}</div>
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
            </div>
            <div v-if="editing_shop"><Button @click="updateShop()" label="Update Shop" icon="pi pi-plus" /></div>
            <div v-else-if="shop_creating"><Button :loading="loading"  @click="addFeaturedProduct()" label="Save Featured Menu" icon="pi pi-plus" /></div>
            
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
 import axios from "axios";
 import { SHOPIFY_URL } from "~/services/global.variables";
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopBrandsStore } from '~/stores/shopBrands';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm()
const shopBrandsStore = useShopBrandsStore();
const { parentCategories } = storeToRefs(shopBrandsStore);
const toast = useToast()

const shop_brand_id = ref();
const name = ref();
const address = ref(); 
const shop_brand_list = ref();
const city = ref();
const store_code = ref();
const products = storeToRefs(shopBrandsStore).products
const contact_person = ref();
const selected_reference_type = ref()
const shops_list:any = ref([])
const contact_number = ref();
const contact_email = ref();
const loading = ref(false)
const shop_creating = ref(false)
const product_brands = storeToRefs(shopBrandsStore).product_brands
const categories_list = ref([]);
const editing_shop = ref(false)
const shop_id = ref()
const branches = ref()
const product_brands_list:any = ref()
const referenced_id = ref()
const product_id = ref()
const is_brand:any = ref()
const allCategories = storeToRefs(shopBrandsStore).allCategories

const is_shop_brand = ref()
const number_of_categories = ref();
const addLineItem = ref(false);
definePageMeta({
        middleware: ["auth"]
});

const options = ref(['Category', 'Product Brand']);
const items = ref([
    
]);
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
const actions = (shop_data:any) => [
      {
        label: 'Update Shop',
        command: () => showShop(shop_data)
      },
      {
        label: 'Delete Shop',
        command: () => deleteShop(shop_data)
      },
      
      // Add more actions if needed
    ];
    const deleteShop = (shop_data:any) => {
      let data = {
        "id": shop_data.data.id
      }
      console.log('my data',data.id)
      
      confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async() => {
            let result = await shopBrandsStore.deleteShop(data)
            if (result.data.success){
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        
    });
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
const showShop = async(shop_data:any) => {
     shop_id.value = shop_data.data.id
      name.value = shop_data.data.name
       shop_brand_id.value = shop_data.data.name,
    
        address.value = shop_data.data.address,
        city.value = shop_data.data.city,
        store_code.value = shop_data.data.store_code,
        contact_person.value = shop_data.data.contact_person,
        contact_number.value = shop_data.data.contact_number,
        contact_email.value = shop_data.data.contact_email
      editing_shop.value = true
      addLineItem.value = true
     
}

const updateShop = async () => {
    const data = {
        id: shop_id.value,
        shop_brand_id: shop_brand_id.value,
        name: name.value,
        address: address.value,
        city: city.value,
        store_code: store_code.value,
        contact_person: contact_person.value,
        contact_number: contact_number.value,
        contact_email: contact_email.value,
    };
    const result = await shopBrandsStore.updateShop(data);
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Shop Successfully Updated', life: 3000 });
        const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        
    });
    addLineItem.value = false;
    editing_shop.value = false
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Updating Failed', life: 3000 });
    }
};
const selectShop = async (shopIDD:any) => {
  
 console.log(',y id',shopIDD)
  await getShopsForBrand(shopIDD)
  
}
const getShopsForBrand = async(brandId:any) => {
  console.log('brandid',brandId)
  branches.value = null
  //@ts-ignore
  let result:any = await shopBrandsStore.getFeaturedMenus(brandId)
 
 
  branches.value = result.data.data
}
const open_create_shop_modal = ()=>{
    addLineItem.value = true
    shop_creating.value= true
}
onMounted(async () => {
    await shopBrandsStore.get_product_brands().then((data:any) => {
        product_brands_list.value = data.data.data.data;
        console.log('dfg',product_brands_list.value)
    });
    shopBrandsStore.fetchAllProductBrands()
    const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        
    });
    await shopBrandsStore.fetchAllCategories().then((data:any)=>{
            allCategories.value.push(...data.data.categories)
        })
   
    await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
    await shopBrandsStore.fetchAllProducts()
    await shopBrandsStore.getAllShops().then((data:any) => {
        shops_list.value = data.data.data.shops
        console.log('my shops',shops_list.value)
    });
    await shopBrandsStore.fetchAllCategories().then((data:any) => {
        allCategories.value.push(...data.data.categories);
    });
});

const addFeaturedProduct = async () => {
    if(selected_reference_type.value == 'Product Brand'){
        is_brand.value = true
    }
    else{
        is_brand.value = false
    }
    loading.value = true
   
    const url = `${SHOPIFY_URL}/api/featured-menus`;
    const formData = new FormData();
      formData.append('shop_brand_id', shop_brand_id.value);
      formData.append('referenced_id', referenced_id.value);
      formData.append('is_brand', is_brand.value);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
          },
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Featured Menu Created Successfully', life: 3000 });
        loading.value = false
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
        loading.value = false
      }
     
  

};

const onPage = async (event: any) => {
    const current_page = event.page + 1;
    const result = await shopBrandsStore.getCategoriesPagination(current_page).then((data:any) => {
        categories_list.value = data.data.data.categories;
        number_of_categories.value = data.data.data.categories.length;
    });
};



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

<style>
/* Add your styles here */
</style>
