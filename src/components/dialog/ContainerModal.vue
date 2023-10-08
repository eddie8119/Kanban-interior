<template>
  <Transition name="fade">
    <div v-if="value"
      class="z-5 fixed top-0 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-black/25">
      <div class="relative min-w-[290px] max-w-[600px] px-4">
        <div class="relative rounded-lg bg-white shadow">
          <div class="flex items-center justify-between rounded-t border-b p-5">
            <h3 class="text-xl font-semibold text-gray-900">
              室內工地手帳 | 最少幫設計師省 3000 元
            </h3>
            <div class="flex justify-end p-2">
              <button type="button"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                @click="closeContainerModal">
                <CloseIcon height="25px" />
              </button>
            </div>
          </div>
          <div class="space-y-6 p-6 max-h-[300px] overflow-auto">
            <p class="text-base leading-relaxed text-gray-500">
              使用方式: <br>
              可以在桌機與手機上直接使用，您記錄的資料只會獨立存在該機器上。如果你想要在
              辦公室使用電腦，在工地使用手機彼此資料可以互通的話，就需要註冊帳號。          
            </p>
            <p class="text-base leading-relaxed text-gray-500">
              為什麼能幫你省 3000: <br>
              在工地有時自己一個漏掉，就是至少要點一個工，300起跳了，
              更不用說可能還有材料費，另一個工種的點工...。都是公司衍伸的成本負擔。
              「 室內工地手帳」便於你紀錄提醒，希望能幫每個設計師，大大減少遺漏工項的機會。
            </p>
          </div>
          <div class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 px-6 py-4">
            <Button model="outline" size="sm" rounded="md" @click="closeContainerModal"> 關閉 </Button>          
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from '@/components/base/Button.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
    default: false,
  },
})
const emits = defineEmits(['closeContainerModal'])

const closeContainerModal = () => {
  emits('closeContainerModal')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
