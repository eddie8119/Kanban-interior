<template>
  <div class="flex h-full w-full overflow-auto rounded-lg bg-red-100 px-2 py-3">
    <TransitionGroup name="list">
      <div v-for="container in vuello.containers" :key="container.id" class="mx-1">
        <div class="min-h-[50px] min-w-[300px] max-w-[300px] rounded-lg bg-[#E4E5EC] p-1"
          @drop="dropItem($event, container.id)" @dragenter.prevent @dragover.prevent>
          <div class="flex h-full w-full place-items-center justify-between p-1">
            <Transition name="fade" mode="out-in">
              <input v-if="container.is_editing_container" v-model="container.name" type="text"
                class="block w-full rounded-lg border-2 border-blue-500 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                placeholder="輸入工程類型" @keypress.enter="handleKanbanAction(null, null, container)"
                @focus="$event.target.select()" @blur="blurWorkType(container)" />
              <div v-else class="text-md my-[0.30rem] w-full cursor-pointer p-1 font-semibold"
                @click="addWorkType(container)">
                {{ container.name }}工種 ({{ cardList(container.id).length }})
              </div>
            </Transition>
            <TrashIcon height="25px"
              class="cursor-pointer rounded-full p-1 text-red-400 hover:bg-red-200 hover:text-red-700"
              @click="handleDeleteContainer(container.id)" />
          </div>
          <div class="flex flex-col overflow-y-auto" style="max-height: calc(100vh - 165px)">
            <div v-for="card in cardList(container.id)" :key="card.id" class="m-1 cursor-pointer rounded-lg bg-white p-2"
              :draggable="state.isDraggable" @dragstart="dragItem($event, card)">
              <taskPreview :card="card" @handleEditCard="handleEditCard" @handleDeleteCard="handleDeleteCard" />
            </div>
            <div class="m-1 flex flex-col place-items-center justify-center">
              <Transition name="fade">
                <div v-if="container.is_adding_card" class="flex w-full flex-col rounded-md border-gray-400 bg-white p-2">
                  <form @submit.prevent="addCard(container.id, container)" v-click-outside="onClickOutside">
                    <input v-model="newCardData.title" type="text"
                      class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add Card Title" />
                    <textarea v-model="newCardData.content"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add Card Content" />
                    <div class="mt-2 flex w-full place-items-center">
                      <button class="add-card-btn">新增待辦</button>
                      <CloseIcon height="30px"
                        class="cursor-pointer rounded-full p-1 text-red-500 hover:bg-red-600 hover:text-white"
                        @click="deleteTask(container)" />
                    </div>
                  </form>
                </div>
              </Transition>
              <Transition name="fade" mode="out-in">
                <Button v-if="!container.is_adding_card" type="primary" model="outline" size="sm" rounded="sm"
                  class="mt-1" @click="container.is_adding_card = true">
                  <PlusIcon height="15px" />
                  新增施做項目
                </Button>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <addContainerArea :is-addingContainer="state.isAddingContainer" @toggleAddContainer='toggleAddContainer'
      @addContainer="addContainer" @deleteContainer='deleteContainer' />
  </div>

  <!-- Confirmation Modal -->
  <ConfirmationModal :value="state.isRemovingContainer" @confirm="deleteDialog('container')"
    @close="state.isRemovingContainer = false">
    All Contents inside this Container will also be deleted. Are you sure?
  </ConfirmationModal>
  <ConfirmationModal :value="state.isRemovingCard" @confirm="deleteDialog('card')" @close="state.isRemovingCard = false">
    確認刪除此項施做卡片?
  </ConfirmationModal>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import ConfirmationModal from '@/components/dialog/ConfirmationModal.vue'
import Button from '@/components/base/Button.vue'
import MoveIcon from '@/components/icons/MoveIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import taskPreview from './taskPreview.vue'
import addContainerArea from './addContainerArea.vue'
import vClickOutside from 'click-outside-vue3'

const directives = {
  clickOutside: () => {
    vClickOutside.directive
  }
}

const props = defineProps({
  payload: {
    type: Object,
    required: true,
    default: () => { },
  },
})

const store = useStore()
const state = reactive({
  isDraggable: false,
  isAddingContainer: false,
  isRemovingContainer: false,
  isRemovingCard: false,
  selectedContainerId: null,
  selectedCardId: null,
  tempCards: [],
})
const newCardData = reactive({
  id: null,
  id_container: null,
  title: null,
  content: null,
  created_at: null,
})
const vuello = reactive({
  title: null,
  last_modified: null,
  containers: [],
  cards: [],
})
const addWorkTypeOnce = ref(true)
const addWorkTypeOnceId = ref(null)

watch(
  () => props.payload,
  (newValue) => {
    vuello.title = newValue.title
    vuello.last_modified = newValue.last_modified
    vuello.containers = newValue.containers
    vuello.cards = newValue.cards
  },
  { immediate: true }
)

// 工種輸入框
const addWorkType = (container) => {
  if (!addWorkTypeOnce.value) {
    if (addWorkTypeOnceId.value !== container.id) {
      vuello.containers.map(container => {
        container.is_editing_container = false
      }) 
      container.is_editing_container = true
      addWorkTypeOnceId.value = container.id
      addWorkTypeOnce.value = false    
    } else return 
  } else {
    container.is_editing_container = true
    addWorkTypeOnceId.value = container.id
    addWorkTypeOnce.value = false
  }
}
const blurWorkType = (container) => {
  container.is_editing_container = false
  addWorkTypeOnce.value = true
}


const cardList = (containerId) => {
  return vuello.cards.filter((card) => card.id_container === containerId)
}
const dragItem = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id', item.id)
}
const dropItem = (event, containerId) => {
  const id = event.dataTransfer.getData('id')
  const item = vuello.cards.find((card) => card.id == id)
  item.id_container = containerId
  vuello.last_modified = new Date().toLocaleString('zh-TW')
  store.dispatch('vuello/setVuello', vuello)
}
const handleDeleteContainer = (id) => {
  state.selectedContainerId = id
  state.isRemovingContainer = true

}
const handleDeleteCard = (id) => {
  state.selectedCardId = id
  state.isRemovingCard = true
}

const deleteDialog = (type) => {
  if (type === 'container') {
    vuello.containers = vuello.containers.filter(
      (container) => container.id !== state.selectedContainerId
    )
    vuello.cards = vuello.cards.filter(
      (card) => card.id_container !== state.selectedContainerId
    )
  } else {
    vuello.cards = vuello.cards.filter(
      (card) => card.id !== state.selectedCardId
    )
  }
  vuello.last_modified = new Date().toLocaleString('zh-TW')
  store.dispatch('vuello/setVuello', vuello)
  state.isRemovingContainer = false
  state.isRemovingCard = false
}
// 任務
const addCard = (containerId, payload) => {
  if (!newCardData.title) return payload.is_adding_card = false
  const newCard = {
    id: vuello.cards.length > 0 ? [...vuello.cards].pop().id + 1 : 1,
    id_container: containerId,
    title: newCardData.title,
    content: newCardData.content,
  }
  vuello.cards.push(newCard)
  payload.is_adding_card = false
  if (payload) {
    payload.is_editing_container
      ? (payload.is_editing_container = false)
      : (payload.is_editing_card = false)
  }
  cardChangedInitialize()
}
const leaveAddCard = () => {
  payload.is_adding_card = false
  cardChangedInitialize()
}
// const onClickOutside = (event) => {
//   console.log('Clicked outside. Event: ', event)
// }
const deleteTask = (payload) => {
  payload.is_adding_card = false
  cardChangedInitialize()
}

// 增加白板
const addContainer = (newContainerTitle) => {
  if (!newContainerTitle) return state.isAddingContainer = false
  const newContainer = {
    id:
      vuello.containers.length > 0
        ? [...vuello.containers].pop().id + 1
        : 1,
    name: newContainerTitle,
  }
  vuello.containers.push(newContainer)
  state.isAddingContainer = false
  cardChangedInitialize()
}
const deleteContainer = () => {
  state.isAddingContainer = false
  cardChangedInitialize()
}
const toggleAddContainer = () => {
  state.isAddingContainer = true
}

const cardChangedInitialize = () => {
  vuello.last_modified = new Date().toLocaleString('zh-TW')
  store.dispatch('vuello/setVuello', vuello)
  newCardData.id = null
  newCardData.id_container = null
  newCardData.title = null
  newCardData.content = null
}
// 
const handleKanbanAction = (type, containerId, payload) => {
  if (type === 'container') {
    vuello.containers = vuello.containers.filter(
      (container) => container.id !== containerId
    )
    state.isRemovingContainer = false
    addWorkTypeOnce.value = true
  }
  vuello.cards = vuello.cards.filter(
    (card) => card.id_container !== containerId
  )
  if (payload) {
    payload.is_editing_container
      ? (payload.is_editing_container = false)
      : (payload.is_editing_card = false)
  }
  cardChangedInitialize()
}
const handleEditCard = (type, selectedCard) => {
  switch (type) {
    case 'change':
      selectedCard.is_editing_card = true
      state.tempCards = vuello.cards.map((card) => ({ ...card }))
      break
    case 'save':
      handleKanbanAction(null, null, selectedCard)
      break
    case 'cancel':
      const data = state.tempCards.find((card) => card.id === selectedCard.id)
      selectedCard.title = data.title
      selectedCard.content = data.content
      selectedCard.is_editing_card = false
      break
  }
}
</script>


<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
