<template>
      <link rel="stylesheet" href="/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/css/theme.min.css.map" />
      <link rel="stylesheet" href="/css/theme.min.css" />
      <link rel="stylesheet" href="/css/bootstrap.min.css.map" />
      <link rel="stylesheet" href="/vendors/css/vendors.min.css" />
      <link rel="stylesheet" href="/vendors/css/daterangepicker.min.css" />
      <Side-Nav/>
      
      <Header/>
      
      <main class="nxl-container">
      <slot />

      
      </main>
</template>
<script>
export default {
 head(){
      return {
          script: [
              {
                src: "/js/bootstrap.bundle.min.js",
              },
              {
                src: "/vendors/js/vendors.min.js",
              },
              {
                src: "/js/common-init.min.js",
              },
              {
                src: "/js/theme-customizer-init.min.js",
              },
              {
                src: "/vendors/js/daterangepicker.min.js",
              },
              {
                src: "/vendors/js/apexcharts.min.js",
              },
              {
                src: "/vendors/js/circle-progress.min.js",
              },
              {
                src: "/js/dashboard-init.min.js",
              }
          ]
      }
  },
}
</script>

