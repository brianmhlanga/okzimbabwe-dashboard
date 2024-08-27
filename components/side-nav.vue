<template>
    <nav class="nxl-navigation">
        <div class="navbar-wrapper">
            <div class="m-header">
                <Nuxtlink to="/"><img src="/images/okshop.jpg" alt="" class="logo logo-lg"></Nuxtlink>
            </div>
            <div class="p-10 navbar-content">
                <PanelMenu class=" card" :model="mainMenuItems" />
                <div class="card text-center">
                    <div class="card-body">
                        <h6 class="mt-1 text-dark fw-bolder">{{ name }}</h6>
                        <p class="fs-11 my-3 text-dark">Super Admin</p>
                        <a href="javascript:void(0);" class="btn btn-primary text-dark w-100" @click="logout()">Log Out</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
const authStore:any = useAuthStore()
const shopBrandsStore = useShopBrandsStore()
     const name = storeToRefs(shopBrandsStore).full_name
     console.log('name',name)
const logout = async()=>{
    await authStore.logout()
}
const mainMenuItems = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        items: [
            {
                label: 'Overview',
                icon: 'pi pi-chart-line'
            },
            {
                label: 'Analytics',
                icon: 'pi pi-chart-pie'
            }
        ]
    },
    {
        label: 'Shop Brands',
        icon: 'pi pi-building',
        items: [
            { label: 'Manage Brands', icon: 'pi pi-cog',command: () => {
                    navigateTo('/shopBrands');
                } },
                { label: 'Manage Shops', icon: 'pi pi-cog',command: () => {
                    navigateTo('/shops');
                } }
                
        ]
    },
    {
        label: 'Products',
        icon: 'pi pi-box',
        items: [
            { label: 'Manage Products', icon: 'pi pi-tags' },
            { label: 'Add New Product', icon: 'pi pi-plus', command:()=>{
                navigateTo('/products');
            }},
            { label: 'Products Brands', icon: 'pi pi-plus', command:()=>{
                navigateTo('/product_brands');} },

            { label: 'Categories', icon: 'pi pi-list', command:()=>{
                navigateTo('/category');
            } },
            { label: 'Inventory', icon: 'pi pi-th-large', command:()=>{
                navigateTo('/inventory');} },
            { label: 'Add Featured Products', icon: 'pi pi-plus', command:()=>{
                navigateTo('/featured_products');} },
            { label: 'Get All Featured Products', icon: 'pi pi-th-large', command:()=>{
                        navigateTo('/get_all_featured_products');} },
            { label: 'Product Reviews', icon: 'pi pi-comments' }
        ]
    },
    {
        label: 'Orders',
        icon: 'pi pi-shopping-cart',
        items: [
            { label: 'New Orders', icon: 'pi pi-plus-circle' },
            { label: 'Pending Orders', icon: 'pi pi-clock',command:()=>{
                navigateTo('/orders'); } },
            { label: 'Completed Orders', icon: 'pi pi-check' },
            { label: 'Cancelled Orders', icon: 'pi pi-times' },
            { label: 'View Cart', icon: 'pi pi-eye',command:()=>{
                navigateTo('/cart'); }},
            { label: 'Manage Discounts', icon: 'pi pi-percentage' },
            { label: 'Checkout', icon: 'pi pi-check' }
        ]
    },
    {
        label: 'Customers',
        icon: 'pi pi-users',
        items: [
            { label: 'Customer List', icon: 'pi pi-list' },
            { label: 'Customer Feedback', icon: 'pi pi-comment' },
            { label: 'Customer Groups', icon: 'pi pi-users' },
            { label: 'Loyalty Programs', icon: 'pi pi-star' }
        ]
    },
    {
        label: 'Influencer',
        icon: 'pi pi-users',
        items: [
            { label: 'Create Influencer', icon: 'pi pi-list',command:()=>{
                navigateTo('/influencer');} },
           
        ]
    },
    {
        label: 'Adverts',
        icon: 'pi pi-bullhorn',
        items: [
            { label: 'Manage Adverts', icon: 'pi pi-pencil' },
            { label: 'Create Advert', icon: 'pi pi-plus',command:()=>{
                navigateTo('/adverts');} },
            { label: 'Advert Analytics', icon: 'pi pi-chart-bar' }
        ]
    },
    {
        label: 'Reports',
        icon: 'pi pi-chart-bar',
        items: [
            { label: 'Sales Report', icon: 'pi pi-dollar' },
            { label: 'Inventory Report', icon: 'pi pi-box' },
            { label: 'Customer Report', icon: 'pi pi-user' },
            { label: 'Revenue Report', icon: 'pi pi-money-bill' }
        ]
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
            { label: 'Profile Settings', icon: 'pi pi-user-edit' },
            { label: 'Security Settings', icon: 'pi pi-shield' },
            { label: 'Payment Methods', icon: 'pi pi-credit-card' },
            { label: 'Currencies', icon: 'pi pi-money-bill' ,command:()=>{
                navigateTo('/currency_dashboard');}},
            { label: 'Discounts', icon: 'pi pi-percentage',command:()=>{
                navigateTo('/discount');} },
            { label: 'Discount Types', icon: 'pi pi-percentage',command:()=>{
                navigateTo('/discount_type');} },
            { label: 'Addresses', icon: 'pi pi-map' },
            { label: 'Shipping Methods', icon: 'pi pi-truck' }
        ]
    },
    {
        label: 'Admin',
        icon: 'pi pi-lock',
        items: [
            { label: 'User Management', icon: 'pi pi-users' ,command:()=>{
                navigateTo('/signup');}},
            { label: 'View Users', icon: 'pi pi-eye' ,command:()=>{
                    navigateTo('/users');}},
            { label: 'Roles & Permissions', icon: 'pi pi-key' },
            { label: 'Access Control', icon: 'pi pi-shield' },
            { label: 'System Logs', icon: 'pi pi-file' },
            { label: 'API Settings', icon: 'pi pi-code' }
        ]
    }
]);
</script>
<style>
.nxl-navigation .navbar-content {
    padding: 10px 0;
    position: relative;
    border-right: 1px solid #e5e7eb;
    height: calc(100vh - 80px);
    overflow-y: auto !important;
}
img.logo.logo-lg {
    height: auto;
    width: 205px;
}
</style>