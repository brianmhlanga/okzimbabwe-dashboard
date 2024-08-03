<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Inventory</div>
                    <div class="card p-4 ml-3 mr-10">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Inventory" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                            <div class="field mb-4 col-12 md:col-6">
                                <TabMenu :model="shop_brand_list">
                                    <template #item="{ item, props }">
                                        <a v-ripple v-bind="props.action" class="flex align-items-center gap-2">
                                            <img  :src="`${item.logo}`" style="width: 32px" />
                                            <span class="font-bold">{{ item.name }}</span>
                                        </a>
                                    </template>
                                </TabMenu>
                                <Toast />
                            </div>
                            
                            
                            <!-- <div class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="categories_list" ref="dt" class="p-datatable-customers" showGridlines :rows="10"
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
                                        No categories found.
                                    </template>
                                    <template #loading>
                                        Loading categories data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Category Name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.name }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="description" header="Category Type" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.is_parent ? 'Parent' : 'Child' }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Active Status" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.is_active ? 'Active' : 'Not Active' }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="created_at" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data?.created_at ? formatDate(data?.created_at) : "NOT SET" }}
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
                            </div> -->
                        </div>                    
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add Inventory" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900"> Select Product </label> 
                    <Dropdown v-model="product_id" :options="all_products" optionLabel="name" optionValue="id" placeholder="Select product" checkmark :highlightOnSelect="false" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Shop </label> 
                    <Dropdown v-model="shop_id" :options="all_shops" optionLabel="name" optionValue="id" placeholder="Select shop" checkmark :highlightOnSelect="false" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Quantity</label> 
                    <InputText class="form-control" type="text" v-model="quantity" />
                </div>
                
            </div>
            <Button @click="createInventory()" label="Add Inventory" icon="pi pi-plus" />
        </Dialog>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopBrandsStore } from '~/stores/shopBrands';
import { FilterMatchMode } from 'primevue/api';

const shopBrandsStore = useShopBrandsStore();
const { parentCategories } = storeToRefs(shopBrandsStore);
const toast = useToast()
const allCategories = ref([]);
const all_products = ref([]);
const all_shops = ref([])
const shop_brand_id = ref();
const name = ref();
const address = ref();
const shop_brand_list = ref();
const product_id = ref()
const shop_id = ref()
const quantity = ref()
const categories_list = ref([]);
const number_of_categories = ref();
const addLineItem = ref(false);
const options = ref(['Yes', 'No']);
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
    await shopBrandsStore.getAllProducts().then((data:any)=>{
            all_products.value = data.data.data.products
        })
    await shopBrandsStore.getAllShops().then((data:any)=>{
          console.log('my shops',data.data)
          all_shops.value = data.data.data.shops
    })
    const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        items.value = shop_brand_list.value.map((brand) => ({
        label: `${brand.name}`,  // Customize label as needed
        icon: `${brand.image}`,
            command: () => {
                toast.add({ severity: 'success', summary: 'Selected', detail: `${brand.name}`, life: 3000 });
            }
        }));
    });
    await shopBrandsStore.getAllCategories().then((data) => {
        categories_list.value = data.data.data.categories;
    });
    await shopBrandsStore.fetchAllCategories().then((data) => {
        allCategories.value.push(...data.data.categories);
    });
});

const createInventory = async () => {
    const data = {
        product_id : product_id.value,
        shop_id :shop_id.value,
        quantity : quantity.value
        
    }
    const result = await shopBrandsStore.createInventory(data);
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Shop Successfully Created', life: 3000 });
        addLineItem.value = false;
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
    }
};

const onPage = async (event: any) => {
    const current_page = event.page + 1;
    const result = await shopBrandsStore.getCategoriesPagination(current_page).then((data) => {
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
