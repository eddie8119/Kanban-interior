<!-- <template>
  <div class="min-h-[50px] min-w-[300px] max-w-[300px] rounded-lg bg-[#E4E5EC] p-1" @drop="dropItem($event, container.id)"
    @dragenter.prevent @dragover.prevent>
    <div class="flex h-full w-full place-items-center justify-between p-1">
      <Transition name="fade" mode="out-in">
        <input v-if="container.is_editing_container" v-model="container.name" type="text"
          class="block w-full rounded-lg border-2 border-blue-500 bg-gray-50 p-2.5 text-sm text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
          placeholder="輸入工程類型" @keypress.enter="
            handleKanbanAction(null, null, null, container)
            " @blur="container.is_editing_container = false" />
        <div v-else class="text-md my-[0.30rem] w-full cursor-pointer p-1 font-semibold"
          @click="container.is_editing_container = true">
          {{ container.name }}工種 ({{ cardList(container.id).length }})
        </div>
      </Transition>
      <TrashIcon height="25px" class="cursor-pointer rounded-full p-1 text-red-400 hover:bg-red-200 hover:text-red-700"
        @click="handleDeleteItem('container', container.id)" />
    </div>
    <div class="flex flex-col overflow-y-auto" style="max-height: calc(100vh - 165px)">
      <div v-for="card in cardList(container.id)" :key="card.id" class="m-1 cursor-pointer rounded-lg bg-white p-2"
        :draggable="state.isDraggable" @dragstart="dragItem($event, card)">
        <taskPreview :card="card" @handleEditCard="handleEditCard" @handleDeleteItem="handleDeleteItem" />
      </div>
      <div class="m-1 flex flex-col place-items-center justify-center">
        <Transition name="fade">
          <div v-if="container.is_adding_card" class="flex w-full flex-col rounded-md border-gray-400 bg-white p-2">
            <form @submit.prevent="addTask(container.id, container)" v-click-outside="onClickOutside">
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
          <Button v-if="!container.is_adding_card" type="primary" model="outline" size="sm" rounded="sm" class="mt-1"
            @click="container.is_adding_card = true">
            <PlusIcon height="15px" />
            新增施做項目
          </Button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import ConfirmationModal from '@/components/dialog/ConfirmationModal.vue'
import Button from '@/components/base/Button.vue'
import MoveIcon from '@/components/icons/MoveIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'
import taskPreview from './taskPreview.vue'
import vClickOutside from 'click-outside-vue3'

const props = defineProps({
  container: {
    type: Object,
  },
})

const store = useStore()


const handleDeleteItem = (type, id) => {
  if (type === 'container') {
    state.selectedContainerId = id
    state.isRemovingContainer = true
  } else {
    state.selectedCardId = id
    state.isRemovingCard = true
  }
}
const addTask = (containerId, payload) => {
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
const leaveAddTask = () => {
  payload.is_adding_card = false
  cardChangedInitialize()
}
const deleteTask = (payload) => {
  payload.is_adding_card = false
  cardChangedInitialize()
}
const handleEditCard = (type, selectedCard) => {
  switch (type) {
    case 'change':
      selectedCard.is_editing_card = true
      state.tempCards = vuello.cards.map((card) => ({ ...card }))
      break
    case 'save':
      handleKanbanAction(null, null, null, selectedCard)
      break
    case 'cancel':
      const data = state.tempCards.find((card) => card.id === selectedCard.id)
      selectedCard.title = data.title
      selectedCard.content = data.content
      selectedCard.is_editing_card = false
      break
  }
}
const handleKanbanAction = (mode, type, containerId, payload) => {
  if (mode === 'add') {

  } else if (mode === 'delete') {
    if (type === 'container') {
      vuello.containers = vuello.containers.filter(
        (container) => container.id !== containerId
      )
      state.isRemovingContainer = false
    }
    vuello.cards = vuello.cards.filter(
      (card) => card.id_container !== containerId
    )
  }
  if (payload) {
    payload.is_editing_container
      ? (payload.is_editing_container = false)
      : (payload.is_editing_card = false)
  }
  cardChangedInitialize()
}

</script>

<style></style> -->