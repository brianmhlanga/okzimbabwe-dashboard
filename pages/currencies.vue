<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Currencies</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                            <div class="flex">
                            <div class="field mb-4 col-12 md:col-3">
                                <Button @click="navigateTo('/currency_dashboard')" label="Currencies Home" icon="pi pi-arrow-left" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                            <div class="field mb-4 col-12 md:col-3">
                                <Button @click="addLineItem = true" label="Add Currency" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                            </div>
                            
                             <div class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="all_currencies" ref="dt" class="p-datatable-customers" showGridlines :rows="10"
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
                                        No categories found.
                                    </template>
                                    <template #loading>
                                        Loading categories data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Currency name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.name }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="description" header="Currency Iso Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.iso_code }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Currency Symbol" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.symbol }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="created_at" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data?.created_at ? formatDate(data?.created_at) : "NOT SET" }}
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
                            </div> -->
                        </div>                    
                    </div>
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add Currency" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Currency name</label> 
                    <InputText class="form-control" type="text" v-model="name" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Currency iso code</label> 
                    <InputText class="form-control" type="text" v-model="iso_code" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Currency symbol</label> 
                    <InputText class="form-control" type="text" v-model="symbol" />
                </div>
                
            </div>
            <Button :loading="loading" @click="addCurrency()" label="Add Currency" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="update_visibility" maximizable modal header="Update Currency" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Currency name</label> 
                    <InputText class="form-control" type="text" v-model="name" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Currency iso code</label> 
                    <InputText class="form-control" type="text" v-model="iso_code" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Currency symbol</label> 
                    <InputText class="form-control" type="text" v-model="symbol" />
                </div>
                
            </div>
            <Button :loading="loading" @click="editCurrency()" label="Update Currency" icon="pi pi-plus" />
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
const confirm = useConfirm();
const shopBrandsStore = useShopBrandsStore();
const { parentCategories } = storeToRefs(shopBrandsStore);
const toast = useToast()
const loading = ref(false);
const allCategories = ref([]);
const all_products = ref([]);
const all_currencies = ref([])
const all_shops = ref([])
const iso_code = ref();
const name = ref();
const address = ref();
const shop_brand_list = ref();
const product_id = ref()
const symbol = ref()
const token = useCookie('token')
const currency_id = ref()
const quantity = ref()
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
        label: 'Update Currency',
        command: () => showCurrency(currency)
      },
      {
        label: 'Delete Currency',
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
    await shopBrandsStore.getAllCurrencies().then((data:any)=>{
        console.log('currencies',data.data)
            all_currencies.value = data.data.data.currencies
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

const deleteCurrency = (currency:any) => {
      let data = {
        "id": currency.data.id,
        'token': token.value
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
            let result = await shopBrandsStore.deleteCurrency(data)
            if (result.data.success){
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            await shopBrandsStore.getAllCurrencies().then((data:any)=>{
            all_currencies.value = data.data.data.currencies
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
const showCurrency = async(currency:any) => {
      name.value = currency.data.name
      iso_code.value = currency.data.iso_code
      symbol.value = currency.data.symbol
      currency_id.value = currency.data.id
      update_visibility.value = true
     
}
const editCurrency = async () => {
    console.log('simbilimbi', )
    loading.value = true;
    const data = {
        id: currency_id.value,
        'token': token.value,
        name : name.value,
        iso_code :iso_code.value,
        symbol : symbol.value
        
    }
    console.log('simbilimbi', data)
    const result = await shopBrandsStore.updateCurrency(data)
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Currency Successfully Added', life: 3000 });
        loading.value = false;
        await shopBrandsStore.getAllCurrencies().then((data:any)=>{
            console.log('ss',data.data)
            all_currencies.value = data.data.data.currencies
        })
        update_visibility.value = false;
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false;
    }

};

 
const addCurrency = async () => {
    loading.value = true;
    const data = {
        name : name.value,
        'token': token.value,
        iso_code :iso_code.value,
        symbol : symbol.value
        
    }
    const result = await shopBrandsStore.addCurrency(data);
    console.log('result',result.data.success)

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Currency Successfully Added', life: 3000 });
        loading.value = false;
        await shopBrandsStore.getAllCurrencies().then((data:any)=>{
            all_currencies.value = data.data.data.currencies
        })
        addLineItem.value = false;
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
