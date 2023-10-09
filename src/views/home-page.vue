<template>
  <Loading v-if="loading" />
  <div v-if="payload" class="w-full flex-col p-4 min-h-[calc(100vh-106px)]">
    <div class="flex justify-between">
      <div>
        <Transition name="fade" mode="out-in">
          <div v-if="!state.is_editing_title">
            <span
              class="rounded-md text-3xl font-bold transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-200"
              @click="handleEditTitle('edit')">
              {{ payload.title }} 工程案
            </span>
          </div>
          <div v-else class="flex place-items-center">
            <input ref="projectTitleInput" v-model="payload.title" type="text"
              class="block w-[230px] rounded-lg border border-gray-300 bg-gray-50 p-2 text-xl text-gray-900 transition duration-300 ease-in-out focus:border-blue-500 focus:ring-blue-500"
              placeholder="工程案取名" @focus="$event.target.select()" @blur="state.is_editing_title = false"
              @change="handleEditTitle('save')" @touchmove="handleEditTitle('save')" />
          </div>
        </Transition>
        <h3 class="my-2 text-sm">
          上次編輯時間 : {{ payload.last_modified }}
        </h3>
      </div>
    </div>
    <KanbanBoard :payload="payload"/>  
  </div>
  <Copyright />
  <!-- Container Modal -->
  <ContainerModal :value="displayContainerModal" @closeContainerModal="closeContainerModal" />
</template>

<script setup>
import { fbAuth } from '../firebase/firebase.js'
import { ref, reactive, watch, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'
import ContainerModal from '@/components/dialog/ContainerModal.vue'
import Loading from '@/components/base/Loading.vue'
import Copyright from "@/components/base/Copyright.vue"

const store = useStore()

const displayContainerModal = ref(true)
const state = reactive({
  is_editing_title: false,
  temp_title: null,
})
const projectTitleInput = ref(null)
const loading = ref(false)

const payload = computed(() => store.getters['vuello/getVuelloDatas'])
const getUser = computed(() => store.getters['user/getUser'])
const getUserTask = computed(() => store.getters['user/getUserTask'])

onBeforeMount(async () => {
  loading.value = true
  
  let data = undefined  
  if(getUserTask.value) {
    data = store.getters['user/getUserTask']
  } else {
    data = store.getters['vuello/getVuelloDatas']
  }
  if (!data) {
    await axios.get('/sample-data.json')
      .then(({ data }) => {
        const { containers, cards } = data
        const cardsHandler = cards.map((item, index) => {
          return {
            id: index,
            key: index,
            id_container: item.id_container,
            title: item.title,
            content: item.content,
            is_editing_card: false,
            isDone: false
          }
        })
        const containersHandler = containers.map((item, index) => {
          return {
            id: index,
            key: index,
            name: item,
            is_editing_container: false,
            is_adding_card: false,
            selected_done: "all",
            doneStatus: [
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
            ],
            cardList: cardsHandler.filter(card => card.id_container === index)
          }
        })

        data.cards = cardsHandler
        data.containers = containersHandler
        data.last_modified = new Date().toLocaleString('zh-TW')
        store.dispatch('vuello/setVuello', data)
      })
  } else {
    payload.value = data
  }
  loading.value = false
})

const handleEditTitle = (type) => {
  switch (type) {
    case 'edit':
      state.is_editing_title = true
      state.temp_title = payload.value.title
      const inputElement = projectTitleInput.value
      inputElement.focus()
      inputElement.select()
      break
    case 'save':
      payload.value.last_modified = new Date().toLocaleString('zh-TW')
      store.dispatch('vuello/setVuello', payload.value)
      state.is_editing_title = false
      break
  }
}

const closeContainerModal = () =>{
  displayContainerModal.value = false
}

watch(getUser, (newValue) => {
  if (newValue) {
    displayContainerModal.value = false;
  }
});

</script>

