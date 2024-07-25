<template>
  <main>
    <!-- <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="templating">
        <template #message="slotProps">
            <div class="flex p-4">
                <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                <p class="pl-2">{{slotProps.message.message}}</p>
            </div>
        </template>
    </ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog> -->
    <Toast/>
    <NuxtPage />
  </main>
</template>
<style>

</style>
<script>
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import  "~/public/css/primeblocks.css"
import "~/public/css/theme.min.css"
// import "~/public/css/theme.min.css.map"
// import "~/public/css/bootstrap.min.css.map"
import "~/public/css/bootstrap.min.css"
</script>
