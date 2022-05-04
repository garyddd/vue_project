<template>
  <el-row>
    <el-col :span='4'></el-col>
    <el-col :span='16'>
      <anaCluster></anaCluster>
    </el-col>
    <el-col :span='4'></el-col>
  </el-row>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

import anaCluster from '../components/anaCluster.vue'
export default defineComponent({
  name: 'AnalysisView',
  components: {
    anaCluster,
  },
})
</script>