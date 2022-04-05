import axios from 'axios'
import { ref } from 'vue'
import Vuex from 'vuex'
const df = ref([])
const msg = ref('nihao')
axios.get('./test3.json').then(res => {
  df.value = res.data
})
const state = {
    name: df,
    msg: msg
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