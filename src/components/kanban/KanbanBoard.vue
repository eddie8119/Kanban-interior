<template>
  <div class="w-full grid grid-cols-1 gap-y-4 md:flex md:justify-between">
    <div class="flex items-center">
      <p class="mr-4 text-sm">全案狀態篩選:</p>
      <select class="w-[200px] h-[40px] mr-3 border rounded-lg flex items-center justify-center" v-model="selectedGlobal" @change="changeSelectGlobal(selectedGlobal)">
        <option :value="list.key" v-for="list of doneStatusListGlobal" :key="list.key">
          {{ list.name }}
        </option>
      </select>
    </div>
    <div class="flex items-center">
      <Button type="primary" model="outline" size="sm" rounded="sm" @click="updateJson()">
        先刷新資料
      </Button>
      <Button class="ml-2" type="primary" model="outline" size="sm" rounded="sm">
        <download-excel :data="json_data">
          輸出 Excel 報表
        </download-excel>
      </Button>
    </div>
  </div>
  <div class="flex h-[calc(100vh-226px)]  w-full overflow-auto rounded-lg px-2 py-3">
    <TransitionGroup name="list">
      <Container orientation="horizontal" @drop="onColumnDrop($event)" drag-handle-selector=".column-drag-handle">
        <Draggable v-for="container in vuello.containers" :key="container.key" class="mx-1">
          <div class="min-h-[50px] min-w-[300px] max-w-[300px] rounded-lg bg-[#f3f3f3] p-1">
            <div class="flex h-full w-full place-items-center justify-between p-1">
              <Transition name="fade" mode="out-in">
                <input v-if="container.is_editing_container" v-model="container.name" type="text"
                  class="block w-full rounded-lg border-2 border-blue-500 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                  placeholder="輸入工程類型" @keypress.enter="handleKanbanAction(null, null, container)"
                  @focus="$event.target.select()" @blur="blurWorkType(container)" />
                <div v-else class="flex text-md my-[0.30rem] w-full cursor-pointer p-1 font-semibold"
                  @click="addWorkType(container)">
                  <MoveIcon height="25px"
                    class="column-drag-handle cursor-grab rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700" />
                  {{ container.name }}工程 ({{ containerCardLength(container) }})
                </div>
              </Transition>
              <select v-if="checkSelectShow(container.cardList) === true"
                class="w-[100px] h-[40px] mr-3 border-none  rounded-lg flex items-center justify-center"
                v-model="container.selected_done" @change="changeSelect(container, container.selected_done)">
                <option :value="list.key" v-for="list of container.doneStatus" :key="list.key">
                  {{ list.name }}
                </option>
              </select>
              <TrashIcon height="25px"
                class="cursor-pointer rounded-full p-1 text-red-400 hover:bg-red-200 hover:text-red-700"
                @click="handleDeleteContainer(container.id)" />
            </div>
            <div class="max-h-[450px] overflow-y-auto">
              <Container group-name="col" class="flex flex-col " @drop="onCardDrop(container.id, $event)"
                :get-child-payload="getCardPayload(container.id)" drag-handle-selector=".column-drag-handle">
                <Draggable v-for="card in cardListFilter(container.cardList, container.selected_done) " :key="card.key"
                  class="m-[6px] cursor-pointer rounded-lg bg-white p-2">
                  <TaskPreview :card="card" @handleEditCard="handleEditCard" @handleDeleteCard="handleDeleteCard" />
                </Draggable>
              </Container>
            </div>

            <!--  -->
            <div class="m-1 flex flex-col place-items-center justify-center">
              <Transition name="fade">
                <div v-if="container.is_adding_card" class="flex w-full flex-col rounded-md border-gray-400 bg-white p-2">
                  <form @submit.prevent="addCard(container.id, container)" class="grid grid-cols-1 gap-y-2">
                    <input v-model="newCardData.title" type="text"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                      placeholder="新增標題(必填)" />
                    <textarea v-model="newCardData.content"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
                      placeholder="新增內容" />
                    <!-- <input class="" type="file" accept="image/*" @change="uploadFile"> -->
                    <div class="mt-2 flex w-full place-items-center">
                      <Button type="primary" model="outline" size="sm" rounded="sm" class="mt-1">
                        新增待辦
                      </Button>
                      <CloseIcon height="30px"
                        class="cursor-pointer rounded-full ml-2 p-1 text-red-500 hover:bg-red-600 hover:text-white"
                        @click="deleteTask(container)" />
                        <!-- <span>123</span> -->
                    </div>
                  </form>
                </div>
              </Transition>
              <Transition name="fade" mode="out-in">
                <Button v-if="!container.is_adding_card" type="primary" model="outline" size="sm" rounded="sm"
                  class="mt-1" @click="toggleAddingCard(container)">
                  <PlusIcon height="15px" />
                  施作項目
                </Button>
              </Transition>
            </div>
          </div>
        </Draggable>
        <AddContainerArea :is-addingContainer="state.isAddingContainer" @containerHandler='containerHandler' />
      </Container>
    </TransitionGroup>
  </div>

  <!-- Confirmation Modal -->
  <ConfirmationModal :value="state.isRemovingContainer" 
    @confirm="deleteDialog('container')"
    @close="state.isRemovingContainer = false">
    本欄位和之中的卡片將會一併刪除，確認嗎?
  </ConfirmationModal>
  <ConfirmationModal :value="state.isRemovingCard" 
    @confirm="deleteDialog('card')" 
    @close="state.isRemovingCard = false">
    確認刪除此項施做卡片?
  </ConfirmationModal>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from '../../utils/helpers'

import ConfirmationModal from '@/components/dialog/ConfirmationModal.vue'
import Button from '@/components/base/Button.vue'
import MoveIcon from '@/components/icons/MoveIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import TaskPreview from './TaskPreview.vue'
import AddContainerArea from './AddContainerArea.vue'
import smoothdemo from './Smoothdemo.vue'

const props = defineProps({
  payload: {
    type: Object,
    required: true,
    default: () => { },
  },
})
//select 完成狀態區
const selectedGlobal = ref("all")
const doneStatusListGlobal = reactive([
  {
    key: "all",
    name: "全部"
  },
  {
    key: "done",
    name: "完成"
  },
  {
    key: "undone",
    name: "未完成"
  }
])
const changeSelectGlobal = (value) => {
  vuello.containers.map(container => container.selected_done = value)
}
const changeSelect = (container, value) => {
  container.selected_done = value
}
const checkSelectShow = (cardList) => {
  return cardList.some(card => card.isDone === true)
}

// 資料區
const store = useStore()
const vuello = reactive({
  title: null,
  last_modified: null,
  containers: [],
  cards: [],
})
const newCardData = reactive({
  id: null,
  id_container: null,
  title: null,
  content: null,
})
const state = reactive({
  isDraggable: false,
  isAddingContainer: false,
  isRemovingContainer: false,
  isAddingCard: false,
  isRemovingCard: false,
  selectedContainerId: null,
  selectedCardId: null,
  tempCards: [],
})
//用於輸出報表
const json_data = reactive([])
const updateJson = () => {
  json_data.splice(0)
  vuello.containers.forEach(container => {
    const eachCardLists = container.cardList
    eachCardLists.forEach(list => {
      json_data.push({
        工種分類: vuello.containers.find(container => container.id === list.id_container).name,
        標題: list.title,
        明細: list.content,
        完成狀態: list.isDone === true ? '完成' : '未完成',
      })
    })
  })
}
watch(
  () => props.payload,
  (newValue) => {
    vuello.title = newValue.title
    vuello.last_modified = newValue.last_modified
    vuello.containers = newValue.containers
    vuello.cards = newValue.cards
    updateJson()
  },
  { immediate: true },
  { deep: true },
)
const containerCardLength = (container) => {
  return Object.keys(container.cardList).length
}
const cardListFilter = (cardList, selected) => {
  switch (selected) {
    case 'all':
      return cardList
    case 'done':
      return cardList.filter((card) => card.isDone === true)
    case 'undone':
      return cardList.filter((card) => card.isDone === false)
  }
}

// 編輯 工種輸入框
const addWorkTypeOnce = ref(true)

const addWorkType = (container) => {
  vuello.containers.forEach(container => {
    container.is_adding_card = false
    container.is_editing_container = false
  })
  container.is_editing_container = true
}
const blurWorkType = (container) => {
  container.is_editing_container = false  
}

// smooth-dnd方法
const onColumnDrop = (dropResult) => {
  vuello.containers = applyDrag(vuello.containers, dropResult)
  vuello.last_modified = new Date().toLocaleString('zh-TW')
  store.dispatch('vuello/setVuello', vuello)
}
const onCardDrop = (columnId, dropResult) => {
  let { removedIndex, addedIndex, payload } = dropResult
  if (removedIndex !== null || addedIndex !== null) {
    const column = vuello.containers.find(container => container.id === columnId)
    if (addedIndex !== null && payload) {
      dropResult.payload = {
        ...payload,
        id_container: column.id,
      }
    }
    column.cardList = applyDrag(column.cardList, dropResult)
    vuello.last_modified = new Date().toLocaleString('zh-TW')
    store.dispatch('vuello/setVuello', vuello)
  }
}
const getCardPayload = (columnId) => {
  return index =>
    vuello.containers.find(container => container.id === columnId).cardList[index]
}

// 確認刪除容器和卡片
const deleteDialog = (type) => {
  if (type === 'container') {
    vuello.containers = vuello.containers.filter(
      (container) => container.id !== state.selectedContainerId
    )
    vuello.cards = vuello.cards.filter(
      (card) => card.id_container !== state.selectedContainerId
    )
  }
  if (type === 'card') {    
    vuello.cards = vuello.cards.filter(
      (card) => card.id !== state.selectedCardId
    )
    vuello.containers.forEach(
      (item) => {        
        item.cardList = item.cardList.filter(
        (card) => card.id !== state.selectedCardId
      )
      }
    )    
    editTaskCardId.value = null
    editTaskCardOnce.value = true    
  }
  vuello.last_modified = new Date().toLocaleString('zh-TW')
  store.dispatch('vuello/setVuello', vuello)
  state.isRemovingContainer = false
  state.isRemovingCard = false
}
// 個別工種任務增建
const addWorkCardOnce = ref(true)

const toggleAddingCard = (container) => {
  vuello.containers.forEach(container => {
    container.is_adding_card = false
    container.is_editing_container = false
  })
  container.is_adding_card = true
}
const handleDeleteContainer = (id) => {
  state.selectedContainerId = id
  state.isRemovingContainer = true
}
const handleDeleteCard = (id) => {
  state.selectedCardId = id
  state.isRemovingCard = true
}
const addCard = (containerId, container) => {
  if (!newCardData.title) {
    container.is_adding_card = false
    addWorkCardOnce.value = true
    return
  }
  const newCard = {
    id: Date.now(),
    key: Date.now(),
    id_container: containerId,
    title: newCardData.title,
    content: newCardData.content,
    is_editing_card: false,
    isDone: false,  
  }

  vuello.cards.push(newCard)
  vuello.containers.map( item => {
    if(item.id === containerId){
      return item.cardList.push(newCard)
    }
  })  
  if (container) {
    container.is_editing_container
      ? (container.is_editing_container = false)
      : (container.is_editing_card = false)
  }
  cardChangedInitialize()
  addWorkCardOnce.value = true
  container.is_adding_card = false
}
const deleteTask = (payload) => {
  payload.is_adding_card = false
  cardChangedInitialize()
  addWorkCardOnce.value = true
}
// 增加白板處理
const containerHandler = (type, payload) => {
  switch (type) {
    case 'toggleAddContainer':
      state.isAddingContainer = true
      break
    case 'deleteContainer':
      state.isAddingContainer = false
      break
    case 'addContainer':
      state.isAddingContainer = false
      if (!payload) return state.isAddingContainer = false
      else {
        const newContainer = {
          id: Date.now(),
          key: Date.now(),
          name: payload,
          is_editing_container: false,
          is_adding_card: false,
          selected_done: "all",
          doneStatus: [
            {
              "key": "all"
            },
            {
              "key": "done"
            },
            {
              "key": "undone"
            }
          ],
          cardList: [],
        }
        vuello.containers.push(newContainer)
        vuello.last_modified = new Date().toLocaleString('zh-TW')
        store.dispatch('vuello/setVuello', vuello)
        state.isAddingContainer = false
      }
      break
  }
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

// 編輯 施作任務卡
const editTaskCardOnce = ref(true)
const editTaskCardId = ref(null)

const handleEditCard = (type, selectedCard) => {
  switch (type) {
    case 'change':
      if (editTaskCardOnce.value) {
        editTaskCardId.value = selectedCard.id
        editTaskCardOnce.value = false
        selectedCard.is_editing_card = true
        state.tempCards = vuello.cards.map((card) => ({ ...card }))
      } else {
        alert("還有任務卡片 尚未完成")
      }
      break
    case 'save':
      editTaskCardId.value = null
      editTaskCardOnce.value = true
      handleKanbanAction(null, null, selectedCard)      
      break
    case 'isdone':
      selectedCard.isDone = !selectedCard.isDone      
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

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}

.column-drag-handle {
  cursor: move;
  padding: 5px;
}
</style>
