<template>
  <el-row>
    <el-col :span='4'></el-col>
    <el-col :span='16'>
      <HelloWorld></HelloWorld>
    </el-col>
    <el-col :span='4'></el-col>
  </el-row>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
})
</script>
