import axios from 'axios'
import { ref } from 'vue'
import Vuex from 'vuex'
const df = ref([])
const df_paired = ref([])

const df_sankeyHumana = ref([])
const df_sankeyHumanb = ref([])
const df_g1 = ref([])
const df_g2 = ref([])
axios.get('./single_data.json').then(res => {
  df.value = res.data
})
axios.get('./paired_data.json').then(ress => {
  df_paired.value = ress.data
})
axios.get('./sankeyData/test_sankeyhua.json').then(ress => {
  df_sankeyHumana.value = ress.data
})
axios.get('./sankeyData/test_sankeyhub.json').then(ress => {
  df_sankeyHumanb.value = ress.data
})
axios.get('./g1.json').then(ress => {
  df_g1.value = ress.data
})
axios.get('./g2.json').then(ress => {
  df_g2.value = ress.data
})
const state = {
  name: df,
  name1: df_paired,
  name2: df_sankeyHumana,
  name3: df_sankeyHumanb,
  name4: df_g1,
  name5: df_g2,
}
const mutations = {
}
const getters = {
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})