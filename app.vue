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
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
.layout-wrapper, body {
    background-color: #ffffff;
    font-family: "IBM Plex Sans" !important;
    color: #423939 !important;
}
.p-button-label {
  font-family: "IBM Plex Sans" !important;
}
.p-component {
    font-family: 'IBM Plex Sans' !important;
    font-feature-settings: var(--font-feature-settings, normal);
    font-size: 1rem;
    font-weight: normal;
}
span.font-bold.text-900.ml-2 {
  font-family: "IBM Plex Sans" !important;
}
.ibm-plex-sans-thin {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 100;
  font-style: normal;
}

.ibm-plex-sans-extralight {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 200;
  font-style: normal;
}

.ibm-plex-sans-light {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.ibm-plex-sans-regular {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.ibm-plex-sans-medium {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.ibm-plex-sans-semibold {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.ibm-plex-sans-bold {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.ibm-plex-sans-thin-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 100;
  font-style: italic;
}

.ibm-plex-sans-extralight-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 200;
  font-style: italic;
}

.ibm-plex-sans-light-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.ibm-plex-sans-regular-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.ibm-plex-sans-medium-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.ibm-plex-sans-semibold-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 600;
  font-style: italic;
}

.ibm-plex-sans-bold-italic {
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 700;
  font-style: italic;
}

</style>
