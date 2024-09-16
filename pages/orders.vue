<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Shopping Orders</div>
                    <div>
                        <div class="card p-4">
                        <div class="grid formgrid p-fluid">
                            <div v-if="role == 'Supervisor'"class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="filteredOrders" ref="dt"  class="p-datatable-customers" showGridlines :rows="10"
                            dataKey="id" v-model:filters="filters" filterDisplay="menu" :loading="loading" responsiveLayout="scroll"
                            >
                                    <template #header>
                                        <div class="flex justify-content-between">
                                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()"/>
                                            <Button icon="pi pi-external-link" label="Table Export" @click="exportCSV($event)" />
                                            <IconField iconPosition="left" >
                                                <InputIcon class="pi pi-search" > </InputIcon>
                                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                                            </IconField>
                                        </div>
                                    </template>
                                    <template #empty>
                                        No orders found.
                                    </template>
                                    <template #loading>s
                                        Loading orders data. Please wait.
                                    </template>
                                    <Column  frozen field="name" header="Order Ref" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.order_ref}}
                                        </template>
                                    </Column>
                                    <Column  frozen field="name" header="Customer name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.customer_name}}
                                        </template>
                                    </Column>
                                   >
                                    <Column  frozen field="name" header="Delivery Address" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{getCityAndAddress(data.delivery_address)}}
                                        </template>
                                    </Column>
                                    <Column  frozen field="name" header="Order Status" style="min-width:12rem">
                                        <template #body="{data}">
                                          <Tag :value="data.status?.name" :severity="getSeverity(data.status.name)"</Tag>
                                        </template>
                                    </Column>
                                    
                                    <Column frozen  field="description" header="Total Amount" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.total_incl_tax}}
                                        </template>
                                    </Column>
                                    <Column frozen  field="category.name" header="Vat Total" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.vat_tax_amount}}
                                        </template>
                                    </Column>
                                    
                                    <Column frozen  field="category.name" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{formatDate(data.created_at)}}
                                        </template>
                                    </Column>
                                    <Column frozen  field="created_at" header="Actions" style="min-width:12rem">
                                        <template #body="{data}">
                                            <SplitButton label="Actions" :model="items({data})"  />
                                        </template>
                                    </Column>
                                    
                                  
                                   
                                </DataTable>
                                <Dialog v-model:visible="change_order_status" modal header="Change Order Status" :style="{ width: '50rem' }">
                            <span class="p-text-secondary block mb-5">Order Number #{{ order_ref }}</span>
                            <Dropdown v-model="selectedOrderStatus" :options="order_statuses" optionLabel="name" optionValue="id" placeholder="Select Status" class="w-full md:w-12 mb-6" />
                            <div class="flex justify-content-end gap-2">
                                <Button type="button" label="Cancel" severity="secondary" @click="change_order_status = false"></Button>
                                <Button :loading="loading1" type="button" label="Save" @click="updateOrderStatus()"></Button>
                            </div>
                        </Dialog>
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
                            <div v-else class="field mb-4 col-12 md:col-12"> 
                                <DataTable :value="orders" ref="dt"  class="p-datatable-customers" showGridlines :rows="10"
                            dataKey="id" v-model:filters="filters" filterDisplay="menu" :loading="loading" responsiveLayout="scroll"
                            >
                                    <template #header>
                                        <div class="flex justify-content-between">
                                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()"/>
                                            <Button icon="pi pi-external-link" label="Table Export" @click="exportCSV($event)" />
                                            <IconField iconPosition="left" >
                                                <InputIcon class="pi pi-search" > </InputIcon>
                                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                                            </IconField>
                                        </div>
                                    </template>
                                    <template #empty>
                                        No orders found.
                                    </template>
                                    <template #loading>s
                                        Loading orders data. Please wait.
                                    </template>
                                    <Column  frozen field="name" header="Order Ref" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.order_ref}}
                                        </template>
                                    </Column>
                                    <Column  frozen field="name" header="Customer name" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.customer_name}}
                                        </template>
                                    </Column>
                                   >
                                    <Column  frozen field="name" header="Delivery Address" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{getCityAndAddress(data.delivery_address)}}
                                        </template>
                                    </Column>
                                    <Column  frozen field="name" header="Order Status" style="min-width:12rem">
                                        <template #body="{data}">
                                            <Tag :value="data.status?.name" :severity="getSeverity(data.status.name)"></Tag>
                                        </template>
                                    </Column>
                                    <Column frozen  field="description" header="Total Amount" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.total_incl_tax}}
                                        </template>
                                    </Column>
                                    <Column frozen  field="category.name" header="Vat Total" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{data.vat_tax_amount}}
                                        </template>
                                    </Column>
                                    
                                    <Column frozen  field="category.name" header="Date Created" style="min-width:12rem">
                                        <template #body="{data}">
                                            {{formatDate(data.created_at)}}
                                        </template>
                                    </Column>
                                    <Column frozen  field="created_at" header="Actions" style="min-width:12rem">
                                        <template #body="{data}">
                                            <SplitButton label="Actions" :model="items({data})"  />
                                        </template>
                                    </Column>
                                    
                                  
                                   
                                </DataTable>
                                <Dialog v-model:visible="change_order_status" modal header="Change Order Status" :style="{ width: '50rem' }">
                            <span class="p-text-secondary block mb-5">Order Number #{{ order_ref }}</span>
                            <Dropdown v-model="selectedOrderStatus" :options="order_statuses" optionLabel="name" optionValue="id" placeholder="Select Status" class="w-full md:w-12 mb-6" />
                            <div class="flex justify-content-end gap-2">
                                <Button type="button" label="Cancel" severity="secondary" @click="change_order_status = false"></Button>
                                <Button :loading="loading1" type="button" label="Save" @click="updateOrderStatus()"></Button>
                            </div>
                        </Dialog>
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
     const shopBrandsStore = useShopBrandsStore()
     const parentCategories = storeToRefs(shopBrandsStore).parentCategories
     console.log('vbhjnk',parentCategories.value)
     const allCategories = storeToRefs(shopBrandsStore).allCategories
     const product_brands = storeToRefs(shopBrandsStore).product_brands
     const role = useCookie('role');
     console.log('role',role)
     const user_shop = useCookie('user_shop');
     console.log('id',user_shop.value)
     const name = ref('')
     const order_id = ref()
     const selectedOrderStatus = ref()
     const carts = ref()
     const product_modal = ref()
     const product_brand_id = ref()
     const description = ref()
     const is_active = ref('')
     const category_id = ref('')
     const product_code = ref()
     const price = ref()
     const orders = ref()
     const categories:any = ref([])
     const toast = useToast()
     const imageFiles = ref([])
     const shop_brand_list:any = ref()
     const category_type = ref('Yes')
     const active_status = ref('Yes')
     const loading1 = ref(false)
     const categories_list = ref()
     let number_of_categories = ref()
     const selectedProductId = ref()
     const filteredOrders = ref()
     const order_ref = ref()
     const change_order_status = ref(false)
     const addLineItem = ref(false)
     const brandPrices:any = ref([]);
     const options = ref([ 'Yes', 'No']);
     const selectedProduct = ref()
     const add_price = ref(false)
     const order_statuses = ref()
     const product_brands_list = ref()
     definePageMeta({
        middleware: ["auth"]
});
const getSeverity = (over_budget:any) => {
    console.log('sbhb',over_budget)
    switch (over_budget) {
        case 'Pending':
            return 'warning';
 
        case 'MOVING':
            return 'danger';

        case 'REJECTED':
        return 'success';
        default:
            return null;
    }
 };
   
    const items = (product:any) => [
    {
        label: 'Change Order Status',
        command: () => openChangeOrderStatus(product)
      },
      {
        label: 'Download Invoice',
        command: () => getProduct(product)
      },
      {
        label: 'Download Picking Slip ',
        command: () => getPickSlip(product)
      },
      {
        label: 'Delete Order',
        command: () => deleteProduct(product)
      }
      // Add more actions if needed
    ];

    const openChangeOrderStatus = (product:any) => {
      change_order_status.value = true
      order_ref.value = product.data.order_ref
      order_id.value = product.data.id
      
}
    const getProduct = async(product:any) => {
        console.log('order',product.data.order_ref)
        order_ref.value = product.data.order_ref
        const data = {
            ref: order_ref.value
        }
        let result = await shopBrandsStore.downloadInvoice(data)
        console.log('my result',result.success)
        if (result.success) {
        window.open(`https://api.hakikasystems.co.zw/invoice/${order_ref.value}`, '_blank');
        toast.add({ severity: 'success', summary: 'Success', detail: 'Invoice Successfully Downloaded', life: 3000 }); // You can replace 'your-invoice-url' with the actual invoice URL or data
    }
    else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Downloading Failed', life: 3000 });
        
    }
    
    };
    const getPickSlip = async(product:any) => {
        console.log('order',product.data.order_ref)
        order_ref.value = product.data.order_ref
        const data = {
            ref: order_ref.value
        }
        let result = await shopBrandsStore.downloadPickingSlip(data)
        console.log('my result',result.success)
        if (result.success) {
        window.open(`https://api.hakikasystems.co.zw/picking-list/${order_ref.value}`, '_blank'); 
        // You can replace 'your-invoice-url' with the actual invoice URL or data
        toast.add({ severity: 'success', summary: 'Success', detail: 'Picking Slip Successfully Downloaded', life: 3000 });
    }
    else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Downloading Failed', life: 3000 });
        
    }
    
    };
    
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
       
      await  shopBrandsStore.getShopOrders(user_shop.value).then((data:any)=>{
           filteredOrders.value =  data.data.data.orders
        })

        await  shopBrandsStore.getOrders().then((data:any)=>{
            orders.value = data.data.data.orders
           
            console.log('user',orders.value)
        })
        await shopBrandsStore.get_order_status().then((data:any) => {
         order_statuses.value = data.data.data.data
     })
        
     });
     const updateOrderStatus = async () => {
    loading1.value = true
    let data = {
        order_status_id: selectedOrderStatus.value,
        id: order_id.value
    }
    let result = await shopBrandsStore.updateStatus(data).then(async(data:any) => {
        console.log('ddd',data.data.success)
         if (data.data.success) {
            loading1.value = false,
            change_order_status.value = false
            toast.add({ severity: 'success', summary: 'Success', detail: 'Status Succesfully Changed', life: 3000 });
            let resultt = await shopBrandsStore.getOrders().then((data:any) => {
                orders.value = data.data.data.orders
                loading1.value = false
            })
         } else {
            toast.add({ severity: 'warn', summary: 'Update Failed', detail: 'Could not update status', life: 3000 });
            loading1.value = false
         }
    })
}
     
     function getCityAndAddress(deliveryAddress:any) {
    // Parse the JSON string into an object
    const addressObj = JSON.parse(deliveryAddress);
    
    // Extract the city and address
    const city = addressObj.city;
    const address = addressObj.address;
    
    // Return the concatenated string
    return `${city}, ${address}`;
}
     const showProduct = async(product:any) => {
      console.log('Product',product)
      name.value = product.data.name;
      description.value = product.data.description
      category_id.value = product.data.category_id
      product_code.value = product.data.product_code
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
      let data = {
        "id": product.data.id
      }
      
      confirm.require({
        message: 'Do you want to delete this order?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async() => {
            let result = await shopBrandsStore.deleteProduct(data)
            if (result.data.success){
                toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                await shopBrandsStore.getOrders().then((data:any)=>{
                orders.value = data.data.data.orders
                console.log('user',orders.value)
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
    const addPrice = async () =>{
       
         
            
            let data = {
                product_id : selectedProductId.value,
                shop_brand_id : shop_brand_list.value.map(brand => brand.id),
                price: brandPrices.value.map(price=> (price))
                
         
            }
            let result = await shopBrandsStore.createPrice(data)
            console.log('my result',result.success)
            
 
            if (result.success) {
                toast.add({severity:'success', summary: 'Success', detail:'Price Succesfully Added', life: 3000});
                addLineItem.value = false
            }
        
            else {
                toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
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

    }

        
         
     

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
      
      const url = `${SHOPIFY_URL}/api/products`;

      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);
      formData.append('category_id', category_id.value);
      formData.append('product_brand_id', product_brand_id.value);
      formData.append('product_code', product_code.value);
    
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
      }
    };
    const updateProduct = async () => {
        console.log('simba')
      
      const url = `${SHOPIFY_URL}/api/products/edit/${selectedProductId.value}`;
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('description', description.value);
      formData.append('category_id', category_id.value);
      formData.append('product_code', product_code.value);
      formData.append('product_brand_id', product_brand_id.value);
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
        toast.add({ severity: 'success', summary: 'Success', detail: 'Shop Brand Created Successfully', life: 3000 });
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
       
        toast.add({ severity: 'error', summary: 'Error uploading shop brand', detail: error, life: 3000 });
      }
    };


    
 </script>
 <style>
   
</style>