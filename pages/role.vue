<template>
    <NuxtLayout name="dashboard">
       <section class="section">
            <div class="container-fluid pt-3">
                <div class="row">
                 <div class="text-900 font-medium text-xl mb-3">Roles</div>
                  
                    <div>
                    <div class="card p-4 m-3 ">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 md:col-6">
                                <Button @click="addLineItem = true" label="Create Role" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" secondary/>
                            </div>
                            <div class="field mb-4 col-12 md:col-12"> 
                            <DataTable :value="roles_list" tableStyle="min-width: 50rem">
                                <template #header>
                                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                        <span class="text-xl text-900 font-bold">User Roles</span>
                                    </div>
                                </template>
                                <Column field="name" header="Role name">
                                    <template #body="slotProps">
                                        {{slotProps.data.name}}
                                    </template>
                                </Column>
                                <Column header="Permissions">
                                    <template #body="slotProps">
                                        <Button @click="addPermissionModal(slotProps?.data?.name,slotProps?.data?.id)" icon="pi pi-pencil" severity="info"  text rounded aria-label="Cancel" />
                                        <!-- <Button @click="getRolePermissions(slotProps?.data?.name,slotProps?.data?.id)"  icon="pi pi-eye" severity="danger"  text rounded aria-label="Cancel" /> -->
                                    </template>
                                </Column>  
                                <Column header="Date Created">
                                    <template #body="slotProps">
                                        {{formatDate(slotProps.data.created_at)}} 
                                    </template>
                                </Column>          
                                <Column header="Actions">
                                    <template #body="slotProps">
                                        <Button  icon="pi pi-pencil" severity="info"  text rounded aria-label="Cancel" />
                                        <Button  icon="pi pi-trash" severity="danger"  text rounded aria-label="Cancel" />
                                    </template>
                                </Column>
                                
                            </DataTable>
                           </div>
                            
                           </div>                    
                    </div>
                 </div>
                </div>
            </div>
        </section>
        <Dialog v-model:visible="addLineItem" maximizable modal header="Add New User Role" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Role Name</label> 
                        <input class="form-control" type="text"  v-model="name">
                    </div>
                  
                </div>
                <Button :loading="loading" @click="createRole()" label="Create role" icon="pi pi-plus" />
        </Dialog>
        <Dialog v-model:visible="add_permissions" maximizable modal header="Add Permissions" position="top" :style="{ width: '55vw' }">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Role Name</label> 
                        <input class="form-control" type="text"  v-model="role_name" disabled>
                    </div>
                    <div class="field mb-4 col-12 md:col-6"> 
                        <label  for="company_name" class="font-medium text-900">Role Name</label> 
                        <MultiSelect v-model="selectedPermissions" :options="permissions" optionLabel="name" optionValue="id" placeholder="Select Permissions" class="w-full" />
                    </div>
                  
                </div>
                <Button  @click="createRolePermissions()" label="Create Permissions" icon="pi pi-plus" />
        </Dialog>
        <Dialog 
  v-model:visible="view_permissions" 
  maximizable 
  modal 
  header="View Permissions" 
  position="top" 
  :style="{ width: '55vw' }"
>
  <div class="grid formgrid p-fluid">
    <!-- Role Name -->
    <div class="field mb-4 col-12 md:col-6"> 
      <label for="role_name" class="font-medium text-900">Role Name</label> 
      <input class="form-control" type="text" disabled v-model="role_name" />
    </div>

    <!-- Permissions as Chips -->
    <div class="field mb-4 col-12 md:col-6"> 
      <label for="permissions" class="font-medium text-900">Permissions</label>
      <div v-if="assigned_permissions.length > 0" class="p-chip-list">
        <span 
          v-for="permission in assigned_permissions" 
          :key="permission.id" 
          class="p-chip p-chip-green"
        >
          {{ permission.name }}
        </span>
      </div>
      <p v-else>No Assinged Permissions</p>
    </div>
  </div>
  <!-- Optional Close Button -->
  <Button label="Close" icon="pi pi-times" @click="view_permissions = false" />
</Dialog>

        <ConfirmDialog></ConfirmDialog>
    </NuxtLayout>
 </template>
 <script setup lang="ts">
 import axios from "axios";
 import { SHOPIFY_URL } from "~/services/global.variables";
 import { useShopBrandsStore } from "~/stores/shopBrands";
 import { useConfirm } from "primevue/useconfirm";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
 const confirm = useConfirm();
 const shopBrandsStore = useShopBrandsStore()
 const name = ref()
 const logo = ref()
 const loading = ref(false)
 const open_shop_brand_modal = ref(false)
 const selectedPermissions = ref()
 const add_permissions = ref(false)
 const view_permissions = ref(false)
 const toast = useToast()
 const shop_brand_list = ref()
 const roles_list = ref()
 const shop_id = ref()
 const addLineItem = ref(false)
 const logoFile = ref()
 const role_id = ref()
 const role_name = ref()
 const permissions = ref()
 const assigned_permissions:any = ref([])
 const addPermissionModal = async (name:any,role_idd:any) => {
  selectedPermissions.value = null
  role_name.value = name
  role_id.value = role_idd
  add_permissions.value = true
  let params = {
    id: role_idd
  }
  const result = await shopBrandsStore.getRolePermissions(params).then(async(data:any) => {
        console.log('dssdhjsasa', data?.data?.data)
        let processed = data?.data?.data.map((item:any) => item.id);
        selectedPermissions.value = processed
      
 })
 }
 const getRolePermissions = async (name:any,role_idd:any) => {
  role_name.value = name
  role_id.value = role_idd
  view_permissions.value = true
  const params = {
        id: role_id.value,
};
    loading.value = true
    const result = await shopBrandsStore.getRolePermissions(params).then(async(data:any) => {
        console.log('dssdhjsasa', data?.data?.data)
        assigned_permissions.value = data?.data?.data
      
    })
 }
 definePageMeta({
         middleware: ["auth"]
 });
 onMounted(async () => {
     let result = await shopBrandsStore.getAllRoles().then((data:any) => {
        console.log('roles',data.data.data.data)
         roles_list.value = data.data.data.data
     })
     let result_permissions = await shopBrandsStore.getAllPermissions().then((data:any) => {
         permissions.value = data.data.data.data
     })
 });

 const refresh_data = ()=>{
    name.value = ''
 }
 const createRole = async () => {
    const data = {
        name: name.value,
    };
    loading.value = true
    const result = await shopBrandsStore.createUserRole(data);

    if (result.data.success) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'User Role Successfully Created', life: 3000 });
        loading.value = false
        addLineItem.value = false;
        refresh_data()
        let result = await shopBrandsStore.getAllRoles().then((data:any) => {
         roles_list.value = data.data.data.data
     })
    } else {
        toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false
        refresh_data()
    }
};
const createRolePermissions = async () => {
    const data = {
        permissions: selectedPermissions.value,
        id: role_id.value,
    };
    loading.value = true
    const result = await shopBrandsStore.createRolePermissions(data).then(async(data) => {
        console.log('dssdhjsasa', data)
        if(data?.status === 'success') {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Permissions Succesfully created', life: 3000 });
        loading.value = false
        add_permissions.value = false
        addLineItem.value = false;
        refresh_data()
        let result = await shopBrandsStore.getAllRoles().then((data:any) => {
         roles_list.value = data.data.data.data
         loading.value = false
     })
        } else {
            toast.add({ severity: 'warn', summary: 'Failed', detail: 'Creation Failed', life: 3000 });
        loading.value = false
        refresh_data()
        }
    })
};
 const shopBrandModal = (data:any)=>{
     open_shop_brand_modal.value = true
     shop_id.value = data.id
     name.value = data.name
     logoFile.value = data.logo
     console.log('my brand id',data.id)
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
 span.p-chip.p-chip-green {
    background-color: #0a140b !important;
    color: white !important;
    margin: 1px !important;
}
</style>