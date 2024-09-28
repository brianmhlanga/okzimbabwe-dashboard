<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Categories</div>
                    <div>
                        <div class="card p-4 ml-3 mr-10">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Add Category" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary />
                            </div>
                             <div class="field mb-4 col-12 md:col-12"> 
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
                                    <Column frozen field="name" header="Category name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.name }}
                                        </template>
                                    </Column>
                                
                                    <!-- <!-- <Column frozen field="description" header="Currency Iso Code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.iso_code }}
                                        </template>
                                    </Column> -->
                                    <Column frozen field="category.name" header="Parent Category" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data.is_parent? true:false }}
                                        </template>
                                    </Column> -->
                                
                                    <Column frozen field="created_at" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{ data?.created_at ? formatDate(data?.created_at) : "NOT SET" }}
                                        </template>
                                    </Column>
                                    <Column header="Actions">
                                    <template #body="slotProps">
                                        <Button  icon="pi pi-pencil" severity="info" @click="shopBrandModal(slotProps.data)" text rounded aria-label="Cancel" />
                                        <Button  icon="pi pi-trash" severity="danger" @click="deleteShopBrand(slotProps.data.id)" text rounded aria-label="Cancel" />
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
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Category" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Category name</label> 
                        <InputText class="form-control" type="text"  v-model="name"/>
                    </div>
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Is it a sub category</label> 
                        <SelectButton v-model="category_type" :options="options"  aria-labelledby="basic" />
                    </div>
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Is it Active</label> 
                        <SelectButton v-model="active_status" :options="options" aria-labelledby="basic" />
                    </div>
                    <div v-if="category_type =='Yes'" class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Select parent  </label> 
                            <Dropdown v-model="parent_category_id" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select  category" >
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
        
                </div>
                <Button :loading="loading" @click="createCategory()" label="Create Category" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="open_category_modal" maximizable modal header="Update Category" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Category name</label> 
                        <InputText class="form-control" type="text"  v-model="name"/>
                    </div>
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Is it a sub category</label> 
                        <SelectButton v-model="category_type" :options="options"  aria-labelledby="basic" />
                    </div>
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Is it Active</label> 
                        <SelectButton v-model="active_status" :options="options" aria-labelledby="basic" />
                    </div>
                    <div v-if="category_type =='Yes'" class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Select parent  </label> 
                        <Dropdown v-model="parent_category_id" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select  category" >
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
        
                </div>
                <Button :loading="loading" @click="updateCategory()" label="Update Category" icon="pi pi-plus" />
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
 
    </NuxtLayout>
 </template>
 <script setup lang>
      import { storeToRefs } from "pinia";
     import { useShopBrandsStore } from "~/stores/shopBrands";
     import Swal from 'sweetalert2'
     const confirm = useConfirm();
     import { FilterMatchMode } from 'primevue/api';
     const shopBrandsStore = useShopBrandsStore()
     const allCategories = storeToRefs(shopBrandsStore).allCategories
     const parentCategories = storeToRefs(shopBrandsStore).parentCategories
     console.log('vbhjnk',parentCategories.value)
     
     const name = ref('')
     const is_parent = ref('')
     const id = ref()
     const is_sub_parent = ref('')
     const is_active = ref('')
     const loading = ref(false)
     const  open_category_modal = ref(false)
     const parent_category_id = ref('')
     const toast = useToast()
     const shop_brand_list = ref()
     const category_type = ref('Yes')
     const active_status = ref('Yes')
     const categories_list = ref()
     let number_of_categories = ref()
     const addLineItem = ref(false)
     const options = ref([ 'Yes', 'No']);
     definePageMeta({
        middleware: ["auth"]
});
 
     const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const dt = ref();

    const initFilters = () => {
        filters.value = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    };

    const clearFilter1 = () => {

        initFilters();
    };

    const shopBrandModal = (data)=>{
    open_category_modal.value = true
    id.value = data.id
    name.value = data.name
    is_active.value = data.is_active
    is_parent.value = data.is_parent
    is_sub_parent.value = data.is_sub_parent
    console.log('category',data)
}

const deleteShopBrand = (category_id) => {
    console.log('shop_id',category_id)
    let data = {
    "id": category_id
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
        let result = await shopBrandsStore.deleteCategory(data)
        if (result.data.success){
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        await shopBrandsStore.getAllCategories().then((data)=>{
            categories_list.value = data.data.data.categories
            console.log('categories list',categories_list.value)
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


     const checking_category_type = ()=>{
     
        if(category_type.value == 'Yes'){
            is_sub_parent.value = true
            is_parent.value = false
            console.log('simba',is_sub_parent.value)
        }
        else{
            is_sub_parent.value = false
            is_parent.value = true
            parent_category_id.value = 5
        }
     }

     const checking_active_status = ()=>{
        if (active_status.value == 'Yes') {
            is_active.value = true
        }
        else {
            is_active.value = false
        }
     }
    
     const refresh_data = ()=>{
        name.value = ''
        is_parent.value = ''
        is_sub_parent.value = "",
        is_active.value = "",
        parent_category_id.value = "" 
    }


     
     onMounted(async () => {
        await shopBrandsStore.getAllCategories().then((data)=>{
            categories_list.value = data.data.data.categories
            console.log('categories list',categories_list.value)
        })
        await shopBrandsStore.fetchAllCategories().then((data)=>{
           
        })
        //  let result = await shopBrandsStore.getAllShopBrands().then((data) => {
        //      console.log("dgfa",data.data.data.data.shopbrands)
        //      shop_brand_list.value = data.data.data.data.shopbrands
        //  })
     
     });

     const updateCategory = async () =>{
        checking_category_type()
        checking_active_status()
        if (is_parent.value == true) {
            
            let data = {
                id: id.value,
                name: name.value,
                is_parent: is_parent.value,
                is_sub_parent: is_sub_parent.value,
                is_active: is_active.value,
         
            }
            loading.value = true
            let result = await shopBrandsStore.updateCategory(data)
            console.log('my result',result)
 
            if (result.data.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Category Succesfully Created', life: 3000});
                loading.value = false
                await shopBrandsStore.getAllCategories().then((data)=>{
                    categories_list.value = data.data.data.categories
                    console.log('categories list',categories_list.value)
                })
                open_category_modal.value = false
                refresh_data()
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
                loading.value = false
            }
        } 
        
        else {
            loading.value = true
            let data = {
                id: id.value,
                name: name.value,
                is_parent: is_parent.value,
                is_sub_parent: is_sub_parent.value,
                is_active: is_active.value,
                parent_category_id: parent_category_id.value 
            }
    
           
         let result = await shopBrandsStore.updateCategory(data)
         console.log('my result',result)
 
         if (result.data.success) {
             toast.add({severity:'success', summary: 'Success', detail:'Category Succesfully Created', life: 3000});
             loading.value = false
             open_category_modal.value = false
             await shopBrandsStore.getAllCategories().then((data)=>{
                categories_list.value = data.data.data.categories
                console.log('categories list',categories_list.value)
            })
             refresh_data()
         }

         else {
             toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
             loading.value = false
         }

        }
      
        
         
     }
     const createCategory = async () =>{
        checking_category_type()
        checking_active_status()
        if (is_parent.value == true) {
            
            let data = {
                name: name.value,
                is_parent: is_parent.value,
                is_sub_parent: is_sub_parent.value,
                is_active: is_active.value,
         
            }
            loading.value = true
            let result = await shopBrandsStore.createCategory(data)
            console.log('my result',result)
 
            if (result.data.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Category Succesfully Created', life: 3000});
                loading.value = false
                addLineItem.value = false
                await shopBrandsStore.getAllCategories().then((data)=>{
                    categories_list.value = data.data.data.categories
                    console.log('categories list',categories_list.value)
                })
                refresh_data()
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
                loading.value = false
            }
        } 
        
        else {
            loading.value = true
            let data = {
                name: name.value,
                is_parent: is_parent.value,
                is_sub_parent: is_sub_parent.value,
                is_active: is_active.value,
                parent_category_id: parent_category_id.value 
            }
    
           
         let result = await shopBrandsStore.createCategory(data)
         console.log('my result',result)
 
         if (result.data.success) {
             toast.add({severity:'success', summary: 'Success', detail:'Category Succesfully Created', life: 3000});
             loading.value = false
             addLineItem.value = false
             await shopBrandsStore.getAllCategories().then((data)=>{
                categories_list.value = data.data.data.categories
                console.log('categories list',categories_list.value)
            })
             refresh_data()
         }

         else {
             toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
             loading.value = false
         }

        }
      
        
         
     }
    
     const onPage = (event) => {
        let current_page = event.page + 1
        let result =  shopBrandsStore.getCategoriesPagination(current_page).then((data) => {
            
            categories_list.value =  data.data.data.categories
            console.log('hbj',data.data.data.categories.length)
            number_of_categories.value = data.data.data.categories.length
        })

    }
     
    const items = [
        {
            label: 'Add Price',
            command: () => {
                add_product.value = true
            }
        }
    ];

    const formatDate = (value) => {
        const date = new Date(value);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        //@ts-ignore
        return date.toLocaleString('en-US', options);
    };
  
 </script>
 <style>
   
</style>