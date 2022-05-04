<template>

  <!-- <router-view /> -->
  <mait></mait>
  <inkt></inkt>
  <gemt></gemt>
  <gammadelta></gammadelta>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import mait from './browser/mait.vue'
import inkt from './browser/inkt.vue'
import gemt from './browser/gemt.vue'
import gammadelta from './browser/gammadelta.vue'
// import summaryCom from '../components/chartsCom.vue'
export default defineComponent({
  name: 'SummaryView',
  components: {
    mait,
    inkt,
    gemt,
    gammadelta,
  },
})
</script>

