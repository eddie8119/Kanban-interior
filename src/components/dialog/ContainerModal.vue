<template>
  <Transition name="fade">
    <div v-if="value"
      class="z-5 fixed top-0 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-black/25">
      <div class="relative min-w-[290px] max-w-[600px] px-4">
        <div class="relative rounded-lg bg-white shadow">
          <div class="flex items-center justify-between rounded-t border-b p-5">
            <h3 class="text-xl font-semibold text-gray-900">
              室內工地手帳 | 要幫室內設計師省 3000 元
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
              為什麼能幫設計師省 3000 : <br>
              在工地時常自己一個遺漏，至少就是一個點工 3000 起跳，
              若是材料報銷了，更慘，這些都是公司額外的成本負擔。
              「室內工地手帳」目標是更好的紀錄管理，減少遺漏項目的機會，工地進展就順了，錢也省了。
            </p>
            <p class="text-base leading-relaxed text-gray-500">
              使用操作方式 : <br>
              可以在桌機與手機上直接使用，無須註冊，但您記錄的資料只會獨立存在該機器上。
              如果你想要在辦公室使用電腦，在工地使用手機，彼此資料可以互通的話，就需要<router-link class=" text-funsugarMain" :to="{ name: 'Register' }"> 註冊 </router-link>帳號。<br>
              (目前手機電腦連通功能還沒完成，但您依然可以註冊，這樣做好的第一時間將會通知您。以及掌握往後推出的室內軟體工具最新訊息)              
            </p>
            <p class="text-base leading-relaxed text-gray-500">
              室內手帳開發紀錄 : <br>
              2023 / 10 : 測試版上線，提供第一線設計師體驗。<br>
              核心功能已完成，還有地方會再優化，歡迎設計師 email 交流。  
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
