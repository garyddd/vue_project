<template>
  <div class='com-1'>
    <h1 style="padding-top:20px">QUICK SEARCH &<br>BROWSER</h1>
    <div class='header'
         align="center"
         style='width:100%'>
      <div class='inner_table'>
        <h2 style='text-align:right'>Search bar</h2>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-divider content-position="center">
              <el-tooltip effect='light'
                          placement='top'>
                <template #content> Describe CDR3</template>
                CDR3
              </el-tooltip>
            </el-divider>
            <el-row>
              <el-col :span=4></el-col>
              <el-col :span=16>
                <el-form :label-position='labelPosition'>
                  <el-form-item>
                    <template #label>

                      <p>Sequence
                        <el-tooltip effect='light'
                                    placement='right'>
                          <template #content>If Gene channel be switched to <el-tag type='info'> Only paired</el-tag>,<br> the α&β chains will be all matched.</template>
                          <el-icon>
                            <InfoFilled />
                          </el-icon>
                        </el-tooltip>

                      </p>
                    </template>

                    <el-input v-model="tableDataName"
                              placeholder="CAMRPSSFSKLVFC">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <template #label>

                      <p>Variable segment
                        <el-tooltip effect='light'
                                    placement='right'>
                          <template #content> If Gene channel be switched to <el-tag type='info'> Only paired</el-tag>,<br> the V/J search bar will be disabled.</template>
                          <el-icon>
                            <InfoFilled />
                          </el-icon>
                        </el-tooltip>

                      </p>
                    </template>

                    <el-input v-model="tableDataNameV"
                              placeholder="V gene"
                              :disabled='formDis'>
                    </el-input>
                  </el-form-item>
                  <el-form-item label='Joining segment'>
                    <el-input v-model="tableDataNameJ"
                              placeholder="J gene"
                              :disabled='formDis'>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span=4></el-col>
            </el-row>

          </el-col>
          <el-col :span="12">

            <el-divider content-position="center">
              <el-tooltip effect='light'
                          placement='top'>
                <template #content> Describe INFO</template>
                INFO
              </el-tooltip>
            </el-divider>
            <el-form :label-position='labelPosition'>
              <el-form-item label="Species">
                <el-select v-model="form.region"
                           placeholder="please select your zone">
                  <el-option label="Zone one"
                             value="shanghai" />
                  <el-option label="Zone two"
                             value="beijing" />
                </el-select>
                <!-- <el-checkbox-group v-model="speciesListChecked"
                                   @change="handleCheckedChange">
                  <el-checkbox v-for="specie in speciesList"
                               :key="specie"
                               :label="specie"
                               @change="handleCheckedChange1">{{specie}}</el-checkbox>
                </el-checkbox-group>

                <el-checkbox v-model="checkAll"
                             :indeterminate="isIndeterminate"
                             @change="handleCheckAllChange"
                             style='margin-left:30px'>Check all</el-checkbox> -->

              </el-form-item>
              <el-form-item label="Category">
                <el-select v-model="form.region"
                           placeholder="please select your zone">
                  <el-option label="Zone one"
                             value="shanghai" />
                  <el-option label="Zone two"
                             value="beijing" />
                </el-select>
                <!-- <el-checkbox-group v-model="cateListChecked"
                                   @change="handleCheckedChangeCate">
                  <el-checkbox v-for="cate in cateList"
                               :key="cate"
                               :label="cate"
                               @change="handleCheckedChange2">{{cate}}</el-checkbox>
                </el-checkbox-group> -->

                <el-checkbox v-model="checkAllCate"
                             :indeterminate="isIndeterminateCate"
                             @change="handleCheckAllChangeCate"
                             style='margin-left:30px'>Check all</el-checkbox>

              </el-form-item>
              <el-form-item label="Gene(chain)">
                <!-- <el-checkbox-group v-model="geneListChecked"
                                   @change="handleCheckedChangeGene">
                  <el-checkbox v-for="gene in geneList"
                               :key="gene"
                               :label="gene"
                               @change="handleCheckedChangeGene1">{{gene}}</el-checkbox>
                </el-checkbox-group> -->
                <el-select v-model="form.region"
                           placeholder="please select your zone">
                  <el-option label="Zone one"
                             value="shanghai" />
                  <el-option label="Zone two"
                             value="beijing" />
                </el-select>

              </el-form-item>
            </el-form>

          </el-col>
        </el-row>
      </div>
      <div style='margin-top:20px;background-color:rgb(188,188,188);padding:14px'>
        <el-button @focus="blurAgain"
                   color='rgb(205,240,228)'
                   @click="doSearch"
                   :icon="Search">Search</el-button>

        <el-button @focus="blurAgain"
                   color='#fff'
                   @click="openData">ShowAll<el-icon>
            <View />
          </el-icon>
        </el-button>
      </div>
    </div>
    <div class='container_table'
         align="center"
         v-show='showFlag'>
      <div class='inner_table'>
        <h2 style="text-align:right;">Result</h2>
        <el-divider />
        <el-pagination v-model:currentPage="currentPage"
                       background
                       v-model:page-size="pageSize"
                       :page-sizes="[50, 100, 150, 300]"
                       layout=" prev, pager, next, jumper, ->,sizes,total"
                       :total="totalSeqs"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange">
        </el-pagination>
        <div class='ad_table'>
          <el-table v-loading="loading"
                    element-loading-text="Loading..."
                    :data="forwardTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    :header-cell-style="{background:'#ffffff',color:'#000000',}"
                    border
                    style="margin-bottom:14px;"
                    :default-sort="{prop:'time',order:'descending'}"
                    :highlight-current-row="true"
                    v-show='show_single'>

            <el-table-column type="index"
                             label="ID"
                             align='center' />
            <el-table-column label="Gene"
                             width="180"
                             align='center'>

              <template #default="scope">
                <el-tag type='warning'>{{ scope.row.Gene}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-for="item in columnsName"
                             :key="item.id"
                             :property='item'
                             :label='item'
                             align="center" />
            <el-table-column label="Species"
                             width="180"
                             align='center'>
              <template #default="scope">
                <el-tag type='success'>{{ scope.row.Species}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Category"
                             width="180"
                             align='center'>
              <template #default="scope">
                <el-tag type='info'>{{ scope.row.Cate}}</el-tag>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <el-table v-loading="loading"
                  element-loading-text="Loading..."
                  :data="forwardTable_paired.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :header-cell-style="{background:'#ffffff',color:'#000000',}"
                  stripe
                  border
                  style="margin-bottom:14px;"
                  :default-sort="{prop:'time',order:'descending'}"
                  :highlight-current-row="true"
                  v-show='!show_single'>

          <el-table-column type="index"
                           label="ID"
                           align='center' />
          <el-table-column label="Gene"
                           align='center'>

            <template #default="scope">
              <el-tag type='warning'>{{ scope.row.Gene}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column v-for="item in columnsName_paired"
                           :key="item.id"
                           :property='item'
                           :label='item'
                           align="center" />

          <el-table-column label="Species"
                           align='center'>
            <template #default="scope">
              <el-tag type='success'>{{ scope.row.Species}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Category"
                           align='center'>

            <template #default="scope">
              <el-tag type='info'>{{ scope.row.Cate}}</el-tag>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Search, View, InfoFilled } from '@element-plus/icons-vue'
import axios from 'axios'

import store from '@/store/store'
import { ElMessage } from 'element-plus'

const loading = ref(true)
const currentPage = ref(1)
const pageSize = ref(50)
const emptyText = ref('Loading...')
const show_single = ref(true)
const labelPosition = ref('top')
// 表头
const columnsName = ref(['Vgene', 'CDR3', 'Jgene'])
const columnsName_paired = ref([
  'Valpha',
  'CDR3a',
  'Jalpha',
  'Vbeta',
  'CDR3b',
  'Jbeta',
])

// const path = 'http://localhost:5000/getMsg'
// const path = '/test2.json'
// const allData = ref([])
const allData = store.state.name
console.log(Object.values(allData).length)
const allData_paired = store.state.name1
let showFlag = ref(true)
const formDis = ref(false)
const totalSeqs = ref(0)
// 控制table显示
function getM() {
  showFlag.value = !showFlag.value
}
// 接收后端传回数据，并进行分页显示
// 声明一个变量用于中转搜索
const forwardTable = ref([])
const forwardTable_paired = ref([])
// axios.get(path).then((res) => {
//   allData.value = res.data
//   forwardTable.value = res.data // TODO:优化中转数据的存储方式
//   totalSeqs.value = res.data.length
//   loading.value = false
// })

forwardTable.value = Object.values(allData)
forwardTable_paired.value = Object.values(allData_paired)
totalSeqs.value = Object.values(allData).length
loading.value = false

const checkAll = ref(false)
const isIndeterminate = ref(false)
const speciesListChecked = ref(['Human'])
const speciesList = ['Human', 'Mouse', 'Cattle']
const handleCheckAllChange = (val: boolean) => {
  speciesListChecked.value = val ? speciesList : ['Human']
  isIndeterminate.value = !val
}
const handleCheckedChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === speciesList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < speciesList.length
}

const checkAllCate = ref(true)
const isIndeterminateCate = ref(false)
const cateListChecked = ref(['MAIT', 'iNKT', 'GEMT', 'Gamma', 'Delta'])
const cateList = ['MAIT', 'iNKT', 'GEMT', 'Gamma', 'Delta']
const handleCheckAllChangeCate = (val: boolean) => {
  cateListChecked.value = val ? cateList : ['MAIT']
  isIndeterminateCate.value = !val
}
const handleCheckedChangeCate = (value: string[]) => {
  const checkedCount = value.length
  checkAllCate.value = checkedCount === cateList.length
  isIndeterminateCate.value = checkedCount > 0 && checkedCount < cateList.length
}

const checkAllGene = ref(false)
const isIndeterminateGene = ref(false)
const geneListChecked = ref(['TRB'])
const geneList = ['TRA', 'TRB', 'Only paired', 'TRG', 'TRD']
const handleCheckAllChangeGene = (val: boolean) => {
  geneListChecked.value = val ? geneList : ['TRB']
  isIndeterminateGene.value = !val
}
const handleCheckedChangeGene = (value: string[]) => {
  const checkedCountGene = value.length
  checkAllGene.value = checkedCountGene === geneList.length
  isIndeterminateGene.value =
    checkedCountGene > 0 && checkedCountGene < geneList.length
}
const handleCheckedChange1 = (val: boolean) => {
  if (!isIndeterminate.value && !checkAll.value) {
    speciesListChecked.value = ['Human']
  }
}
const handleCheckedChange2 = (val: boolean) => {
  if (!isIndeterminateCate.value && !checkAllCate.value) {
    cateListChecked.value = ['MAIT']
  }
}
const handleCheckedChangeGene1 = (val: boolean) => {
  if (!isIndeterminateGene.value && !checkAllGene.value) {
    geneListChecked.value = ['TRB']
  }
  if (
    geneListChecked.value[0] === 'Only paired' &&
    geneListChecked.value.length > 1
  ) {
    geneListChecked.value.shift()
  }
  if (geneListChecked.value.indexOf('Only paired') >= 0) {
    geneListChecked.value = ['Only paired']
    formDis.value = true
  } else {
    formDis.value = false
  }
}

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
  show_single.value = true
  speciesListChecked.value = ['Human', 'Mouse', 'Cattle']
  geneListChecked.value = ['TRA', 'TRB']
  forwardTable.value = Object.values(allData)
  totalSeqs.value = Object.values(allData).length
  currentPage.value = 1
}
// 搜索功能 -- 添加多个搜索规则
// 1. 前端处理
const tableDataName = ref('')
const tableDataNameV = ref('')
const tableDataNameJ = ref('')
function doSearch() {
  emptyText.value = 'No Data'
  // if (tableDataName.value == '') {
  //   ElMessage({
  //     message: 'If not setting, the default setting will be used to search！',
  //     type: 'warning',
  //   })
  //   // tableDataName.value = 'CAMRPSSFSKLVFC'
  // }
  tableDataName.value = tableDataName.value.toUpperCase()
  tableDataNameV.value = tableDataNameV.value.toUpperCase()
  tableDataNameJ.value = tableDataNameJ.value.toUpperCase()
  var reg = /^[ ACDEFGHIKLMNPQRSTVWY]+$/
  if (tableDataName.value && !reg.test(tableDataName.value)) {
    ElMessage({
      message: 'Please enter the correct amino acid format！',
      type: 'warning',
    })
    return
  }
  const filterTableDataEnd: Array<string> = []
  if (geneListChecked.value.indexOf('Only paired') >= 0) {
    show_single.value = false
    Object.values(allData_paired).forEach((value) => {
      // console.log(!tableDataName.value)
      if (
        !tableDataName.value ||
        value.CDR3a.indexOf(tableDataName.value) >= 0 ||
        value.CDR3b.indexOf(tableDataName.value) >= 0
      ) {
        if (speciesListChecked.value.indexOf(value.Species) >= 0) {
          if (cateListChecked.value.indexOf(value.Cate) >= 0) {
            filterTableDataEnd.push(value)
          }
        }
      }
    })
    forwardTable_paired.value = filterTableDataEnd
    currentPage.value = 1
    totalSeqs.value = filterTableDataEnd.length
  } else {
    show_single.value = true
    Object.values(allData).forEach((value) => {
      // console.log(!tableDataName.value)
      if (
        !tableDataName.value ||
        value.CDR3.indexOf(tableDataName.value) >= 0
      ) {
        if (
          !tableDataNameV.value ||
          value.Vgene.indexOf(tableDataNameV.value) >= 0
        ) {
          if (
            !tableDataNameJ.value ||
            value.Jgene.indexOf(tableDataNameJ.value) >= 0
          ) {
            if (speciesListChecked.value.indexOf(value.Species) >= 0) {
              if (geneListChecked.value.indexOf(value.Gene) >= 0) {
                if (cateListChecked.value.indexOf(value.Cate) >= 0) {
                  filterTableDataEnd.push(value)
                }
              }
            }
          }
        }
      }
    })
    forwardTable.value = filterTableDataEnd
    currentPage.value = 1
    totalSeqs.value = filterTableDataEnd.length
  }

  // currentChangePage(filterTableDataEnd, currentPage)
  // tableDataName.value = ''
  loading.value = false
}

// 2.后端处理返回给前端

// 测试前端向后端post数据
// const postM = () => {
//   axios
//     .post('http://localhost:5000/getMMM', { CDR3a: tableDataName.value })
//     .then((res) => {
//       console.log(res.data)
//     })
// }
</script>

<style scoped>
.header {
  width: 100%;
  /* margin-left: 2%; */
  margin-bottom: 2rem;
  margin-top: 2rem;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  font-family: Helvetica, sans-serif;
}
.container_table {
  width: 100%;
  /* margin-left: 2%; */
  background-color: rgb(231, 228, 218);
  border-radius: 4px;
}
.inner_table {
  width: 96%;
  padding: 10px;
}

.el-table {
  border-radius: 0.3rem;
}

/* .ad_table /deep/ .el-table--fit {
  padding: 20px;
}
.ad_table /deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.ad_table /deep/ .el-table tr {
  background-color: transparent !important;
}
.ad_table /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
} */
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.footer {
  margin-top: 10px;
}
h2 {
  font-size: 3.75rem;
  line-height: 1;
  text-align: left;
  margin-bottom: 1rem;
  font-family: Felix Titling, serif;
}
</style>