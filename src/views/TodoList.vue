<template>
  <div class="w-full h-[calc(100vh-70px)] flex items-start justify-center py-6 sm:py-12">
    <div class="w-[90%] h-full max-w-[400px] rounded-3xl py-[45px] px-[28px] bg-main-gray shadow-main-box-shadow ">
        <h1 class="text-center mb-[20px] text-[28px]">工地待辦事項速記</h1>
        <TodoAdd @addTodo="addTodo" />
        <TodoFilter @changeFilter="filter = $event" @clearDone="clearDone" :selected="filter"/>
        <TodoList :todos="filteredTodos" class="max-h-[calc(100vh-430px)]"/>
    </div> 
  </div> 
</template>

<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import TodoAdd from "../components/todo/TodoAdd.vue"
  import TodoFilter from "../components/todo/TodoFilter.vue"
  import TodoList from "../components/todo/TodoList.vue"
    
  const store = useStore()
  const todos = computed(() => store.getters['todo/getTodoDatas'])

  const addTodo = (todo) => {
    todos.value.push(todo)
    store.commit("todo/SET_TODO", todos.value)
  }

  const clearDone = () => {
    const filteredTodos = todos.value.filter(todo => !todo.completed);
    todos.value = filteredTodos;
    store.commit("todo/SET_TODO", filteredTodos);
  }

  const filter = ref("all");
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "done":
        return todos.value.filter(todo => todo.completed)
      case "todo":
        return todos.value.filter(todo => !todo.completed)
      default:
        return todos.value
    }
  })
</script>
