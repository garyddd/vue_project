<template>
  <div class='container_table'
       align="center"
       v-loading="loading"
       element-loading-text="Loading...">
    <div class="inner_table">
      <div style='float:left;margin-bottom:1rem;display:inline'>
        <el-button type="success"
                   @click='showtable1f'
                   @focus="blurAgain">View data</el-button>
      </div>
      <div v-if='showCollapse'
           style='float:right;margin-bottom:1rem;display:inline'>
        <el-button type="primary"
                   @click='
             destoryTable'
                   @focus="blurAgain">Collapse data</el-button>
      </div>
    </div>
    <div class='inner_table'
         v-if='showCollapse'>

      <div>

        <el-table :data="forwardTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :header-cell-style="{background:'#ffffff',color:'#000000',}"
                  border
                  stripe
                  empty-text='Loading...'
                  style="margin-bottom:14px;"
                  :default-sort="{prop:'time',order:'descending'}"
                  :highlight-current-row="true"
                  :height='tableHeight'>

          <el-table-column type="index"
                           label="ID"
                           align='center' />
          <el-table-column label="Gene"
                           width="180"
                           align='center'>

            <template #default="scope">
              <el-tag type='warning'>{{ scope.row[3]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-for="(val,key,i) in columnsName"
                           :key="i"
                           :property='key'
                           :label='val'
                           align="center" />
          <el-table-column label="Species"
                           width="180"
                           align='center'>
            <template #default="scope">
              <el-tag type='success'>{{ scope.row[4]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Category"
                           width="180"
                           align='center'>
            <template #default="scope">
              <el-tag type='info'>{{ scope.row[5]}}</el-tag>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination v-if='showPagi'
                       :currentPage="currentPage"
                       background
                       :page-size="pageSize"
                       :page-sizes="[50, 100, 150, 300]"
                       layout=" prev, pager, next, jumper, ->,sizes,total"
                       :total="totalSeqs"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange">
        </el-pagination>

      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineProps } from 'vue'
import { Search, View, InfoFilled } from '@element-plus/icons-vue'
import axios from 'axios'

import store from '@/store/store'
import { ElMessage } from 'element-plus'
const props = defineProps({
  species: String,
  cate: String,
})
const loading = ref(false)
const showPagi = ref(false)
const currentPage = ref(1)
const pageSize = ref(50)
const emptyText = ref('Loading...')
const labelPosition = ref('top')
// 表头
const columnsName = ref({ 0: 'Vgene', 1: 'CDR3', 2: 'Jgene' })

const totalSeqs = ref(0)
const tableHeight = ref(50)
const forwardTable = ref([])

const filterTableDataEnd: Array<string> = []
const showtable1f = () => {
  tableHeight.value = 400
  loading.value = true
  axios
    .post('http://localhost:5000/getData', {
      identifier: 'forward',
      species: props.species,
      cate: props.cate,
    })
    .then((res) => {
      forwardTable.value = res.data
      currentPage.value = 1
      totalSeqs.value = forwardTable.value.length
      showPagi.value = true
      showCollapse.value = true
      loading.value = false
    })
}
const showCollapse = ref(false)
const destoryTable = () => {
  showCollapse.value = false
}

const blurAgain = (e) => {
  e.target.blur()
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