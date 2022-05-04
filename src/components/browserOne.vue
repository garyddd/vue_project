<template>

  <div class='com-1'>
    <div class="browser-one">
      <h1 class='species-h1'
          style="padding-top:20px">{{cate}}</h1>
      <div class='figcaption'>
        <p class='p1'>{{cate}} Datasets Summary </p>
        <p class='p2'>Length of CDR3 | Amino Acid usage | Count </p>
      </div>
      <el-row class='figure'>
        <el-col :span="8">
          <div style="width:100%;background-color:rgb(201,221,232)">
            <el-row>
              <count0 :cate='cate'></count0>
            </el-row>
            <el-row>
              <count1 :cate='cate'></count1>
            </el-row>

          </div>
        </el-col>
        <el-col :span="16">
          <div style="width:100%;background-color:rgb(201,221,232)">
            <el-row>
              <lengthHuman :cate='cate'></lengthHuman>
            </el-row>
            <el-row>
              <aaUsageNew :cate='cate'></aaUsageNew>
            </el-row>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>

</template>

<script lang="ts" setup>
// import echartsCom from './/summaryCom/lengthCom.vue'
import countAll from './summaryCom/countAll.vue'
import countPaired from './summaryCom/countPaired.vue'
import count0 from './humanCom/records.vue'
import count1 from './humanCom/records1.vue'
import countGauge from './humanCom/gaugeCom.vue'
import lengthHuman from './humanCom/lengthHuman.vue'
import length2Com from './humanCom/length2Com.vue'
import aaUsageNew from './humanCom/aaNew.vue'
import sankeyOne from './sankeyCom.vue'
import sankeyOne2 from './sankeyCom2.vue'
import typeCarousel from './typeCarousel.vue'
import typeCarouselLong from './typeCarouselGemt.vue'
import typeCarouselGD from './typeCarouselGD.vue'

import { getCurrentInstance, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  cate: String,
})
const render = ref(false)
const loading = ref(true)
const render_count = () => {
  render.value = !render.value
}

const mait = ref('MAIT')
const nkt = ref('iNKT')
const gemt = ref('GEMT')
const gd = ref('GD')
const human = ref('Human')
const mouse = ref('Mouse')
const cattle = ref('Cattle')
const all = ref('all')
// const cate = ref('cate')
const TRA = ref('TRA')
const TRB = ref('TRB')
const countLabelGene = ref('Gene')
const countLabelSpecies = ref('Species')
const countLabelCate = ref('Cate')
const describe = ref(false)
const showmoreMouse = ref(false)
const showmoreCattle = ref(false)
const classspec = ref('spec')
const classcell = ref('cell')
const showHumanMAIT = ref(false)
const showHumaniNKT = ref(true)
const showHumanGEMT = ref(false)
const showHumanγδ = ref(false)
const showMouseMAIT = ref(false)
const showMouseiNKT = ref(false)
const updateD = ref(
  'Last updated on ' +
    getCurrentInstance()?.appContext.config.globalProperties.$updataTime
)
const blurAgain = (e) => {
  e.target.blur()
}
const showhi = () => {
  showHumaniNKT.value = true
  showHumanMAIT.value = false
  showHumanGEMT.value = false
  showHumanγδ.value = false
}
const showhm = () => {
  showHumaniNKT.value = false
  showHumanMAIT.value = true
  showHumanγδ.value = false
  showHumanGEMT.value = false
}
const showhg = () => {
  showHumaniNKT.value = false
  showHumanMAIT.value = false
  showHumanγδ.value = false
  showHumanGEMT.value = true
}
const showhgamma = () => {
  showHumaniNKT.value = false
  showHumanMAIT.value = false
  showHumanγδ.value = true
  showHumanGEMT.value = false
}
const showmi = () => {
  showMouseiNKT.value = true
  showMouseMAIT.value = false
}
const showmm = () => {
  showMouseiNKT.value = false
  showMouseMAIT.value = true
}
const showMoreMouseF = () => {
  showmoreMouse.value = !showmoreMouse.value
  showMouseiNKT.value = true
}
const router = useRouter()
// const changePage = () => {
//   router.push(`/sankeyFull?species=${human.value}&cate=${nkt.value}`)
// }

const changePage = (type: any) => {
  // resolve新窗口打开
  const newpage = router.resolve({
    path: '/sankeyFull', // 跳转的页面路由
    query: {
      species: human.value,
      cate: gd.value,
    },
  })
  window.open(newpage.href, '_blank')
}
</script>
<style scoped>
.com-1{
  margin-bottom: 5rem;
}
a {
  margin-left: 20px;
  text-decoration: none;
}
.title-2-box {
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
}
.title-2,
.title-3 {
  font-size: 3.75rem;
  line-height: 1;
  font-family: sans-serif;
  display: inline;
}
.title-3 {
  color: #333;
}
.title-2:hover {
  font-size: 4rem;
  color: rgb(244, 96, 108);
  transition: all 0.25s ease-in-out;
}
h2 {
  font-size: 3.75rem;
  line-height: 1;
  font-family: serif;
  text-align: left;
}
.a_box {
  padding: 20px;
}
.figure {
  margin-bottom: 1.5rem;
}
.figcaption {
  text-align: left;
}
.species-h1 {
  text-align: left;
}
.p1 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 1.675rem;
  line-height: 2.25rem;
  font-weight: 300;
  font-family: sans-serif;
}
.p2 {
  opacity: 0.6;
  margin-top: 0.5rem;
  font-size: 0.775rem;
  line-height: 1.25rem;
  font-family: sans-serif;
}

.carousel-ele {
  width: 100%;
  height: 650px;
  background-color: #e7e4da;
}
.gene {
  overflow: auto;
}
.gene-fig {
  text-align: center;
}
.ps1 {
  font-size: 3.5rem;
  --tw-text-opacity: 1;
  color: rgba(160, 119, 90, var(--tw-text-opacity));
  font-family: serif;
}
.sankey-cap .ps1 {
  margin-top: 4rem;
  line-height: 1.25rem;
}
.sankey-cap .ps2 {
  font-size: 1.875rem;

  /* line-height: 2.25rem; */
  margin-bottom: 0.5rem;
  font-family: sans-serif;
  /* font-weight: 300; */
  /* text-align: center; */
  /* line-height: 0rem; */
}
.sankey-cap .ps_text {
  font-size: 1rem;
  line-height: 2.25rem;
  /* color:#e3525e; */
  color: rgba(0, 0, 0, 0.618);
  font-weight: 500;
  text-align: center;
  /* line-height: 0rem; */
}
.sankey-cap .ps4 {
  font-size: 0.8rem;
}
.sankey-cap .ps5 {
  font-size: 0.6rem;
}
</style>