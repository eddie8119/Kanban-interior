<template>
  <section class="input-add w-full flex flex-col items-center">
    <form action="" @submit.prevent="addAmount">
      <input type="text" placeholder="輸入數量" class="w-full py-[16px] border-none rounded-[48px] text-[16px] shadow-main-box-shadow cursor-pointer placeholder-gray-300" v-model="amount"  />
      
      
      <div class="w-full h-20 flex gap-x-2 overflow-x-auto bg-red-100">
        <!-- <label v-for="(list, index) in constructionList" :key="index" class=" w-20 h-10 flex flex-col items-center justify-center bg-white ">
						<input 
							type="radio" 
							name="category" 
							id="category" 
							:value="list"
							v-model="inputCategory" />
						<span class=""></span>
						<div>{{list}}</div>
				</label> -->
      </div>
      <!-- <Button type="primary" model="outline" size="sm" rounded="sm">
        輸入數量
      </Button> -->
    </form>
  </section> 
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps  } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'vuex'

import Button from '@/components/base/Button.vue'

const props = defineProps({
  constructionList: Array
})

const store = useStore()
// const materialAmounts = computed(() => store.getters['material/getMaterialAmountsDatas'])

const allMaterialAmount = reactive([])
const amount = ref()
const inputCategory = ref(null)

const addAmount = () => {
  if (amount.value.trim() === '') return

  allMaterialAmount.push({
    id: uuidv4(),
    construction:inputCategory.value,
    amount: amount.value.trim(),
    date: new Date().getTime()
  })

  amount.value = 0;
  inputCategory.value = null;

  // emit("addAmount", Amount);

}
</script>

<style>

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--business);
	box-shadow: var(--business-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--business);
	box-shadow: var(--business-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

</style>

