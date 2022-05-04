<template>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <browser3 :cate='"GD"'></browser3>


        <h2>Human</h2>

        <typeCarousel :species='"Human"'
                      :cate='"GD"'></typeCarousel>

     
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

</template>

<script lang="ts" setup>

import typeCarousel from '../../components/typeCarousel.vue'
import browser3 from '../../components/browser3.vue'
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

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
const cate = ref('cate')
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
const showMouse = ref(false)
const showHuman = ref(true)
const showCattle = ref(false)
const showHumanγδ = ref(false)
const updateD = ref(
  'Last updated on ' +
    getCurrentInstance()?.appContext.config.globalProperties.$updataTime
)
const blurAgain = (e) => {
  e.target.blur()
}
const showhi = () => {
  showMouse.value = true
  showHuman.value = false
  showCattle.value = false
  showHumanγδ.value = false
}
const showhm = () => {
  showMouse.value = false
  showHuman.value = true
  showHumanγδ.value = false
  showCattle.value = false
}
const showhg = () => {
  showMouse.value = false
  showHuman.value = false
  showHumanγδ.value = false
  showCattle.value = true
}
const showhgamma = () => {
  showMouse.value = false
  showHuman.value = false
  showHumanγδ.value = true
  showCattle.value = false
}

const showValue = ref('Human')

const options = [
  {
    value: 'Human',
    label: 'Human (MAIT)',
  },
  {
    value: 'Mouse',
    label: 'Mouse (MAIT)',
  },
  {
    value: 'Cattle',
    label: 'Cattle (MAIT)',
  },
]
const change2show = () => {
  if (showValue.value === 'Human') {
    showMouse.value = false
    showHuman.value = true
    showCattle.value = false
  } else if (showValue.value === 'Mouse') {
    showMouse.value = true
    showHuman.value = false
    showCattle.value = false
  } else {
    showMouse.value = false
    showHuman.value = false
    showCattle.value = true
  }
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