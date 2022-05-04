<template>
  <div class='com-1'
       v-loading="loading"
       element-loading-text="Loading...">
    <!-- <h1 style="padding-top:20px">QUICK SEARCH &<br>BROWSER</h1> -->

    <div class='header'
         align="center"
         style='width:100%'>
      <div class='inner_table'>
        <h2 style='text-align:left'>Search bar</h2>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="1"></el-col>
          <el-col :span="22">
            <el-form :label-position='labelPosition'
                     style='max-width: 25rem'
                     :inline="false">
              <el-form-item label='Sequence'>
                <el-input v-model="CDR3seq"
                          placeholder="CAMRPSSFSKLVFC">
                </el-input>
              </el-form-item>
              <el-form-item label="Species">
                <el-select v-model="formSpecies"
                           style="width:25rem"
                           placeholder="please select species"
                           multiple>
                  <el-option v-for='item in optionsSpecies'
                             :key='item'
                             :label='item'
                             :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="Cell Type">
                <el-select v-model="formCate"
                           style="width:25rem"
                           placeholder="please select cell type"
                           multiple>
                  <el-option v-for='item in optionsCate'
                             :key='item'
                             :label='item'
                             :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="Mismatch">
                <el-slider v-model="value2"
                           style='width:20rem'
                           :step="1"
                           :min='0'
                           :max='2'
                           :marks="marks"
                           show-stops />
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
                   @click="resetSearchBar"
                   :icon="Tools">Reset
        </el-button>
      </div>
    </div>
    <div class='container_table'
         align="center"
         v-show='showResult'>
      <div class='inner_table'>
        <h2 style="text-align:left;">Result</h2>
        <el-divider />
        <el-form :label-position='"left"'
                 :inline="true">
          <el-form-item label="Vgene">
            <el-select v-model="CDR3seqV"
                       placeholder="select gene"
                       style='width:10rem'>
              <el-option v-for='item in optionVgene'
                         :key='item'
                         :label='item'
                         :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="Jgene">
            <el-select v-model="CDR3seqJ"
                       placeholder="select gene"
                       style='width:10rem'>
              <el-option v-for='item in optionJgene'
                         :key='item'
                         :label='item'
                         :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button @focus="blurAgain"
                       color='rgb(205,240,228)'
                       @click="doFilter"
                       :icon="Search">Filter</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @focus="blurAgain"
                       type='primary'
                       @click="doDownload"
                       :icon="Download">Export</el-button>
          </el-form-item>
        </el-form>
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
          <el-table :data="forwardTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    :header-cell-style="{background:'#ffffff',color:'#000000',}"
                    border
                    stripe
                    style="margin-bottom:14px;"
                    :default-sort="{prop:'time',order:'descending'}"
                    :highlight-current-row="true">

            <el-table-column type="index"
                             label="ID"
                             align='center'
                             width="50" />
            <el-table-column label="Gene"
                             align='center'
                             width="100">

              <template #default="scope">
                <el-tag type='warning'>{{ scope.row[3]}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-for="(val,key,i) in columnsName"
                             :key="i"
                             :property='key'
                             :label='val'
                             :width='columnsNamewidth[item]'
                             align="center" />
            <el-table-column label="Species"
                             align='center'
                             width="100">
              <template #default="scope">
                <el-tag type='success'>{{ scope.row[4]}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Category"
                             align='center'
                             width="100">
              <template #default="scope">
                <el-tag type='info'>{{ scope.row[5]}}</el-tag>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <!-- <el-table v-loading="loading"
                  element-loading-text="Loading..."
                  :data="forwardTable_paired.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :header-cell-style="{background:'#ffffff',color:'#000000',}"
                  stripe
                  border
                  style="margin-bottom:14px;"
                  :default-sort="{prop:'time',order:'descending'}"
                  :highlight-current-row="true"
                  v-show='show_single'>

          <el-table-column type="index"
                           label="ID"
                           align='center'
                           width="50" />
          <el-table-column label="Gene"
                           align='center'
                           width="100">

            <template #default="scope">
              <el-tag type='warning'>{{ scope.row.Gene}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column v-for="item in columnsName_paired"
                           :key="item.id"
                           :property='item'
                           :label='item'
                           :width='columnsNamewidth[item]'
                           align="center" />

          <el-table-column label="Species"
                           align='center'
                           width="100">
            <template #default="scope">
              <el-tag type='success'>{{ scope.row.Species}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Category"
                           align='center'
                           width="100">

            <template #default="scope">
              <el-tag type='info'>{{ scope.row.Cate}}</el-tag>
            </template>
          </el-table-column>
        </el-table> -->

      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  Search,
  View,
  InfoFilled,
  Tools,
  Download,
} from '@element-plus/icons-vue'
import axios from 'axios'
import CsvExportor from 'csv-exportor'
import store from '@/store/store'
import { ElMessage } from 'element-plus'

const loading = ref(true)
const currentPage = ref(1)
const pageSize = ref(50)
const emptyText = ref('Loading...')
const show_single = ref(true)
const labelPosition = ref('top')
// 表头
const columnsName = ref({ 0: 'Vgene', 1: 'CDR3', 2: 'Jgene' })
const columnsName_paired = ref([
  'Valpha',
  'CDR3a',
  'Jalpha',
  'Vbeta',
  'CDR3b',
  'Jbeta',
])
const columnsNamewidth = reactive({
  CDR3a: 300,
  CDR3b: 300,
  CDR3: 300,
  Vbeta: 100,
})

const totalSeqs = ref(0)
// 控制table显示

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

loading.value = false

// 控制按钮点击后自动失去焦点
const blurAgain = (e) => {
  e.target.blur()
}

// 搜索功能 -- 添加多个搜索规则
// 1. 前端处理
const CDR3seq = ref('')
const CDR3seqV = ref('')
const CDR3seqJ = ref('')
const showResult = ref(false)
const optionVgene = ref([])
const optionJgene = ref([])
function doSearch() {
  CDR3seqV.value = ''
  CDR3seqJ.value = ''
  optionVgene.value = []
  optionJgene.value = []
  emptyText.value = 'No Data'
  // if (CDR3seq.value == '') {
  //   ElMessage({
  //     message: 'If not setting, the default setting will be used to search！',
  //     type: 'warning',
  //   })
  //   // CDR3seq.value = 'CAMRPSSFSKLVFC'
  // }

  CDR3seq.value = CDR3seq.value.toUpperCase()
  CDR3seqV.value = CDR3seqV.value.toUpperCase()
  CDR3seqJ.value = CDR3seqJ.value.toUpperCase()
  var reg = /^[ ACDEFGHIKLMNPQRSTVWY]+$/
  if (CDR3seq.value.length === 0 || !reg.test(CDR3seq.value)) {
    ElMessage({
      message: 'Please enter the correct amino acid format!',
      type: 'warning',
    })
    return
  }
  if (formSpecies.value.length == 0 || formCate.value.length === 0) {
    ElMessage({
      message: 'Please select species or cell type!',
      type: 'warning',
    })
    return
  }
  const filterTableDataEnd: Array<string> = []

  show_single.value = true
  const postData = {
    sequence: CDR3seq.value,
    cate: formCate.value,
    species: formSpecies.value,
    mismatch: value2.value,
  }
  loading.value = true
  forwardTable.value = []
  axios
    .post('http://localhost:5000/getData', {
      identifier: 'search',
      post: postData,
    })
    .then((res) => {
      showResult.value = true
      forwardTable.value = res.data[0][0]
      currentPage.value = 1
      totalSeqs.value = res.data[0][0].length
      loading.value = false

      for (var i = 0; i < res.data[0][1].length; i++) {
        optionVgene.value.push(res.data[0][1][i][0])
      }
      for (var ii = 0; ii < res.data[0][2].length; ii++) {
        optionJgene.value.push(res.data[0][2][ii][0])
      }
    })
}
const forwardTableNew = ref([])
const vgeneFor = ref([])
const jgeneFor = ref([])
const doFilter = () => {
  if (CDR3seqV.value.length === 0) {
    vgeneFor.value = optionVgene.value
  } else {
    vgeneFor.value = [CDR3seqV.value]
  }
  if (CDR3seqJ.value.length === 0) {
    jgeneFor.value = optionJgene.value
  } else {
    jgeneFor.value = [CDR3seqJ.value]
  }
  console.log(vgeneFor.value)
  console.log(jgeneFor.value)
  forwardTable.value.forEach((item) => {
    if (
      vgeneFor.value.indexOf(item[0]) >= 0 &&
      jgeneFor.value.indexOf(item[2]) >= 0
    ) {
      forwardTableNew.value.push(item)
    }
    forwardTable.value = forwardTableNew.value
  })
}
const header = ['Vgene', 'CDR3', 'Jgene', 'Chain', 'Species', 'CellType']
const doDownload = () => {
  CsvExportor.downloadCsv(forwardTable.value, { header }, 'data.csv')
}
const value2 = ref(2)
const marks = reactive({
  0: '0',
  1: '1',
  2: '2',
})

const formSpecies = ref([])
const optionsSpecies = ['Human', 'Mouse', 'Cattle']
const formCate = ref([])
const optionsCate = ['MAIT', 'iNKT', 'GEMT', 'γδ T cell']

const resetSearchBar = () => {
  formSpecies.value = []
  formCate.value = []
  CDR3seq.value = ''
}
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
.el-divider--horizontal {
  border-top: 1px solid #999;
}
</style>