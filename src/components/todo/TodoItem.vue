<template>
  <div class="todo-item bg-white p-[16px] rounded-[8px]" :class="{ done: todoItem.completed }">
    <label class="flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        class="mr-[16px] opacity-0"
        :checked="todoItem.completed"
        @click="$emit('changeState', $event)"
      />
      {{ todoItem.content }}
      <span class="check-button absolute top-0"></span>
    </label>
  </div>
</template>

<script setup>
  const props = defineProps({
    todoItem: {
      type: Object,
      required: true,   
    },
  })
  const emit = defineEmits(['changeState'])
</script>

<style>
.todo-item.done label {
  text-decoration: line-through;
  font-style: italic;
}

.todo-item label span.check-button::before,
.todo-item label span.check-button::after {
  content: "";
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.todo-item label span.check-button::before {
  border: 1px solid #ffcc00;
}

.todo-item label span.check-button::after {
  transition: 0.4s;
  background: #ffcc00;
  transform: translate(1px, 1px) ;
  opacity: 0;
}



.todo-item input:checked + span.check-button::after {
  opacity: 1;
}
</style>