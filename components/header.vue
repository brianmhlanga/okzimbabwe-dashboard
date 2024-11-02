<template>
     <header class="nxl-header">
        <div class="header-wrapper">
            <!--! [Start] Header Left !-->
            <div class="header-left d-flex align-items-center gap-4">
                <!--! [Start] nxl-head-mobile-toggler !-->
                <a href="javascript:void(0);" class="nxl-head-mobile-toggler" id="mobile-collapse">
                    <div class="hamburger hamburger--arrowturn">
                        <div class="hamburger-box">
                            <div class="hamburger-inner"></div>
                        </div>
                    </div>
                </a>
                <!--! [Start] nxl-head-mobile-toggler !-->
                <!--! [Start] nxl-navigation-toggle !-->
                <!--! [End] nxl-navigation-toggle !-->
                <!--! [Start] nxl-lavel-mega-menu-toggle !-->
                <!--! [End] nxl-lavel-mega-menu-toggle !-->
                <!--! [Start] nxl-lavel-mega-menu !-->
                <div class="nxl-drp-link nxl-lavel-mega-menu">
                    <div class="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                        <a href="javascript:void(0)" id="nxl-lavel-mega-menu-hide">
                            <i class="feather-arrow-left me-2"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    <!--! [Start] nxl-lavel-mega-menu-wrapper !-->
                    <div class="nxl-lavel-mega-menu-wrapper d-flex gap-3">
                        <div class="dropdown nxl-h-item nxl-mega-menu">
                            <a  class="btn btn-light-brand" data-bs-toggle="dropdown" data-bs-auto-close="outside"> {{ formattedDateTime }} </a>
                        </div>
                    </div>
                </div>
                <!--! [End] nxl-lavel-mega-menu !-->
            </div>
            <!--! [End] Header Left !-->
            <!--! [Start] Header Right !-->
            <div class="header-right ms-auto">
                <div class="d-flex align-items-center">
                   
                    <div class="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
                        <SplitButton :label=name :model="items" @click="save" style="border-radius: 15px;" severity="info"></SplitButton>
                    </div>
                    
                </div>
            </div>
            <!--! [End] Header Right !-->
        </div>
    </header>
</template>
<script setup lang="ts">
const formattedDateTime = ref()
const country = ref()
const name = useCookie('username');
const getDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${day} ${date} ${month} ${formattedHours}:${formattedMinutes}${ampm}`;
}
const updateDateTime = () => {
      formattedDateTime.value = getDate();
}
const getCountryByIp = async () => {
      const token = '907f505cefa234'; // Replace with your actual API key
      const url = `https://ipinfo.io/json?token=${token}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        country.value = data.country;
      } catch (error) {
        console.error('Error fetching IP info:', error);
        country.value = 'Unknown';
      }
    };
onMounted(async() => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
})

</script>
<style>
a.btn.btn-light-brand {
    color: #0c0b0b;
}
.avatar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007bff; /* Change to your preferred color */
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
}

.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.avatar-initial {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    font-size: 1.2rem; /* Adjust size as needed */
    font-weight: bold;
}

</style>