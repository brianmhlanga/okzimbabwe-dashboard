<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Discounts</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add New Discount" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                             <div class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="discount_list" ref="dt" class="p-datatable-customers" showGridlines :rows="10"
                                           dataKey="id" v-model:filters="filters" filterDisplay="menu"  responsiveLayout="scroll">
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
                                        No discounts found.
                                    </template>
                                    <template #loading>
                                        Loading discounts data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.name }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="description" header="Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.code }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Value" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.value }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Discount Type" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.discount_type.name }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="created_at" header="Starts At" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data?.starts_at ? formatDate(data?.starts_at) : "NOT SET" }}
                                        </template>
                                    </Column>
                                    <Column frozen field="created_at" header="Expires At" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data?.expires_at ? formatDate(data?.expires_at) : "NOT SET" }}
                                        </template>
                                    </Column>
                                    <Column frozen  field="created_at" header="Actions" style="min-width:12rem">
                                        <template #body="{data}">
                                            <SplitButton label="Actions" :model="actions({data})"  />
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add New Discount" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Discount name</label> 
                    <InputText class="form-control" type="text" v-model="name" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Discount code</label> 
                    <InputText class="form-control" type="text" v-model="code" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Influencer</label> 
                    <Dropdown v-model="influencer_id" :options="influencer_list" filter optionLabel="name" optionValue="id" placeholder="Select Influencer" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ influencer_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Select Product</label> 
                    <Dropdown v-model="product_id" :options="product_list" filter optionLabel="name" optionValue="id" placeholder="Select product" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ product_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Discount Type </label> 
                    <Dropdown v-model="discount_type_id" :options="discount_type_list" filter optionLabel="name" optionValue="id" placeholder="Select discount type" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ discount_type_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Select Shop Brand</label> 
                    <Dropdown v-model="shop_id" :options="shop_brand_list" filter optionLabel="name" optionValue="id" placeholder="Select Shop Brand" >
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
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Category</label> 
                    <Dropdown v-model="category_id" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select  category" >
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
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Product Brand</label> 
                    <Dropdown v-model="product_brand_id" :options="product_brands_list" filter optionLabel="name" optionValue="id" placeholder="Select product brand" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ product_brands_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Value</label> 
                    <InputText class="form-control" type="text" v-model="value" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Start Date</label> 
                    <Calendar v-model="starts_at" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Expiry Date</label> 
                    <Calendar v-model="expires_at" />
                </div>
                
            </div>
            <Button :loading="loading" @click="addCurrency()" label="Add Discount" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="update_visibility" maximizable modal header="Update Discount" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Discount name</label> 
                    <InputText class="form-control" type="text" v-model="name" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Discount code</label> 
                    <InputText class="form-control" type="text" v-model="code" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Influencer</label> 
                    <Dropdown v-model="influencer_id" :options="influencer_list" filter optionLabel="name" optionValue="id" placeholder="Select Influencer" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ influencer_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Select Product</label> 
                    <Dropdown v-model="product_id" :options="product_list" filter optionLabel="name" optionValue="id" placeholder="Select product" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ product_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Discount Type </label> 
                    <Dropdown v-model="discount_type_id" :options="discount_type_list" filter optionLabel="name" optionValue="id" placeholder="Select discount type" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ discount_type_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Select Shop Brand</label> 
                    <Dropdown v-model="shop_id" :options="shop_brand_list" filter optionLabel="name" optionValue="id" placeholder="Select Shop Brand" >
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
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Category</label> 
                    <Dropdown v-model="category_id" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select  category" >
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
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Product Brand</label> 
                    <Dropdown v-model="product_brand_id" :options="product_brands_list" filter optionLabel="name" optionValue="id" placeholder="Select product brand" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ product_brands_list.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Value</label> 
                    <InputText class="form-control" type="text" v-model="value" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Start Date</label> 
                    <Calendar v-model="starts_at" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Expiry Date</label> 
                    <Calendar v-model="expires_at" />
                </div>
                
            </div>
            <Button :loading="loading" @click="editCurrency()" label="Update Discount" icon="pi pi-plus" />
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
     
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopBrandsStore } from '~/stores/shopBrands';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import Product_brands from './product_brands.vue';
const confirm = useConfirm();
const shopBrandsStore = useShopBrandsStore();
const allCategories = storeToRefs(shopBrandsStore).allCategories;
const toast = useToast()
const loading = ref(false);

const all_products = ref([]);
const all_currencies = ref([])
const all_shops = ref([])
const code = ref();
const id = ref()
const name = ref();
const influencer_id = ref()
const discount_type_id = ref()
const shop_id = ref()
const category_id = ref()
const product_brand_id = ref()
const value = ref()
const starts_at = ref()
const expires_at = ref()
const address = ref();
const influencer_list = ref()
const product_list = ref()
const shop_brand_list = ref();
const product_id = ref()
const symbol = ref()
const product_brands_list = ref()
const discount_type_list = ref()
const currency_id = ref()
const quantity = ref()
const discount_list = ref()
const update_visibility = ref(false)
const categories_list = ref([]);
const number_of_categories = ref();
const addLineItem = ref(false);
const options = ref(['Yes', 'No']);
definePageMeta({
        middleware: ["auth"]
});
const actions = (currency:any) => [
      {
        label: 'Update Discount',
        command: () => showCurrency(currency)
      },
      {
        label: 'Delete Discount',
        command: () => deleteCurrency(currency)
      },
      
      // Add more actions if needed
    ];
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

onMounted(async () => {
   
    const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
       
    });
    await shopBrandsStore.getAllCategories().then((data:any) => {
        categories_list.value = data.data.data.categories;
    });
    await shopBrandsStore.getAllProducts().then((data:any) => {
        product_list.value = data.data.data.products;
    });
    await shopBrandsStore.getInfluencers().then((data:any) => {
        influencer_list.value = data.data.data.data;
    });
    await shopBrandsStore.get_all_discount_types().then((data:any) => {
        discount_type_list.value = data.data.data.discounts;
    });
    await shopBrandsStore.get_product_brands().then((data:any) => {
        product_brands_list.value = data.data.data.data;
    });
    await shopBrandsStore.getAllDiscounts().then((data:any) => {
        discount_list.value = data.data.data.discounts;
    });
    
    
    await shopBrandsStore.fetchAllCategories().then((data:any) => {
        
    });
});

const refresh_data = ()=>{
    
       name.value = '',
       code.value = '',
       influencer_id.value = '',
       discount_type_id.value = '',
       product_id.value = '',
       shop_id.value = '',
       category_id.value = '',
       product_brand_id.value = '',
       value.value = '',
       starts_at.value = '',
       expires_at.value = ''
    }


const deleteCurrency = (currency:any) => {
      let data = {
        "id": currency.data.id
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
            let result = await shopBrandsStore.deleteDiscount(data)
            if (result.data.success){
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            await shopBrandsStore.getAllDiscounts().then((data:any) => {
        discount_list.value = data.data.data.discounts;
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
const showCurrency = async(currency:any) => {
      console.log('data ghj',currency.data.name)
    update_visibility.value = true
    id.value = currency.data.id
    name.value = currency.data.name,
    code.value = currency.data.code,
    influencer_id.value = currency.data.influencer_id,
    discount_type_id.value = currency.data.discount_type_id,
    product_id.value = currency.data.product_id,
    shop_id.value = currency.data.shop_id,
    category_id.value = currency.data.category_id,
    product_brand_id.value = currency.data.product_brand_id,
    value.value = currency.data.value,
    starts_at.value = currency.data.starts_at,
    expires_at.value = currency.data.expires_at
     console.log('simba')
}
const editCurrency = async () => {
    console.log('simbilimbi', )
    loading.value = true;
    const data = {
       id: id.value,
       name: name.value,
       code: code.value,
       influencer_id: influencer_id.value,
       discount_type_id: discount_type_id.value,
       product_id: product_id.value,
       shop_id: shop_id.value,
       category_id: category_id.value,
       product_brand_id: product_brand_id.value,
       value: value.value,
       starts_at: formatToYmdHis(starts_at.value),
       expires_at: formatToYmdHis(expires_at.value)
    }
    console.log('simbilimbi', data)
    const result = await shopBrandsStore.updateDiscount(data)
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Discount Successfully Updated', life: 3000 });
        loading.value = false;
        await shopBrandsStore.getAllDiscounts().then((data:any) => {
        discount_list.value = data.data.data.discounts;
    });
    
        refresh_data()
        update_visibility.value = false;
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false;
    }

};

function formatToYmdHis(isoDateString:any) {
    const date = new Date(isoDateString);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
}
 
const addCurrency = async () => {
    loading.value = true;
    const data = {
       name: name.value,
       code: code.value,
       influencer_id: influencer_id.value,
       discount_type_id: discount_type_id.value,
       product_id: product_id.value,
       shop_id: shop_id.value,
       category_id: category_id.value,
       product_brand_id: product_brand_id.value,
       value: value.value,
       starts_at: formatToYmdHis(starts_at.value),
       expires_at: formatToYmdHis(expires_at.value)
    }
    const result = await shopBrandsStore.addDiscount(data);
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Discount Successfully Added', life: 3000 });
        loading.value = false;
        await shopBrandsStore.getAllDiscounts().then((data:any) => {
        discount_list.value = data.data.data.discounts;
    });
    
        addLineItem.value = false;
        refresh_data()
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false;
    }

};

const onPage = async (event: any) => {
    const current_page = event.page + 1;
    const result = await shopBrandsStore.getCategoriesPagination(current_page).then((data) => {
        categories_list.value = data.data.data.categories;
        number_of_categories.value = data.data.data.categories.length;
    });
};


function format_date(date:any) {
    let my_date = new Date(date)
    let year = my_date.getFullYear();
    let month = String(my_date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(my_date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

<style>
/* Add your styles here */
</style>
