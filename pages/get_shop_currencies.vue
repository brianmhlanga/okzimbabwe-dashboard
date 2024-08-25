<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Set Shop Default Currency</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                           
                            
                        <div  class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Shop Brand </label> 
                    <Dropdown v-model="shop_brand_id" :options="shop_brand_list" optionLabel="name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
                </div>
                
                <div  class="field mb-4 col-12 md:col-6" ><Button :loading="loading" @click="getFeaturedProduct()" label="Get Shop Currencies" icon="pi pi-plus" /></div>
                <div class="border-right-1 col-12 md:col-6 surface-border" style="width: 1px; height: 50%;"></div>
                <div v-if="shop_curriences" class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Select Currency</label> 
                    <Dropdown v-model="shop_brand_id" :options="shop_curriences" optionLabel="currency.name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
                </div>
                <div class="field mb-4 col-12 md:col-6" v-if="shop_curriences"><Button :loading="loading1" @click="create_default_currency()" label="Set Default Currency" icon="pi pi-plus" /></div>

                    
                           
                             
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
                    <Dropdown v-model="product_id" :options="categories_list" optionLabel="name" optionValue="id" placeholder="Select brand" checkmark :highlightOnSelect="false" />
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
const allCategories:any = ref([]);
const shop_brand_id = ref();
const name = ref();
const address = ref(); 
const shop_brand_list = ref();
const city = ref();
const store_code = ref();
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
const shop_brand = ref()
const referenced_id = ref()
const product_id = ref()
const is_shop_brand = ref()
const shop_curriences = ref()
const loading = ref(false)
const loading1 = ref(false)
const featured_product_list:any = ref([])
const number_of_categories = ref();
const addLineItem = ref(false);
const options = ref(['Shop brand', 'Shop']);
const option1 = ['true','false']
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
const getParsedImages = (images: string) => {
  try {
    const parsedImages = JSON.parse(images);
    const cleanedString = JSON.parse(parsedImages.replace(/\\/g, ''));
    return cleanedString[0]
  } catch (error) {
    console.error('Error parsing images JSON:', error);
  }
  return null; // Return null if parsing fails or no images are found
};

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
    
    await shopBrandsStore.getAllShops().then((data:any) => {
        shops_list.value = data.data.data.shops
        console.log('my shops',shops_list.value)
    });
    await shopBrandsStore.fetchAllCategories().then((data:any) => {
        allCategories.value.push(...data.data.categories);
    });
});

const getFeaturedProduct = async () => {
   
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
        shop_brand_id: shop_brand_id.value
    }
    
   console.log('is shop brand',shop_brand.value)
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
