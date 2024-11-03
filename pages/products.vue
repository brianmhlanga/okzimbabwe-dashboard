<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Products</div>
                    <div>
                        <div class="card p-4 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create Product" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="categories_list" ref="dt"  class="p-datatable-customers" showGridlines :rows="10"
                            dataKey="i" v-model:filters="filters" filterDisplay="menu" :loading="loading" responsiveLayout="scroll"
                            >
                                    <template #header>
                                        <div class="flex justify-content-between">
                                            
                                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()"/>
                                            <Button icon="pi pi-external-link" label="Table Export" @click="exportCSV()" />
                                            <IconField iconPosition="left" >
                                                <InputIcon class="pi pi-search" > </InputIcon>
                                                <InputText v-model="searchParams" placeholder="Keyword Search" @input="searchProducts()" />
                                            </IconField>
                                        </div>
                                    </template>
                                    <template #empty>
                                        No products found.
                                    </template>
                                    <template #loading>s
                                        Loading categories data. Please wait.
                                    </template>
                                    <Column  frozen field="name" header="Product name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.name}}
                                        </template>
                                    </Column>
                                     <Column header="Image">
                                        <template #body="slotProps">
                                            <img :src="getParsedImages(slotProps.data.images)" :alt="slotProps.data.image_url" class="w-3rem border-round" />
                                        </template>
                                    </Column>
                                    <Column frozen  field="description" header="Product description" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.description}}
                                        </template>
                                    </Column>
                                    <Column frozen  field="category.name" header="Product code" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.product_code}}
                                        </template>
                                    </Column>
                                
                                    <Column frozen  field="created_at" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data?.created_at ? formatDate(data?.created_at) : "NOT SET"}}
                                        </template>
                                    </Column>
                                    <Column frozen  field="created_at" header="Actions" style="min-width:12rem">
                                        <template #body="{data}">
                                            <SplitButton label="Actions" :model="items({data})"  />
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
                                    :totalRecords= totalProducts>
                                </Paginator>
                            </div>
                           </div>                    
                    </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Create Product" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product name</label> 
                        <InputText class="form-control" type="text"  v-model="name"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product description</label> 
                        <Textarea v-model="description" autoResize rows="3" cols="30" />
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Images</label> 
                        <input type="file" accept="image/jpeg, image/png, image/jpg" @change="handleFileChange">
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Select main  category </label> 
                        
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
                    <label for="company_name" class="font-medium text-900">Categories </label> 
                    <MultiSelect v-model="categories" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select categories"
                    :maxSelectedLabels="10"  />
                   
                </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Select Product Brand </label> 
                       
                        <Dropdown v-model="product_brand_id" :options="product_brands" filter optionLabel="name" optionValue="id" placeholder="Select  product brand" >
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

                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product Code</label> 
                        <InputText class="form-control" type="text"  v-model="product_code"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Vat</label> 
                        <Dropdown v-model="vat" :options="vat_options"  placeholder="Select vat" class="w-full md:w-12 mb-6" />
                    </div>
                    
                </div>
                <Button :loading="loading" @click="createProduct()" label="Create Product" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="product_modal" maximizable modal header="Update Product" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product name</label> 
                        <InputText class="form-control" type="text"  v-model="name"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product description</label> 
                        <Textarea v-model="description" autoResize rows="3" cols="30" />
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Images</label> 
                        <input type="file" accept="image/jpeg, image/png" @change="handleFileChange">
                    </div>
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Select main category </label> 
                        
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
                    <div  class="field mb-4 col-12 md:col-12"> 
                        <label for="company_name" class="font-medium text-900">Select Product Brand </label> 
                       
                        <Dropdown v-model="product_brand_id" :options="product_brands" filter optionLabel="name" optionValue="id" placeholder="Select  product brand" >
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
                    <div class="field mb-4 col-12 md:col-6"> 
                    <label for="company_name" class="font-medium text-900">Categories </label> 
                    <MultiSelect v-model="categories" :options="allCategories" filter optionLabel="name" optionValue="id" placeholder="Select categories"
            :maxSelectedLabels="10"  />
                   
                </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Product Code</label> 
                        <InputText class="form-control" type="text"  v-model="product_code"/>
                    </div>
                    <div class="field mb-4 col-12 md:col-12"> 
                        <label  for="company_name" class="font-medium text-900">Vat</label> 
                        <Dropdown v-model="vat" :options="vat_options"  placeholder="Select vat" class="w-full md:w-12 mb-6" />
                    </div>
                    
                </div>
                <Button :loading="loading" @click="updateProduct()" label="Update Product" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="add_price" modal header="Add Price" :style="{ width: '25rem' }">
            <span class="text-center block mb-5">{{selectedProduct}}</span>
            <div v-for="(brand,index) in shop_brand_list" class="flex align-items-center gap-3 mb-3">
                <div class="grid formgrid p-fluid w-full">
                            <div class=" mb-2 col-12 md:col-12">
                                {{ brand.name}}
                            </div>
                            <div class=" mb-2 col-12 md:col-12">
                                <InputText id="username" v-model="brandPrices[index]" class="w-full" placeholder="Add Price" autocomplete="off" />
                            </div>
                            
                </div>
            </div>
            
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button :loading="loading" type="button" label="Save" @click="addPrice()"></Button>
            </div>
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
   
 
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
  import { SHOPIFY_URL } from "~/services/global.variables";
      import { storeToRefs } from "pinia";
     import { useShopBrandsStore } from "~/stores/shopBrands";
     import Swal from 'sweetalert2'
     import { FilterMatchMode } from 'primevue/api';
     import { useConfirm } from "primevue/useconfirm";
    const confirm = useConfirm();
    const totalProducts = ref()
     const shopBrandsStore = useShopBrandsStore()
     const parentCategories = storeToRefs(shopBrandsStore).parentCategories
     console.log('vbhjnk',parentCategories.value)
     const allCategories = storeToRefs(shopBrandsStore).allCategories
     const product_brands = storeToRefs(shopBrandsStore).product_brands
     const exportCSV = () => {
        console.log('ghh',dt.value)
        dt.value.exportCSV();
    };
    
     const name = ref('')
     const product_modal = ref()
     const product_brand_id = ref()
     const loading = ref(false)
     const description = ref()
     const is_active = ref('')
     const category_id = ref('')
     const product_code = ref()
     const searchParams:any = ref() 
     const price = ref()
     const categories:any = ref([])
     const toast = useToast()
     const imageFiles = ref([])
     const shop_brand_list:any = ref()
     const category_type = ref('Yes')
     const active_status = ref('Yes')
     const categories_list = ref()
     let number_of_categories = ref()
     const selectedProductId = ref()
     const addLineItem = ref(false)
     const brandPrices:any = ref([]);
     const options = ref([ 'Yes', 'No']);
     const selectedProduct = ref()
     const vat = ref()
     const vat_options = ref([true, false]);
     const add_price = ref(false)
     const product_brands_list = ref()
     definePageMeta({
        middleware: ["auth"]
});
    
   
    const items = (product:any) => [
      {
        label: 'Add Price',
        command: () => getProduct(product)
      },
      {
        label: 'Update Product',
        command: () => showProduct(product)
      },
      {
        label: 'Delete Product',
        command: () => deleteProduct(product)
      }
      // Add more actions if needed
    ];

    const getProduct = (product:any) => {
      selectedProduct.value = product.data.name;
      selectedProductId.value = product.data.id
      console.log(selectedProduct.value)
      add_price.value = true;
    };
    
    const getParsedImages = (images: string) => {
  try {
    const parsedImages = JSON.parse(images);
    const cleanedString = JSON.parse(parsedImages.replace(/\\/g, ''));
    console.log('mbililimbi',)
    return cleanedString[0]
  } catch (error) {

  }
  return null; // Return null if parsing fails or no images are found
};
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

     
 
     onMounted(async () => {
        await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
            totalProducts.value = data.data.data.totalItemCount
        })
        shopBrandsStore.fetchAllProductBrands()
        
        await shopBrandsStore.get_product_brands().then((data:any)=>{
            product_brands_list.value = data.data.data.data
        })
        await shopBrandsStore.getAllShopBrands().then((data:any)=>{
            shop_brand_list.value = data.data.data.data.shopbrands
            shop_brand_list.value.forEach(() => brandPrices.value.push(""));
            console.log(data.data.data.data.shopbrands)
        })
        await shopBrandsStore.fetchAllCategories().then((data:any)=>{
            allCategories.value.push(...data.data.categories)
        })
        
     });
     
     const showProduct = async(product:any) => {
      console.log('Product',product)
      name.value = product.data.name;
      description.value = product.data.description
      category_id.value = product.data.category_id
      product_code.value = product.data.product_code
      vat.value = product.data.vat
      selectedProductId.value = product.data.id
      product_brand_id.value = product.data.product_brand_id
      categories.value = product.data.categories.map(category => {
    return category.id
    
});
console.log('categories',categories.value)
      product_modal.value = true
     
    }
    
     const onPage = (event:any) => {
        let current_page = event.page + 1
        let result =  shopBrandsStore.getProductsPagination(current_page).then((data:any) => {
            
            categories_list.value = data.data.data.products
            console.log('hbj',data.data.data.categories.length)
            number_of_categories.value = data.data.data.categories.length
        })

    }
    const deleteProduct = (product:any) => {
        loading.value = true
      let data = {
        "id": product.data.id
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
            let result = await shopBrandsStore.deleteProduct(data)
            if (result.data.success){
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });false
            loading.value = false
            await shopBrandsStore.getAllProducts().then((data:any)=>{
                categories_list.value = data.data.data.products
            })
            }
            else{
                toast.add({ severity: 'warn', summary: 'Failed', detail: 'Deletion Failed', life: 3000 });
                loading.value = false
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        } 
    });
    }
    const addPrice = async () =>{
       
        loading.value = true
            
            let data = {
                product_id : selectedProductId.value,
                shop_brand_id : shop_brand_list.value.map(brand => brand.id),
                price: brandPrices.value.map(price=> (price))
                
         
            }
            let result = await shopBrandsStore.createPrice(data)
            console.log('my result',result.success)
            
 
            if (result.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Price Succesfully Added', life: 3000});
                loading.value = false
                addLineItem.value = false
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
                loading.value = false
            }
    }     
    const refresh_data = ()=>{
        name.value = ''
        description.value = ''
        category_id.value = "",
        product_brand_id.value = "",
        product_code.value = "" 
        categories.value = ''
        imageFiles.value = []
        vat.value = ''

    }
    const formatDate = (value:any) => {
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
    const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    const acceptedTypes = ['image/jpeg', 'image/png','image/jpg'];
    if (file && acceptedTypes.includes(file.type)) {
        imageFiles.value.push(file) 
    } else {
        toast.add({ severity: 'info', summary: 'Wrong File Type', detail: 'Upload PNG or JPEG', life: 3000 });
        imageFiles.value = null;
    }
    };
    const createProduct = async () => {
        console.log('simba',categories.value)
        loading.value = true
      
      const url = `${SHOPIFY_URL}/api/products`;

      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);
      formData.append('category_id', category_id.value);
      formData.append('product_brand_id', product_brand_id.value);
      formData.append('product_code', product_code.value);
      formData.append('vat', vat.value);
    
      categories.value.forEach((file, index) => {
    formData.append(`categories[${index}]`, file);
  })
      console.log('form',formData)
   
      if (imageFiles.value) {
        imageFiles.value.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
      }
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
          },
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Product Created Successfully', life: 3000 });
        loading.value = false
        await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
        refresh_data()
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
    const updateProduct = async () => {
        console.log('simba')
        loading.value = true
      
      const url = `${SHOPIFY_URL}/api/products/edit/${selectedProductId.value}`;
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);
      formData.append('category_id', category_id.value);
      formData.append('product_code', product_code.value);
      formData.append('product_brand_id', product_brand_id.value);
      formData.append('vat', vat.value);
      categories.value.forEach((file, index) => {
    formData.append(`categories[${index}]`, file);
  })
      console.log('form',formData)
   
      if (imageFiles.value) {
        imageFiles.value.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
      }
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
          },
        });
        toast.add({ severity: 'success', summary: 'Success', detail: 'Product  Successfully Updated', life: 3000 });
        loading.value = false
        await shopBrandsStore.getAllProducts().then((data:any)=>{
            categories_list.value = data.data.data.products
        })
        refresh_data()
        product_modal.value = false
        // let result = await shopBrandsStore.getAllShopBrands().then((data:any) => {
        //     shop_brand_list.value = data.data.data.data.shopbrands
        // })
      } catch (error:any) {
        console.log('error', error)
        loading.value = false
        toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error, life: 3000 });
      }
    };
    const searchProducts = async()=>{
        await shopBrandsStore.searchProducts(searchParams.value).then((data)=>{
            categories_list.value = data.data.data.products
        })
    }


    
 </script>
 <style>
   span.p-input-icon.pi.pi-search {
    display: none !important;
}
</style>