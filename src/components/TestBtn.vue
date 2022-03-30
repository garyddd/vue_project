<template>
  <button @click="Testbutton">Test Button</button>
  <input type="text"
         v-model="message"
         placeholder="Edit here">
  <button @click="test">POST</button>
  <p>{{ message }} </p>

  <el-table :data="tableData"
            stripe
            style="width: 100%">
    <el-table-column prop="Valpha"
                     label="Valpha"
                     width="180" />
    <el-table-column prop="CDR3a"
                     label="CDR3a"
                     width="180" />
    <el-table-column prop="Jalpha"
                     label="Jalpha" />
  </el-table>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: 'TestBtn',
  props: {

  },
  setup() {
    let path = 'http://127.0.0.1:5000/getMsg'
    const Testbutton = () => {
      axios.get(path).then((res) => {
        let msg = res.data.msg
        alert(msg)
      })
    }
    const tableData = ref([])
    const message = ref('')
    
    const test = () => {
      axios.get(path, { params: { name: message } }).then((red) => {
        console.log(red.data[0])
        // console.log(message)
        // alert(message.value)
        // tableData.value = red.data
      })
    }

    return {
      Testbutton,
      message,
      test,
      tableData,
    }
  },
  // methods: {
  //   Testbutton:function(){
  //   let path = 'http://127.0.0.1:5000/getMsg'
  //     axios.get(path).then(res => {
  //       let msg = res.data
  //       alert(msg)
  //     })
  //   },
  // postdd:function(){
  //   this.$axios.get('http://127.0.0.1:5000/getMsg',{params:{'name': this.message}}).then(red =>{
  //     alert(this.message)
  //   })
  // }
  // }
})
</script>