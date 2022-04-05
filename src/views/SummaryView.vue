<template>


  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <div align='center'></div>
      <TestFun></TestFun>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import TestFun from '../components/TestFun.vue'
export default defineComponent({
  name: 'SummaryView',
  components: {
    TestFun,
  },
})
</script>

