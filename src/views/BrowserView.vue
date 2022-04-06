<template>
  <TestTablev3 ></TestTablev3>
  <!-- <TestD :allData='test' ></TestD> -->
</template>
<script lang="ts">
import { defineComponent} from 'vue'
import TestTablev3 from '../components/TestTablev3.vue'

// import TestD from '../components/TestD.vue'

export default defineComponent({
  name: 'BrowserView',
  components: {
    TestTablev3,
    // TestD,
  }
})
</script>