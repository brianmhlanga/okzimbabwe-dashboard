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
                                <label for="customer_name" class="font-medium text-900">Shop Brands</label> 
                                
                            </div>
                           <div class="field mb-4 col-12 md:col-12"> 
                              <DataTable :value="products" showGridlines tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
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
import { useToast } from "primevue/usetoast";
   import { storeToRefs } from "pinia";
   
   import { ref } from 'vue';
   import { useShopBrandsStore } from "~/stores/shopBrands";
   
   const shopBrandsStore = useShopBrandsStore()
   const name = storeToRefs(shopBrandsStore).name
   const logo = storeToRefs(shopBrandsStore).logo
   const toast = useToast()
   const addLineItem = ref(false)

   const handleFileUpload = (event) => {
  const file = event.target.files[0];
  logo.value = file;
};

   const createShopBrand = async()=>{
      if(logo.value){
         console.log('h',logo.value)
      let result = await shopBrandsStore.createShopBrand()

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

 
</script>