import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";
export const useAuthStore = defineStore('auth', {
  state: () => ({
   isLoading: false,
    
  }),
  getters: {
  
  },
  actions: {
    async login(info:any){
        let data = JSON.stringify({
           "email": info.email,
           "password": info.password
       });
  
        const config = {
           method: 'post',
           url: '/auth/login',
           headers: { 
              'Content-Type': 'application/json'
           },
           data : data
        }; 
  
        const result: any = await axios(config).then(function (response) {
           return {
              data: response.data,
              success: true
           }
        }).catch(function (error) {
           console.log(error);
  
           return {
              success: false
           }
        });
        return result;
     },
     async logout() {
      Swal.fire({
        icon: 'question',
        title: 'Log Out',
        text: 'Do you want to log out',
        showCancelButton: true
      }).then(async (result)=>{
        if(result.isConfirmed){  
          // Reset Offline DB
   
          // Clear session
          await $fetch('/auth/logout', { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }).then(()=>{
            // Reload App
            reloadNuxtApp();
          }).catch((error)=>{
            console.log(error);
          });
        }
      });
    }
  }
});