<template>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <div align='center'></div>
      <!-- <TestTablev3></TestTablev3> -->
      <tableCom></tableCom>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

  <!-- <TestD :allData='test' ></TestD> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import TestTablev3 from '../components/TestTablev3.vue'
import tableCom from '../components/tableCom.vue'

// import TestD from '../components/TestD.vue'

export default defineComponent({
  name: 'BrowserView',
  components: {
    // TestTablev3,
    tableCom,
    // TestD,
  },
})
</script>
