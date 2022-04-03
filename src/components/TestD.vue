<template>
<h2>gg</h2>
</template>
<script lang="ts" setup>
import {defineProps, ref, toRaw, toRefs} from 'vue'
const props = defineProps({
  test:Object,
})
console.log(props.test)
const a = ref(toRefs(props.test))
console.log(props.test.length)
console.log(a.value.length)
// a.value = 1
// console.log(a.value)
console.log('====')
</script>