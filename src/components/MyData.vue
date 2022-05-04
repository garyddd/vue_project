<template>
  <div class="header"
       align="center">
    <div class="inner_table">
      <h2 style="text-align: left">Dataset Filter</h2>
      <!-- <h2 style="color: #19caad; text-align: left">Dataset Filter & Search</h2> -->
      <el-divider />
      <div class="inner">
        <el-row>
          <el-col :span="12">
            <p>
              Species:
              <el-select v-model="value1"
                         class="m-1"
                         placeholder="Select">
                <el-option v-for="item1 in options1"
                           :key="item1.value"
                           :label="item1.label"
                           :value="item1.value" />
              </el-select>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              T Cell Type:
              <el-select v-model="value2"
                         class="m-2"
                         placeholder="Select">
                <el-option v-for="item2 in options2"
                           :key="item2.value"
                           :label="item2.label"
                           :value="item2.value" />
              </el-select>
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-top: 20px; background-color: #f3f4f5; padding: 14px">
      <el-button @focus="blurAgain"
                 type="primary"
                 @click="doSearch"
                 :icon="Search">Search</el-button>
      <el-button @focus="blurAgain"
                 type="primary"
                 @click="openData"
                 :icon='View'>ShowAll
      </el-button>
    </div>
  </div>

  <div class="main"
       align="center">
    <div class="inner_table">
      <h2 style="text-align: left">Download</h2>
      <!-- <h2 style="color: #19caad; text-align: left">Download</h2> -->
      <el-divider />
      <div class="data_table">
        <el-pagination v-model:currentPage="currentPage"
                       background
                       v-model:page-size="pageSize"
                       :page-sizes="[10, 20, 50, 100]"
                       layout=" prev, pager, next, jumper, ->,sizes,total"
                       :total="totalSeqs"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange">
        </el-pagination>
        <el-button @focus="blurAgain"
                   type="primary"
                   @click="doDownload"
                   class="botton1"
                   :icon="Download">Download</el-button>

        <el-table :data="formData"
                  border
                  style="width: 100%"
                  :header-cell-style="{
						background: '#BEE7E9',
						color: '#000000',
					}"
                  stripe
                  borderstyle="margin-bottom:14px;"
                  :default-sort="{ prop: 'time', order: 'descending' }"
                  :highlight-current-row="true"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="50"
                           align="center" />
          <el-table-column prop="ID"
                           label="ID"
                           width="50"
                           align="center" />
          <el-table-column prop="PMID"
                           label="PMID"
                           width="100"
                           align="center" />
          <el-table-column prop="Category"
                           label="Category"
                           width="90"
                           align="center" />
          <el-table-column prop="Species"
                           label="Species"
                           width="90"
                           align="center" />
          <el-table-column prop="Chain_num"
                           label="Chain_num"
                           width="160"
                           align="center" />
          <el-table-column prop="dataSource"
                           label="Data Source"
                           align="left" />

          <upload-excel @getUploadData="getExcelData"></upload-excel>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Search, View } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'MyData',
  props: {
    msg: String,
  },
})
</script>

<script lang="ts" setup>
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { ref, onBeforeMount } from 'vue'
import { link } from 'fs'

const value1 = ref('')
const options1 = [
  {
    value: 'Mouse',
    label: 'Mouse',
  },
  {
    value: 'Human',
    label: 'Human',
  },
  {
    value: 'Cattle',
    label: 'Cattle',
  },
]
const value2 = ref('')
const options2 = [
  {
    value: 'MAIT',
    label: 'MAIT',
  },
  {
    value: 'iNKT',
    label: 'iNKT',
  },
  {
    value: 'GEMT',
    label: 'GEMT',
  },
  {
    value: 'TRG',
    label: 'TRG',
  },
  {
    value: 'TRD',
    label: 'TRD',
  },
]

let formData = ref([])
let copyFormData = ref([])
let downloadData = ref([])

function getData() {
  axios.get('/data11.json').then((res) => {
    formData.value = res.data
    copyFormData.value = res.data
  })
}

function doSearch() {
  formData.value = copyFormData.value
  if (value1.value && !value2.value) {
    formData.value = formData.value.filter((item) => {
      return item.Species === value1.value
    })
  } else if (!value1.value && value2.value) {
    formData.value = formData.value.filter((item) => {
      return item.Category === value2.value
    })
  } else {
    formData.value = formData.value.filter((item) => {
      return item.Species === value1.value && item.Category === value2.value
    })
  }
}

function handleSelectionChange(e) {
  downloadData.value = e
}

function openData() {
  value1.value = ''
  value2.value = ''
  formData.value = copyFormData.value
}

async function doDownload() {
  const downloadFileList: string[] = []
  downloadData.value.map((item) => {
    downloadFileList.push(item.name + '.xlsx')
  })
  // const result = await fetch('http://127.0.0.1:5000/download', {
  const result = await fetch('http://localhost:8080/#/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileList: downloadFileList,
    }),
  }).then((res) => res.blob())

  const l = document.createElement('a')
  l.href = window.URL.createObjectURL(result)
  if (
    result.type ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    l.download = downloadFileList[0] + '.xlsx'
  } else {
    l.download = 'UcTCRfile.zip'
  }

  l.click()
  window.URL.revokeObjectURL(l.href)
  /* if (downloadData.value.length === 1) {
		let name = downloadData.value[0].name;
		let a = document.createElement('a');
		a.href = `http://localhost:8080/downloadfilestwo/${name}.xlsx`;
		a.setAttribute('download', `${name}.xlsx`);
		a.click();
	} else {
		let zip = new JSZip();
		let cache = {};
		let promises = [];
		let files = [];
		for (let i = 0; i < downloadData.value.length; i++) {
			let url = `http://localhost:8080/downloadfiles/${downloadData.value[i].name}.xlsx`;
			files.push(url);
		}
		for (let i of files) {
			let name = i.split('/')[4];
			const promise = getImgArrayBuffer(i).then((data) => {
				zip.file(name, data, { binary: true });
				cache[name] = data;
			});
			promises.push(promise);
		}

		Promise.all(promises).then(() => {
			zip.generateAsync({ type: 'blob' }).then((content) => {
				FileSaver.saveAs(content, 'TCRdata');
			});
		});
	} */
}

function getImgArrayBuffer(url) {
  return new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open('GET', url, true)
    xmlhttp.responseType = 'blob'
    xmlhttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response)
      } else {
        reject(this.status)
      }
    }
    xmlhttp.send()
  })
}
const blurAgain = (e) => {
  e.target.blur()
}
onBeforeMount(() => {
  getData()
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header,
.main {
  /* padding: 30px; */
  width: 96%;
  margin-left: 2%;
  margin-bottom: 2rem;
  margin-top: 2rem;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
}
.botton1 {
  margin-bottom: 10px;
  float: right;
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
h2 {
  font-size: 3.75rem;
  line-height: 1;
  text-align: left;
  margin-bottom: 1rem;
  font-family: Felix Titling, serif;
}
</style>
