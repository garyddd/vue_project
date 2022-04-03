<template>
  <h2>This is the summary view</h2>
  <el-row>
    <el-col :span="6"></el-col>
    <el-col :span="18"><div calss='grid-content'></div>
  <TestFun></TestFun></el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import TestFun from '../components/TestFun.vue'
export default defineComponent({
  name:'SummaryView',
  components:{
    TestFun
  }
})
</script>

