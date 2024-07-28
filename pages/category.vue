<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                    <div class="text-900 font-medium text-xl mb-3">Categories</div>
                    <div class="card p-4 ml-3  ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create Category" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            
                            <div class="field mb-4 col-12 md:col-12"> 
                             
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
                        <label for="company_name" class="font-medium text-900">Is it a child category</label> 
                        <SelectButton v-model="category_type" :options="options"  aria-labelledby="basic" />
                    </div>
                    <div class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Is it Active</label> 
                        <SelectButton v-model="active_status" :options="options" aria-labelledby="basic" />
                    </div>
                    <div v-if="category_type =='Yes'" class="field mb-4 col-6 md:col-6"> 
                        <label for="company_name" class="font-medium text-900">Select parent category id</label> 
                        <Dropdown v-model="parent_category_id" :options="cities" optionLabel="name" placeholder="Select a City" checkmark :highlightOnSelect="false"  />
                    </div>
                    
                </div>
                <Button @click="createCategory()" label="Create Category" icon="pi pi-plus" />
        </Dialog>
 
    </NuxtLayout>
 </template>
 <script setup lang>
     
     import { useShopBrandsStore } from "~/stores/shopBrands";
     import Swal from 'sweetalert2'
     const shopBrandsStore = useShopBrandsStore()
     const name = ref('')
     const is_parent = ref('')
     const is_sub_parent = ref('')
     const is_active = ref('')
     const parent_category_id = ref('')
     const toast = useToast()
     const shop_brand_list = ref()
     const category_type = ref()
     const active_status = ref()
     const addLineItem = ref(false)
     const options = ref([ 'Yes', 'No']);
 
    
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
        if(active_status.value == 'Yes'){
            is_active.value = true
        }
        else{
            is_active.value = false
        }
     }
 
     onMounted(async () => {
        //  let result = await shopBrandsStore.getAllShopBrands().then((data) => {
        //      console.log("dgfa",data.data.data.data.shopbrands)
        //      shop_brand_list.value = data.data.data.data.shopbrands
        //  })
     
     });
 
     const createCategory = async()=>{
        checking_category_type()
        checking_active_status()
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
             addLineItem.value = false
         }
         else {
             toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
         }
        
         
     }
     
     const removeShopBrand = async(shop_id)=>{
         id.value = shop_id
 
 
     }
  
 </script>
 <style>
   
</style>