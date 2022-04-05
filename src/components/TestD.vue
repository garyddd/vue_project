<template>
<h2>gg</h2>
</template>
<script lang="ts" setup>
import axios from 'axios'
import {defineProps, ref, toRaw, toRefs} from 'vue'
const props = defineProps({
  test:Object,
})
const res = axios.get('./test2.json')
console.log(res)
console.log('====')
</script>