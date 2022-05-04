<template>
  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <MyData></MyData>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MyData from '../components/MyData.vue'
export default defineComponent({
  name:'DatasetView',
  components:{
    MyData,
  },
})
</script>
