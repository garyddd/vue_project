<template>
  <div class='figcaption'
       style='margin-left:0.25rem'>
    <p class="p1">{{props.name}} of CDR3 chain</p>
    <p class='p2'>&nbsp;&nbsp; <b>length</b> α chain : 12&nbsp;&nbsp;β chain : 15</p>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  name: String,
})
const describe = ref(false)
const blurAgain = (e) => {
  e.target.blur()
}
</script>

<style scoped>
.figcaption {
  text-align: left;
}
.p1 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 1.675rem;
  line-height: 2.25rem;
  font-weight: 300;
  font-family: sans-serif;
}
.p2 {
  opacity: 0.6;
  margin-top: 0.5rem;
  font-size: 0.775rem;
  line-height: 1.25rem;
  font-family: sans-serif;
}
</style>