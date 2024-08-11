<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Featured Products</div>
                    <div class="card p-4 ml-3 mr-10">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="open_create_shop_modal()" label="Featured Products" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
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
                                        No shops found.
                                    </template>
                                    <template #loading>
                                        Loading categories data. Please wait.
                                    </template>
                                    <Column frozen field="name" header="Shop Name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.name }}
                                        </template>
                                    </Column>
                                
                                    <Column frozen field="description" header="Store Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.store_code}}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Address" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.address }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Contact Person" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.contact_person }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Contact Number" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.contact_number }}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="Contact Email" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.contact_email}}
                                        </template>
                                    </Column>
                                    <Column frozen field="category.name" header="City" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.city }}
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
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add Featured Product" position="top" :style="{ width: '55vw' }">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Select either shop or shop brand to reference</label> 
                        <SelectButton v-model="selected_reference_type" :options="options"  aria-labelledby="basic" />
                    </div>
                <div v-if="selected_reference_type == 'Shop brand'" class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Shop Brand </label> 
                    <Dropdown v-model="referenced_id" :options="shop_brand_list" optionLabel="name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
                </div>
                <div v-else-if="selected_reference_type == 'Shop'" class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Shop </label> 
                    <Dropdown v-model="referenced_id" :options="shops_list" optionLabel="name" optionValue="id" placeholder="Select shop" checkmark :highlightOnSelect="false" />
                </div>
                <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Product </label> 
                    <Dropdown v-model="product_id" :options="products" optionLabel="name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
                </div>
               
               
               
            </div>
            <div v-if="editing_shop"><Button @click="updateShop()" label="Update Shop" icon="pi pi-plus" /></div>
            <div v-else-if="shop_creating"><Button @click="addFeaturedProduct()" label="Add Featured Product" icon="pi pi-plus" /></div>
            
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
const confirm = useConfirm()
const shopBrandsStore = useShopBrandsStore();
const { parentCategories } = storeToRefs(shopBrandsStore);
const toast = useToast()
const allCategories = ref([]);
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
const shop_creating = ref(false)
const categories_list = ref([]);
const editing_shop = ref(false)
const shop_id = ref()
const branches = ref()
const referenced_id = ref()
const product_id = ref()
const is_shop_brand = ref()
const number_of_categories = ref();
const addLineItem = ref(false);

const options = ref(['Shop brand', 'Shop']);
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
const getShopsForBrand = (brandId:any) => {
  branches.value = null
  //@ts-ignore
  let branchess = shop_brand_list.value.find(brand => brand.id === brandId);
  branches.value = branchess?.shops
  console.log('branches',branchess)
}
const open_create_shop_modal = ()=>{
    addLineItem.value = true
    shop_creating.value= true
}
onMounted(async () => {
    const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        
    });
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
    if(selected_reference_type.value == 'Shop brand'){
        is_shop_brand.value = true
    }
    else{
        is_shop_brand.value = false
    }
    const data = {
        is_shop_brand: is_shop_brand.value,
        product_id: product_id.value,
        referenced_id: referenced_id.value
    };
    const result = await shopBrandsStore.addFeaturedProducts(data);
    console.log('result',result.data.success)

    if (result.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Featured Product Successfully Added', life: 3000 });
        addLineItem.value = false;
        const result = await shopBrandsStore.getAllShopBrands().then((data: any) => {
        shop_brand_list.value = data.data.data.data.shopbrands;
        
    });
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
