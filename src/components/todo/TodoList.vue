<template>
  <div class="max-h-[250px] overflow-y-auto grid grid-cols-1 gap-3">
    <TodoItem    
      v-for="todo in todos"
      :key="todo.id"
      @changeState="todo.completed = $event.target.checked"
      :todoItem="todo"
    ></TodoItem>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: {
    type: Object,
    required: true,   
  },
})
const emit = defineEmits(['addTodo'])
</script>

