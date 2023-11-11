<template>
  <div class="input-add w-full flex items-center relative">
    <input type="text" placeholder="輸入待辦" class="w-full py-[16px] border-none rounded-[48px] text-[16px] shadow-main-box-shadow cursor-pointer placeholder-gray-300" v-model="todoContent" @keyup.enter="addTodo" />
    <Button class="w-[46px] h-[46px] bg-funsugarMain rounded-full absolute right-2 color-main"
        @click="addTodo">
        <div class="w-full h-full flex items-center justify-center text-white">
          <PlusIcon height="25px" />   
        </div>               
    </Button>
  </div> 
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import PlusIcon from '@/components/icons/PlusIcon.vue'

const emit = defineEmits(['addTodo'])

const todoContent = ref('')
const addTodo = () => {
  if (todoContent.value.trim() === '') return
  const todo = {
    id: uuidv4(),
    content: todoContent.value.trim(),
    completed: false,
  };
  todoContent.value = "";
  emit("addTodo", todo);  
};
</script>

