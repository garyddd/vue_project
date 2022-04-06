import axios from 'axios'
import { ref } from 'vue'
import Vuex from 'vuex'
const df = ref([])
const df_paired = ref([])

const df_sankeyHumana = ref([])
const df_sankeyHumanb = ref([])
axios.get('./test3.json').then(res => {
  df.value = res.data
})
axios.get('./test4.json').then(ress => {
  df_paired.value = ress.data
})
axios.get('./test_sankeyhua.json').then(ress => {
  df_sankeyHumana.value = ress.data
})
axios.get('./test_sankey.json').then(ress => {
  df_sankeyHumanb.value = ress.data
})
const state = {
  name: df,
  name1: df_paired,
  name2: df_sankeyHumana,
  name3: df_sankeyHumanb,
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