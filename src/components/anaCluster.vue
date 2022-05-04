<template>
  <!-- <div class="container_table"> -->
  <div class="inner_table">
    <!-- <h2>Search</h2> -->
    <el-row :gutter="10">

      <el-col :span="12">
        <div class='boxOut'>
          <div class="formHeader">
            <h3 style='margin:0;'>Search</h3>
          </div>
          <div class='box'>
            <el-form>
              <el-form-item label='CDR3 Sequence'>

                <el-input v-model="infoPost"
                          placeholder="Please input CDR3 sequence">
                </el-input>

              </el-form-item>
              <el-form-item label='Distance'>
                <el-select v-model="method">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value" />
                </el-select>

              </el-form-item>
              <el-form-item label='Thershold'>
                <el-slider v-model="value2"
                           :step="1"
                           :min='1'
                           :max='5'
                           :marks="marks"
                           show-stops />
              </el-form-item>
              <br>
              <el-button type='primary'
                         :icon="Search"
                         @focus="blurAgain"
                         @click="getinfo"
                         round>Search</el-button>
            </el-form>

          </div>
        </div>

      </el-col>
      <el-col :span="12"
              v-show='showTable'>
        <div class="boxOut">
          <div class="formHeader">
            <h3 style='margin:0;'>Results</h3>
          </div>
          <div class="box">
            <!-- <el-pagination layout=",->,total"
                           :total="total">
            </el-pagination> -->
            <!-- <p style='text-align:right'> -->

            <!-- </p> -->
            <el-table :data="tableData"
                      v-loading="loading"
                      element-loading-text="Loading..."
                      style="width: 100%;font-size:10px"
                      height="250">

              <el-table-column label="Gene"
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

              <el-table-column label="Category"
                               align='center'>

                <template #default="scope">
                  <el-tag type='info'>{{ scope.row.Cate}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Species"
                               align='center'>
                <template #default="scope">
                  <el-tag type='success'>{{ scope.row.Species }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:10px">
              <el-button type='info'
                         disabled>Total : {{ total}}</el-button>
              <el-button type='primary'
                         @focus="blurAgain"
                         @click="getSummary">show summary</el-button>
            </div>
          </div>
        </div>

      </el-col>
    </el-row>
    <div class='boxOut'
         v-show='showSummary'>
      <div class="formHeader">
        <h3 style='margin:0;'>Summary of Results</h3>
      </div>

    </div>
  </div>

  <!-- </div> -->
  <!-- <el-divider /> -->

  <div class="container_table">
    <div class="inner_table">

      <h2>Predict</h2>
      <el-row :gutter="20">
        <el-col :span="7"></el-col>
        <el-col :span='10'><span>CDR3 Sequence</span>

          <el-upload :action="uploadActionUrl">
            <el-button type="primary"
                       @focus="blurAgain">upload</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"></el-col>
        <el-col :span='16'>output
          <!-- <div style="height:100px;background-color:orange"></div> -->
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script lang="ts" setup>
import axios from 'axios'
import { ElMessage } from 'element-plus'

import { Search } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

const infoPost = ref('')
const value2 = ref(1)
const method = ref('Hamming Diatance')
const marks = reactive({
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
})
const options = [
  {
    value: 'hamming',
    label: 'Hamming Distance',
  },
  {
    value: 'edit',
    label: 'Edit Distance',
  },
]
const total = ref()
const loading = ref(false)
const showTable = ref(false)
const showSummary = ref(false)
const columnsName = ref(['Vgene', 'CDR3', 'Jgene'])
const tableData = ref([])
const blurAgain = (e) => {
  e.target.blur()
}
const getinfo = () => {
  loading.value = true
  showTable.value = true
  infoPost.value = infoPost.value.toUpperCase()
  var reg = /^[ ACDEFGHIKLMNPQRSTVWY]+$/
  if (infoPost.value && !reg.test(infoPost.value)) {
    ElMessage({
      message: 'Please enter the correct amino acid format！',
      type: 'warning',
    })
    return
  }
  axios
    .post('http://127.0.0.1:5000/getMsg', {
      method: method.value,
      thre: value2.value,
      info: infoPost.value,
    })
    .then((res) => {
      tableData.value = res.data
      total.value = res.data.length
      loading.value = false
    })
}
const getSummary = () => {
  showSummary.value = !showSummary.value
}
</script>
<style scoped>
h2 {
  padding: 20px;
}

.container_table {
  width: 96%;
  margin-left: 2%;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
}
.inner_table {
  width: 96%;
  margin-left: 2%;
}
.boxOut {
  margin-top: 2%;
}
.box {
  padding: 2%;
  /* margin-bottom: 2%; */
  background-color: #fff;
  border-radius: 4px;
}
.formHeader {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  margin-bottom: 1%;
  background-color: #19caac7c;
}
.btn-center {
  margin-top: 20px;
}
</style>