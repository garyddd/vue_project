<template>
  <TestTablev3 ></TestTablev3>
  <!-- <TestD :allData='test' ></TestD> -->
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import TestTablev3 from '../components/TestTablev3.vue'

// import TestD from '../components/TestD.vue'

import axios from 'axios'
export default defineComponent({
  name: 'BrowserView',
  components: {
    TestTablev3,
    // TestD,
  }
})
</script>