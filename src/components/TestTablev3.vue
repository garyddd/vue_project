
<template>
  <div class="header">
    <el-input v-model="tableDataName"
              placeholder="CAMRPSSFSKLVFC"
              style="width:20%;margin-right:1%"
              maxlength=15
              :prefix-icon="Search">
      <!-- <template #prepend>CDR3α</template> -->
    </el-input>
    <el-button @focus="blurAgain"
               type="primary"
               @click="doSearch">Search</el-button>
    <el-button @focus="blurAgain"
               type="primary"
               @click="openData">ShowAll</el-button>
    <el-button @click="getM"
               @focus="blurAgain"
               type='primary'>Click</el-button>
    <el-button @click="postM"
               @focus="blurAgain"
               type='primary'>Post</el-button>
    <!-- <el-input v-model="columnsName"
              style="width:20%;margin-right:1%">
    </el-input> -->
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
                     layout=" prev, pager, next, jumper, ->,sizes,total"
                     :total="totalSeqs"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>

      <el-table v-loading="loading"
                element-loading-text="Loading..."
                :element-loading-svg="svg"
                class="custom-loading-svg"
                element-loading-svg-view-box="-10, -10, 50, 50"
                :data="forwardTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#BEE7E9',color:'#000000',}"
                stripe
                border
                style="margin-bottom:14px;"
                :default-sort="{prop:'time',order:'descending'}"
                :highlight-current-row="true">
        <el-table-column type="index"
                         :index="indexMethod"
                         label="ID"
                         align='center' />
        <el-table-column v-for="item in columnsName"
                         :key="item.id"
                         :property='item'
                         :label='item'
                         align="center" />

        <el-table-column label="Species"
                         width="180"
                         align='center'>
          <!-- <template #default="scope"> -->
          <!-- <el-popover effect="light"
                        trigger="hover"
                        title='info'
                        placement="top"
                        width="auto"> -->
          <!-- <template #default>
                <div>TRAV: {{ scope.row.Valpha }}</div>
                <div>TRAJ: {{ scope.row.Jalpha }}</div>
              </template> -->
          <template #default="scope">
            <!-- <div align='center'> -->
            <el-tag type='info'>{{ scope.row.Species}}</el-tag>
          </template>
          <!-- </el-popover> -->
          <!-- </template> -->
        </el-table-column>

      </el-table>

    </div>
  </div>

  <div class="footer" />
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const loading = ref(true)
const currentPage = ref(1)
const pageSize = ref(50)
const emptyText = ref('Loading...')
// 表头
const columnsName = ref(['Gene', 'Vgene', 'CDR3', 'Jgene'])
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

// const path = 'http://localhost:5000/getMsg'
const path = '/test2.json'
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
// console.time('计时器1')
axios.get(path).then((res) => {
  allData.value = res.data
  forwardTable.value = res.data // TODO:优化中转数据的存储方式
  totalSeqs.value = res.data.length
  loading.value = false
  // const arrNew: Array<number> = []
  // allData.value.forEach((item) => {
  //   arrNew.push(item.CDR3a_len)
  // })
})
// console.timeEnd('计时器1')
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
  emptyText.value = 'No Data'
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
  const filterTableDataEnd: Array<string> = []
  allData.value.forEach((value, index) => {
    if (value.CDR3) {
      if (value.CDR3.indexOf(tableDataName.value) >= 0) {
        filterTableDataEnd.push(value)
      }
    }
  })
  forwardTable.value = filterTableDataEnd
  currentPage.value = 1
  totalSeqs.value = filterTableDataEnd.length
  // currentChangePage(filterTableDataEnd, currentPage)
  tableDataName.value = ''

  loading.value = false
}

// 2.后端处理返回给前端

// 测试前端向后端post数据
const postM = () => {
  axios
    .post('http://localhost:5000/getMMM', { CDR3a: tableDataName.value })
    .then((res) => {
      console.log(res.data)
    })
}
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

.footer {
  margin-top: 10px;
}
</style>