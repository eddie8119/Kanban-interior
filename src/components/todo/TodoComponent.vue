<template>
    <div class="w-full h-full flex justify-center py-6 sm:py-12">
      <div class="w-[90%] h-full max-w-[400px] rounded-3xl py-[45px] px-[28px] bg-main-gray shadow-main-box-shadow ">
          <h1 class="text-center mb-[20px] text-[28px]">工地待辦事項速記</h1>
          <TodoAdd @addTodo="addTodo" />
          <TodoFilter @changeFilter="filter=$event" @clearDone="clearDone" :selected="filter"/>
          <TodoList :todos="filteredTodos" class="max-h-[calc(100vh-430px)]"/>
      </div> 
    </div> 
  </template>
  
  <script setup>
    import { ref, reactive, computed, watch } from 'vue'
    import { useStore } from 'vuex'
    import TodoAdd from "./TodoAdd.vue"
    import TodoFilter from "./TodoFilter.vue"
    import TodoList from "./TodoList.vue"
      
    const store = useStore()
    const getTodos = computed(() => store.getters['todo/getTodoDatas'])
  
    const addTodo = (todo) => {     
      getTodos.value.push(todo)
      store.commit("todo/SET_TODO", getTodos.value)
    }
  
    const clearDone = () => {
      let filteredTodos = getTodos.value.filter(todo => !todo.completed);
      getTodos.value = filteredTodos;
      store.commit("todo/SET_TODO", filteredTodos);
    }
  
    const filter = ref("all");
    const filteredTodos = computed(() => {
      switch (filter.value) {
        case "done":
          return getTodos.value.filter(todo => todo.completed)
        case "todo":
          return getTodos.value.filter(todo => !todo.completed)
        default:
          return getTodos.value
      }
    })
  </script>
  