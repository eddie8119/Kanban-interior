<template>
    <div class="w-full h-full flex justify-center py-6 sm:py-12">
      <div class="w-[90%] h-full max-w-[400px] rounded-3xl py-[45px] px-[28px] bg-main-gray shadow-main-box-shadow ">
          <h1 class="text-center mb-[20px] text-[28px]">工料進場紀錄</h1>
          <AmountAdd :constructionList="constructionList" />         
          <!-- <ChartAmount /> -->
          <!-- <AmountList :Amounts="filteredAmounts" class="max-h-[calc(100vh-430px)]"/> -->
      </div> 
    </div> 
  </template>
  
  <script setup>
    import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
    import AmountAdd from "./AmountAdd.vue"
        
    const store = useStore() 
    const constructionList = reactive([])

    onBeforeMount(async () => {
      store.commit("app/SET_LOADING", true)

      let dataForMaterial = store.getters['vuello/getVuelloDatas']

      if (!dataForMaterial) {
        const { data } =  await axios.get('/sample-data.json')                   
        const { containers } = data    
      } else {
        dataForMaterial.containers.forEach(container => {         
          constructionList.push(container.name)           
        });     
      }

      store.commit("app/SET_LOADING", false)
    })
  </script>
  