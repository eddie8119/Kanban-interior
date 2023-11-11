<template>
  <div class="flex items-center justify-between text-gray-text cursor-pointer my-[20px] mx-[2px] text-[14px]">
    <div class="flex items-center">
      <span
        v-for="filter in filters"
        :key="filter.value"
        @click="$emit('changeFilter', filter.value)"
        class="mr-[14px] duration-300"
        :class="[selected === filter.value? 'text-[#6b729c] scale-125':'' ]"
        >{{ filter.label }}</span
      >  
    </div>
    <span @click="$emit('clearDone')">刪除已完成</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    selected: {
      type: String,
      required: true,   
    },
  })
  const emit = defineEmits(['changeFilter', 'clearDone'])
  const filters = [
    { label: "全部", value: "all" },
    { label: "已完成", value: "done" },
    { label: "未完成", value: "todo" },
  ];
</script>
