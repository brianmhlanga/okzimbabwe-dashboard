<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Inventory</div>
                   <div> <div class="card p-4">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Inventory" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                            <div class="field mb-4 col-12 md:col-6">
                                <TabMenu :model="shop_brand_list">
                                    <template #item="{ item, props }">
                                        <a v-ripple v-bind="props.action" class="flex align-items-center gap-2" @click="selectShop(item.id)">
                                            <img  :src="`${item.logo}`" style="width: 32px" />
                                            <span class="font-bold">{{ item.name }}</span>
                                        </a>
                                    </template>
                                </TabMenu>
                                <Toast />
                            </div>
                            <div v-if="branches" class="field mb-4 col-6 md:col-6"> 
                                <label for="company_name" class="font-medium text-900"> Select Shop </label> 
                                <Dropdown v-model="id" :options="branches" optionLabel="name" optionValue="id" placeholder="Select shop" checkmark :highlightOnSelect="false" />
                            </div>
                            <div v-if="id" class="field mb-4 col-12 md:col-6">
                                <Button @click="getShopInventory()" label="Get Inventory" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
               
                            
                            <div v-if="inventory_list" class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="inventory_list" ref="dt" class="p-datatable-customers" showGridlines :rows="10"
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
                                        No products  found.
                                    </template>
                                    <template #loading>
                                        Loading products data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Product name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.product ? data.product.name : 'Not Set' }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="description" header="Product Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.product ? data.product.product_code : 'Not Set' }}
                                        </template>
                                    </Column>
                                    <Column frozen field="description" header="Store Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{  data.store_code}}
                                        </template>
                                    </Column>
                                    <Column frozen field="description" header="Quantity" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.quantity}}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Availability " style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.availability}}
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
                            </div> 
                        </div>                    
                    </div></div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add Inventory" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900"> Select Product </label> 
                  
                    <Dropdown v-model="product_id" :options="products" filter optionLabel="name" optionValue="id" placeholder="Select  product" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                
                                    <div>{{ products.find(brand => brand.id === slotProps.value)?.name }}</div>
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
                    <label for="company_name" class="font-medium text-900">Select Shop </label> 
                    <MultiSelect v-model="shop_id" :options="all_shops" filter optionLabel="name" optionValue="id" placeholder="Select Shop"
            :maxSelectedLabels="10"  />
                   
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
const products = storeToRefs(shopBrandsStore).products;
const toast = useToast()
const allCategories:any = ref([]);
const all_products = ref([]);
const all_shops:any = ref([])
const shop_brand_id = ref();
const inventory_list:any = ref()
const id:any = ref()
const name = ref();
const address = ref();
const shop_brand_list:any = ref();
const product_id = ref()
const shop_id = ref()
const quantity = ref()
const branches = ref()
const categories_list = ref([]);
const number_of_categories = ref();
const addLineItem = ref(false);
const options = ref(['Yes', 'No']);
definePageMeta({
        middleware: ["auth"]
});
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
const selectShop = async (shopIDD:any) => {
  
  console.log(',y id',shopIDD)
   await getShopsForBrand(shopIDD)
   
 }
 const getShopsForBrand = (brandId:any) => {
   branches.value = null
   //@ts-ignore
   let branchess = shop_brand_list.value.find(brand => brand.id === brandId);
   branches.value = branchess?.shops
   console.log('branches',branchess)
 }

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
        items.value = shop_brand_list.value.map((brand:any) => ({
        label: `${brand.name}`,  // Customize label as needed
        icon: `${brand.image}`,
            command: () => {
                toast.add({ severity: 'success', summary: 'Selected', detail: `${brand.name}`, life: 3000 });
            }
        }));
    });
   
    await shopBrandsStore.fetchAllProducts()
});

const createInventory = async () => {
    const data = {
        product_id : product_id.value,
        shop_id :shop_id.value,
        quantity : quantity.value
        
    }
    const result = await shopBrandsStore.createInventory(data);
    console.log('result',result.data.success)

    if (result.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Inventory Successfully Created', life: 3000 });
        addLineItem.value = false;
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
    }
};

const onPage = async (event: any) => {
    const current_page = event.page + 1;
    const result = await shopBrandsStore.getCategoriesPagination(current_page).then((data:any) => {
        categories_list.value = data.data.data.categories;
        number_of_categories.value = data.data.data.categories.length;
    });
};

const getShopInventory = async ()=> {
    await shopBrandsStore.getInventory(id.value).then((data:any) => {
        inventory_list.value = data.data.data.products;
        console.log(inventory_list.value)
    });  
}



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
