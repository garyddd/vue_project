<template>
  <div id='bar'
       class="flex justify-between items-center flex-wrap">
    <el-button @click="updataD"
               type='primary'>Click</el-button>
    <p v-html="a"></p>

  </div>
</template>

<script lang="ts" setup>
// import axios from 'axios'
// import { ref } from 'vue'
// const a = ref('a')
// const updataD = () => {
//   axios.get('http://127.0.0.1:5000/').then((res) => {
//     a.value = res.data
//     console.log(res.data)
//   })
//   console.log('Click')
// }
// console.log(getters.get_userinfo)
console.log()
</script>

