<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Default Currency</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                           
                            <div class="field mb-4 col-12 md:col-3">
                                <Button @click="navigateTo('/currency_dashboard')" label="Currencies Home" icon="pi pi-arrow-left" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                        <div  class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Shop Brand </label> 
                    <Dropdown @change="getShopCurrencies()" v-model="shop_brand_id" :options="shop_brand_list" optionLabel="name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
                    <small>Select Shop Brand to view its assigned currencies</small>
                </div>
                <div class="border-right-1 col-12 md:col-6 surface-border" style="width: 1px; height: 50%;"></div>
                <div v-if="shop_curriences" class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Currency</label> 
                    <Dropdown v-model="shop_currency_id" :options="shop_curriences" optionLabel="currency.name" optionValue="id" placeholder="Select Currency" checkmark :highlightOnSelect="false" />
                    <small>Select Currency that you want to make default currency</small>
                </div>
                <div class="field mb-4 col-12 md:col-6" v-if="shop_curriences"><Button :disabled="!shop_currency_id || !shop_brand_id" :loading="loading1" @click="create_default_currency()" label="Set Default Currency" icon="pi pi-plus" /></div>
                        </div>                    
                    </div>
                    </div>
                </div>
            </div>
        </section>
        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useShopBrandsStore } from '~/stores/shopBrands';
const shopBrandsStore = useShopBrandsStore();
const toast = useToast()
const allCategories:any = ref([]);
const shop_brand_id = ref();
const shop_currency_id = ref()
const shop_brand_list = ref();
const shops_list:any = ref([])
const categories_list = ref([]);
const shop_brand = ref()
const shop_curriences = ref()
const loading = ref(false)
const loading1 = ref(false)
const number_of_categories = ref();
const addLineItem = ref(false);
definePageMeta({
        middleware: ["auth"]
});




onMounted(async () => {
    const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        
    });
    await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
    
    await shopBrandsStore.getAllShops().then((data:any) => {
        shops_list.value = data.data.data.shops
        console.log('my shops',shops_list.value)
    });
    await shopBrandsStore.fetchAllCategories().then((data:any) => {
        allCategories.value.push(...data.data.categories);
    });
});

const getShopCurrencies = async () => {
   
      loading.value = true
    
    console.log('is shop brand',shop_brand.value)
    const result:any = await shopBrandsStore.get_shop_currencies(shop_brand_id.value);
   
    console.log('ddb',result.data.data.currencies)
    shop_curriences.value = result.data.data.currencies
    console.log('shop',shop_curriences.value)

    if (result.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Featured Product Successfully Added', life: 3000 });
        addLineItem.value = false;
        loading.value = false
       
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false
    }
};
const create_default_currency = async () => {
   loading1.value = true
    const data = {
        shop_currency_id: shop_currency_id.value
    }
   const result:any = await shopBrandsStore.shop_default_currency(data);
  
   

   if (result.success) {
       toast.add({ severity: 'success', summary: 'Success', detail: 'Default Currency Successfully Added', life: 3000 });
       addLineItem.value = false;
       loading1.value = false
      
   } else {
       toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
       loading1.value = false
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
    const options:any = {
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
