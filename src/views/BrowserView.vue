<template>
  <h2>This is browser view</h2>
  <TestFun></TestFun>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TestFun from '../components/TestFun.vue'
export default defineComponent({
  name:'BrowserView',
  components:{
    TestFun
  }
})
</script>