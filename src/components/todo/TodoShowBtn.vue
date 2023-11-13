<template>
    <Button class="hidden md:block w-[75px] h-[75px] bg-funsugarMain rounded-full shadow-main-box-shadow ">
        <div class="w-full h-full flex flex-col items-center justify-center text-white">
            <ListIcon height="25px" />  
            <p class="text-lg">速記</p> 
        </div>               
    </Button>
</template>

<script setup>
import ListIcon from "@/components/icons/ListIcon.vue";
</script>