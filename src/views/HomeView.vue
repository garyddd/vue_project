<template>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <div align='center'></div>
      <homeCom></homeCom>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import homeCom from '@/components/homeCom.vue' // @ is an alias to /

export default defineComponent({
  name: 'HomeView',
  components: {
    homeCom,
  },
})
</script>
