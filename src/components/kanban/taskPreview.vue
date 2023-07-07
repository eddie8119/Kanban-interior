<template>
  <Transition name="fade" mode="out-in">
    <div v-if="card.is_editing_card" class="flex w-full flex-col rounded-md border-gray-400 bg-white">
      <input v-model="card.title" type="text"
        class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
        placeholder="Add Card Title" />
      <textarea v-model="card.content"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
        placeholder="Add Card Content" />
      <div class="mt-2 flex w-full place-items-center justify-between">
        <Button model="outline" size="sm" rounded="sm" @click="handleDeleteCard(card.id)">
          Delete Card {{ index }}
        </Button>
        <div class="flex">
          <SaveIcon height="30px" class="mr-2 cursor-pointer rounded-full bg-blue-500 p-1 text-white hover:bg-blue-700"
            @click="handleEditCard('save', card)" />
          <CloseIcon height="30px" class="cursor-pointer rounded-full p-1 text-red-500 hover:bg-red-600 hover:text-white"
            @click="handleEditCard('cancel', card)" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col" @click="handleEditCard('change', card)">
        <div class="flex place-items-center justify-between">
          <h1 class="text-sm font-semibold">
            {{ card.title }}
          </h1>
          <MoveIcon height="25px" class="cursor-grab rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
            @click.stop="" />
        </div>
        <pre class="mt-1 whitespace-pre-wrap font-sans text-sm">{{
          card.content
        }}</pre>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from '@/components/base/Button.vue'
import MoveIcon from '@/components/icons/MoveIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'

const props = defineProps({
  card: {
    type: Object,
  },
})

const emit = defineEmits(['handleEditCard','handleDeleteCard'])

const handleEditCard = (type, selectedCard) => {
  emit('handleEditCard', type, selectedCard)
}

const handleDeleteCard = (id) => {
  emit('handleDeleteCard',id)
}

</script>

