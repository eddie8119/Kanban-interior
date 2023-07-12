<template>
  <div class="mx-1">
    <div
      class="opacity-60 flex min-h-[50px] min-w-[300px] flex-col place-items-center justify-center rounded-lg bg-[#f3f3f3] p-2">
      <Transition name="fade" v-if="isAddingContainer">
        <form @submit.prevent="addContainer" class="w-full flex-col">
          <input v-model="newContainerTitle" type="text"
            class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
            placeholder="輸入新增工程類型" @keypress.enter="addContainer" />
          <div class="mb-1 flex w-full place-items-center justify-end">            
            <Button type="primary" model="outline" size="sm" rounded="sm">              
              新增
            </Button>
            <CloseIcon height="30px"
              class="cursor-pointer rounded-full p-1 text-red-500 hover:bg-red-600 hover:text-white"
              @click="$emit('deleteContainer')" />
          </div>
        </form>
      </Transition>
      <Transition name="fade" mode="out-in">
        <Button v-if="!isAddingContainer" type="primary" model="outline" size="sm" rounded="sm"
          @click="$emit('toggleAddContainer')">
          <PlusIcon height="15px" />
          新增工程類種
        </Button>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import Button from '@/components/base/Button.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

const props = defineProps({
  isAddingContainer: {
    type: Boolean,
  },
})
const emit = defineEmits(['toggleAddContainer', 'addContainer', 'deleteContainer'])

const newContainerTitle = ref(null)

const addContainer = () => {
  emit('addContainer', newContainerTitle.value)
  newContainerTitle.value = null
}


</script>

<style></style>