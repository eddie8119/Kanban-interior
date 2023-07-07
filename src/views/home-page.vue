<template>
  <div v-if="payload" class="flex h-screen flex-col p-4">
    <div class="flex justify-between">
      <div>
        <Transition name="fade" mode="out-in">
          <div v-if="!state.is_editing_title">
            <span
              class="rounded-md px-2 text-3xl font-bold transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-200"
              @click="handleEditTitle('edit')"
            >
              {{ payload.title }} 工
            </span>
          </div>
          <div v-else class="flex place-items-center">
            <input
              ref="projectTitleInput"
              v-model="payload.title"
              type="text"
              class="block w-[230px] rounded-lg border border-gray-300 bg-gray-50 p-2 text-xl text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
              placeholder="取名工程案"
              @focus="$event.target.select()"
              @blur="state.is_editing_title = false"
              @keypress.enter="handleEditTitle('save')"
            />  
          </div>
        </Transition>
        <h3 class="my-2 px-2 text-sm">
          上次編輯時間 : {{ payload.last_modified }}
        </h3>
      </div>
      <div class="mt-px flex place-items-start justify-center">
        <div
          class="cursor-pointer rounded-full p-2 text-gray-500 hover:bg-slate-200"          
        >
        <a class="btn" role="menuitem" href="https://mail.google.com/mail/?view=cm&fs=1&to=funsugar8119@gmail.com&body=詢問:"
					target="_blank">
					網站意見反映
				</a>          
        </div>
      </div>
    </div>
    <KanbanBoard
      :payload="payload"
      @addContainer="displayContainerModal = true"
    />
  </div>
  <!-- Container Modal -->
  <ContainerModal
    :value="displayContainerModal"
    @close="displayContainerModal = false"
  />
</template>

<script setup>
import { ref, reactive, watch, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'
import ContainerModal from '@/components/dialog/ContainerModal.vue'

const store = useStore()
const displayContainerModal = ref(false)
const displayCardModal = ref(false)
const state = reactive({
  is_editing_title: false,
  temp_title: null,
})
const payload = computed(() => store.getters['vuello/getVuelloDatas'])
const projectTitleInput = ref(null);


onBeforeMount(async () => {
  const data = store.getters['vuello/getVuelloDatas']
  if (!data) {
    await axios.get('/sample-data.json')
    .then(({ data }) => {
      store.dispatch('vuello/setVuello', data)
    })
  }
})

const handleEditTitle = (type) => {
  if (type === 'edit') {
    state.is_editing_title = true
    state.temp_title = payload.value.title
    const inputElement = projectTitleInput.value;
    inputElement.focus();
    inputElement.select();   
  } else if (type === 'save') {
    state.is_editing_title = false
    payload.value.last_modified = new Date().toLocaleString('zh-TW')
    store.dispatch('vuello/setVuello', payload.value)
  } else {
    state.is_editing_title = false
    payload.value.title = state.temp_title
  }
}
</script>

