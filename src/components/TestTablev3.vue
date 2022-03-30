
<template>
  <div class="header">
    <el-input v-model="tableDataName"
              placeholder="CAMRPSSFSKLVFC"
              style="width:500px" />
    <el-button @focus="blurAgain"
               type="primary"
               @click="doSearch">Search</el-button>
    <el-button @focus="blurAgain"
               type="primary"
               @click="openData">ShowAll</el-button>
    <el-button @click="getM"
               @focus="blurAgain"
               type='primary'>Click</el-button>

  </div>
  <div class='container_table'
       align="center"
       v-show='showFlag'
       :style="{
          boxShadow: `--el-box-shadow-dark`,
        }">
    <div class='inner_table'>
      <h2 style="
       color:#19CAAD;text-align:left;">Result</h2>
    <hr>
    <!-- <hr> -->

    <el-pagination v-model:currentPage="currentPage"
                   background
                   v-model:page-size="pageSize"
                   :page-sizes="[50, 100, 150, 300]"
                   layout=" prev, pager, next, jumper,->, sizes,total"
                   :total="totalSeqs"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange">
    </el-pagination>

    <el-table :data="forwardTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :header-cell-style="{background:'#BEE7E9',color:'#000000',}"
              stripe
              border
              style="margin-bottom:14px;"
              empty-text='Loading'
              :default-sort="{prop:'time',order:'descending'}"
              :highlight-current-row="true">
      <el-table-column type="index"
                       :index="indexMethod"
                       label="#"
                       align='center' />
      <el-table-column v-for="item in columnsName"
                       :key="item.id"
                       :property='item'
                       :label='item'
                       align="center" />

    </el-table>

  </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'

import axios from 'axios'
import { el } from 'element-plus/lib/locale'
import { ElMessage } from 'element-plus'
const currentPage = ref(1)
const pageSize = ref(50)
const columnsName = ref([
  'Valpha',
  'CDR3a',
  'Jalpha',
  'Vbeta',
  'CDR3b',
  'Jbeta',
  'Dataset',
])

// interface Ivalue{
//   CDR3a:string;
//   Valpha:string;

// }

const path = 'http://localhost:5000/getMsg'
const allData = ref([])
let showFlag = ref(true)
const totalSeqs = ref(0)
// 控制table显示
function getM() {
  showFlag.value = !showFlag.value
}
// 接收后端传回数据，并进行分页显示
// 声明一个变量用于中转搜索
const forwardTable = ref([])
axios.get(path).then((res) => {
  allData.value = res.data
  forwardTable.value = res.data // TODO:优化中转数据的存储方式
  totalSeqs.value = res.data.length
})
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 控制按钮点击后自动失去焦点
const blurAgain = (e) => {
  e.target.blur()
}

function openData() {
  forwardTable.value = allData.value
  totalSeqs.value = allData.value.length
  currentPage.value = 1
}
// 搜索功能 -- 添加多个搜索规则
// 1. 前端处理
const tableDataName = ref('')
console.log(tableDataName.value)
function doSearch() {
  if (tableDataName.value == '') {
    ElMessage({
      message: 'If not entered, the default sequence will be used to search！',
      type: 'warning',
    })
    tableDataName.value = 'CAMRPSSFSKLVFC'
  }
  tableDataName.value = tableDataName.value.toUpperCase()
  var reg = /^[ACDEFGHIKLMNPQRSTVWY]+$/
  if (!reg.test(tableDataName.value)) {
    ElMessage({
      message: 'Please enter the correct amino acid format！',
      type: 'warning',
    })
    return
  }
  const filterTableDataEnd: Array<number> = []
  allData.value.forEach((value, index) => {
    if (value.CDR3a) {
      if (value.CDR3a.indexOf(tableDataName.value) >= 0) {
        filterTableDataEnd.push(value)
      }
    }
  })
  forwardTable.value = filterTableDataEnd
  currentPage.value = 1
  totalSeqs.value = filterTableDataEnd.length
  // currentChangePage(filterTableDataEnd, currentPage)
  tableDataName.value = ''
}

// 2.后端处理返回给前端
</script>

<style scoped>
.header {
  padding: 30px;
  text-align: center;
}
.container_table {
  width: 96%;
  margin-left: 2%;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
}
.inner_table {
  width: 96%;
  padding: 10px;
}
.el-table {
  border-radius: 4px;
}
</style>