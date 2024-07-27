<template>
   <NuxtLayout name="dashboard">
      <section class="section">
           <div class="container-fluid pt-3">
               <div class="row">
                   <div class="text-900 font-medium text-xl mb-3">Shop Brands</div>
                   <div class="card p-4 ml-3  ">
                       <div class="grid formgrid p-fluid">
                           <div class="field mb-4 col-12 md:col-6">
                               <Button @click="addLineItem = true" label="Create Shop Brand" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                           </div>
                           
                           <div class="field mb-4 col-12 md:col-12"> 
                            <DataTable :value="shop_brand_list" tableStyle="min-width: 50rem">
                                <template #header>
                                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                        <span class="text-xl text-900 font-bold">Shop brands</span>
                                      
                                    </div>
                                </template>
                                <Column field="name" header="Shop brand name">
                                    <template #body="slotProps">
                                        {{slotProps.data.name}}
                                    </template>
                                </Column>
                                <Column header="Shop brand logo">
                                    <template #body="slotProps">
                                        <img :src="`${slotProps.data.logo}`"  class="w-6rem border-round" />
                                    </template>
                                </Column>          
                                <Column header="Actions">
                                    <template #body="slotProps">
                                        <Button  icon="pi pi-pencil" severity="info" text rounded aria-label="Cancel" />
                                        <Button  icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel" />
                                    </template>
                                </Column>
                                
                            </DataTable>
                           </div>
                          </div>                    
                   </div>
               </div>
           </div>
       </section>
       <Dialog v-model:visible="addLineItem" maximizable modal header="Create Shop Brand" position="top" :style="{ width: '55vw' }">
               <div class="grid formgrid p-fluid">
                   <div class="field mb-4 col-12 md:col-6"> 
                       <label  for="company_name" class="font-medium text-900">Shop brand name</label> 
                       <input class="form-control" type="text"  v-model="name">
                   </div>
                   <div class="field mb-4 col-12 md:col-6"> 
                       <label for="company_name" class="font-medium text-900">Shop brand logo</label> 
                       <input class="form-control" type="file" id="formFile" @change="handleFileUpload">
                   </div>
                   
               </div>
               <Button @click="createShopBrand()" label="Create shop brand" icon="pi pi-plus" />
       </Dialog>

   </NuxtLayout>
</template>
<script setup >
    import { useShopBrandsStore } from "~/stores/shopBrands";
    import Swal from 'sweetalert2'
    const shopBrandsStore = useShopBrandsStore()
    const name = storeToRefs(shopBrandsStore).name
    const logo = storeToRefs(shopBrandsStore).logo
    const toast = useToast()
    const shop_brand_list = ref()
    const addLineItem = ref(false)

    const handleFileUpload = (event) => {
        logo.value = event.target.files[0];
        console.log("new image data",logo.value);
    };

    onMounted(async () => {
        let result = await shopBrandsStore.getAllShopBrands().then((data) => {
            console.log("dgfa",data.data.data.data.shopbrands)
            shop_brand_list.value = data.data.data.data.shopbrands
        })
    
    });

    const createShopBrand = async()=>{
        if(logo.value){
            console.log('h',logo.value)
        let result = await shopBrandsStore.createShopBrand()
        console.log('my result',result)

        if (result.data.success) {
            toast.add({severity:'success', summary: 'Success', detail:'Shop Brand Succesfully Created', life: 3000});
            addLineItem.value = false
        }
        else {
            toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
        }
        }
        else{
            toast.add({severity:'warn', summary: 'Failed', detail:'Select Logo', life: 3000});
        }
    }
    
    const removeShopBrand = async(shop_id)=>{
        id.value = shop_id


    }
 
</script>