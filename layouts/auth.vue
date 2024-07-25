<template>
    <main>
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="css/theme.min.css.map" />
      <link rel="stylesheet" href="css/theme.min.css" />
      <link rel="stylesheet" href="css/bootstrap.min.css.map" />
      <link rel="stylesheet" href="vendors/css/vendors.min.css" />
   <div class="layout-main-container">
    <div class="layout-main">
      <slot />
    </div>
  </div>
  </main>
</template>
<script>
export default {
 head(){
      return {
          script: [
              {
                src: "js/bootstrap.bundle.min.js",
              },
              {
                src: "js/vendors.min.js",
              },
              {
                src: "js/common-init.min.js",
              },
              {
                src: "js/theme-customizer-init.min.js",
              }
          ]
      }
  },
}
</script>

