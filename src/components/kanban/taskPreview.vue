<template>
  <Transition name="fade" mode="out-in" class="max-h-[150px]">
    <div v-if="card.is_editing_card" class="flex w-full h-full flex-col rounded-md  bg-white">
      <input v-model="card.title" type="text"
        class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
        placeholder="新增標題(必填)" />
      <textarea v-model="card.content"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
        placeholder="新增內容" />
      <img :src="card.src" class="w-full" alt="">
      <!--  -->
      <div class="mt-2 flex w-full place-items-center justify-between">
        <Button model="outline" size="sm" rounded="sm" @click="handleDeleteCard(card.id)">
          刪除本卡 {{ index }}
        </Button>
        <div class="flex">
          <SaveIcon height="30px" class="mr-2 cursor-pointer rounded-full bg-blue-500 p-1 text-white hover:bg-blue-700"
            @click="handleEditCard('save', card)" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col">
        <div @click="handleEditCard('change', card)">
          <div class="flex w-full items-center">
            <div class="w-full text-center">
              <h2 class="text-lg font-semibold ">
                {{ card.title }}
              </h2>
            </div>
            <MoveIcon height="25px"
              class="column-drag-handle cursor-grab rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
               />
          </div>
          <div class="max-h-[60px] overflow-y-auto">
            <p class="mt-1 whitespace-pre-wrap font-sans text-sm">{{ card.content }}</p>
          </div>
        </div>
        <div class="flex justify-between text-sm items-center">
          <button class="
          mt-[10px]
          w-[20%]          
          rounded 
          py-1" :class="[card.isDone ? 'bg-[#f4592b]' : 'bg-[#5cdb95] text-white']"
            @click="handleEditCard('isdone', card)">{{
              card.isDone ? '完成' : '未完成' }}
          </button>  
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from '@/components/base/Button.vue'
import MoveIcon from '@/components/icons/MoveIcon.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['handleEditCard', 'handleDeleteCard'])

const handleEditCard = (type, selectedCard) => {
  emit('handleEditCard', type, selectedCard)
}

const handleDeleteCard = (id) => {
  emit('handleDeleteCard', id)
}
</script>
<style scoped>

</style>
