import axios from 'axios'
import { ref } from 'vue'
import Vuex from 'vuex'
const df = ref([])
// const df1 = ref([])
const df_paired = ref([])
const df_length_cate = ref([])
const df_length_spec = ref([])


// axios.get('./single_data.json').then(res => {
//   df1.value = res.data
// })
axios.get('./single_dataH.json').then(res => {
  df.value = res.data
})
axios.get('./paired_data.json').then(ress => {
  df_paired.value = ress.data
})
axios.get('./lengthData/cate.json').then(ress => {
  df_length_cate.value = ress.data
})
axios.get('./lengthData/spec.json').then(ress => {
  df_length_spec.value = ress.data
})

const state = {
  name: df,
  // name0: df1,
  name1: df_paired,
  name2: df_length_spec,
  name3: df_length_cate,


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