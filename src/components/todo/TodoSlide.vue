<template>
  <transition v-show="isShowTodoSlide" name="todo-slide">
    <div
      class="top-0 left-0 w-[65%] h-full fixed flex max-w-[550px] bg-main-gray rounded-r-[20px] z-[10]"
    >
      <button
        type="button"
        class="absolute right-6 top-6 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
        @click="closeTodoSlide"
      >
        <CloseIcon height="25px" />
      </button>
      <TodoComponent />
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import TodoComponent from "./TodoComponent.vue";
import Button from "@/components/base/Button.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

const store = useStore();
const isShowTodoSlide = computed(() => store.getters["todo/getShowTodoSlide"]);

const closeTodoSlide = () => {
  store.commit("todo/SET_CLEAR_SHOWTODOSLIDE");
};
</script>

<style lang="scss" scoped>
.todo-slide-enter-active,
.todo-slide-leave-active {
  transition: all 1s ease;
}

.todo-slide-enter {
  transform: translateX(550px);
}

.todo-slide-enter-to {
  transform: translateX(0);
}

.todo-slide-leave-to {
  transform: translateX(-550px);
}
</style>