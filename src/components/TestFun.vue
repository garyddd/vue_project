
<template>
  <p>Test</p>
  <h3>{{a}} </h3>
  <el-button @click="getM"
             type="primary">click</el-button>
</template>
<script lang="ts">
import { computed, defineComponent, ref, toRaw, toRef } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'TestFun',
  setup() {
    let a = ref('')
    const path = 'http://localhost:5000/getMsg'
    const tableData = computed(() => {
      return 200 
    })
    function getM(){
      axios.get(path).then((res)=>{
        console.log('start ')
        console.log(res.data)
        a.value = res.data

      })
      // a.value += '==='
    }
    return {
      tableData,a,getM
    }
  },
})
</script>
<!--  
<template>
  <div id="app">
    <p>姓名：{{ name }}</p>
    <p>年龄：
      <button @click="changeAge(-1)">-</button>
      {{ age }}
      <button @click="changeAge(1)">+</button>
    </p>
    <p>出生年份：{{year}}</p>
  </div>
</template>

<script>
  // 不要忘记import
  import { ref, computed } from 'vue'
  export default {
    setup(){
      const name = ref('王路飞')
      const age = ref(17)
      const year = computed(() => {
        return 2020 - age.value
      })
      function changeAge(val){
        age.value += val
      }
      return {name, age, changeAge, year}
    }
  }
</script>
-->