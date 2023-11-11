<template>
  <Container></Container>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag, generateItems, generateWords } from '../../utils/helpers'
import KanbanItem from './KanbanItem.vue'

// mock
const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: generateItems(2, i => ({
    id: `column${i}`,
    type: 'container',
    name: generateWords(Math.random() * 2 + 1),
    props: {
      orientation: 'vertical',
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
      type: 'draggable',
      id: `${i}${j}`,
      loading: false,
      data: generateWords(Math.random() * 12 + 2)
    }))
  }))
}
export default {
  components: { Container, Draggable, KanbanItem},
  data () {
    return {
      scene,
    }
  },
  mounted(){},
  methods: {
    getColumnHeightPx(){
      let kanban = document.getElementById('kanbanContainer');
      return kanban ? kanban.offsetHeight - 122 : 0;
    },
    onColumnDrop (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },
    onCardDrop (columnId, dropResult) {
      
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const itemIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        
        // check if element was ADDED in current column
        if((dropResult.removedIndex == null && dropResult.addedIndex >= 0)){
          // your action / api call
          dropResult.payload.loading = true
          // simulate api call
          setTimeout(function(){ dropResult.payload.loading = false }, (Math.random() * 5000) + 1000); 
        }
        
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(itemIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
  }
}
</script>
<style>
/** NB: dont remove, 
* When using orientation="horizontal" it auto sets "display: table"
* In this case we need flex and not display table  
*/
.smooth-dnd-container.horizontal{
  display: flex !important;
}
</style>