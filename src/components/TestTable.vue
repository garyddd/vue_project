<template xmlns:height="http://www.w3.org/1999/xhtml">
    <div class="header">
      <el-input v-model="tableDataName"
                placeholder="CAMRPSSFSKLVFC"
                style="width:500px" />
      <el-button @click.prevent="handleClick($event)" type="primary"
                 @click="doFilter">Search</el-button>
      <el-button @click.prevent="handleClick($event)" type="primary"
                 @click="openData">ShowAll</el-button>
    </div>
    <div class='container_table' align="center" v-show="ShowFlag">
      <el-pagination :current-page="currentPage1"
                     background
                     layout=" prev, pager, next, jumper,->, sizes,total,slot"
                     :page-sizes="[50, 100, 150, 300]"
                     :page-size="pageSize"
                     :total="total1"
                     @size-change="handleSizeChange1"
                     @current-change="handleCurrentChange1" />
      <el-table :data="tempList"
                :header-cell-style="{background:'#BEE7E9',color:'#000000',}"
                stripe
                border
                style="margin-bottom:14px;"
                :empty-text="emptyText"
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
    <div class="footer" />
</template>
 
<script>
// eslint-disable-next-line no-undef,no-unused-vars
import axios from 'axios'
import { toRaw } from '@vue/reactivity'

export default {
  name: 'TestTable',
  data() {
    return {
      total1: 10,
      currentPage1: 1,
      pageSize: 50,
      bondsAllList: '',
      tableDataName: '',
      tableDataEnd: '',
      filterTableDataEnd: '',
      flag: 0,
      ShowFlag: true,
      columnsName: [
        'Valpha',
        'CDR3a',
        'Jalpha',
        'Vbeta',
        'CDR3b',
        'Jbeta',
        'Dataset',
      ],
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5000/getMsg'
      axios
        .get(path)
        .then((res) => {
          this.bondsAllList = res.data
          this.getCreateTable()
          // 获取数据行名
          // this.columnsName = Object.keys(toRaw(this.bondsAllList[0]))
        })
        .catch((error) => {
          alert(error)
        })
    },
    handleSizeChange1: function (pageSize) {
      // 每页条数切换
      // eslint-disable-next-line eqeqeq
      if (this.flag == 1) {
        return
      }
      this.pageSize = pageSize
      this.handleCurrentChange1(this.currentPage1)
    },
    handleCurrentChange1: function (currentPage) {
      // 页码切换
      this.currentPage1 = currentPage
      // eslint-disable-next-line eqeqeq
      if (this.flag == 0) {
        this.currentChangePage(this.bondsAllList, currentPage)
      } else {
        this.currentChangePage(this.filterTableDataEnd, currentPage)
      }
    },
    // 分页方法（重点）
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize
      this.tempList = []
      const to = currentPage * this.pageSize
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from])
        }
      }
    },
    getCreateTable() {
      this.total1 = this.bondsAllList.length
      this.flag = 0
      this.handleCurrentChange1(this.currentPage1)
    },
    doFilter() {
      // eslint-disable-next-line eqeqeq
      if (this.tableDataName == '') {
        // this.$message.warning('查询条件不能为空！')
        // return
        this.tableDataName = 'CAMRPSSFSKLVFC'
      }
      this.tableDataName = this.tableDataName.toUpperCase()
      var reg = /^[ACDEFGHIKLMNPQRSTVWY]+$/
      if (!reg.test(this.tableDataName)) {
        this.$message.warning('Please enter the correct amino acid format！')
        return
      }
      this.tableDataEnd = []
      this.filterTableDataEnd = []
      this.bondsAllList.forEach((value, index) => {
        if (value.CDR3a) {
          if (value.CDR3a.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
            console.log(value)
          }
        }
      })
      this.currentPage1 = 1
      this.total1 = this.filterTableDataEnd.length
      this.currentChangePage(this.filterTableDataEnd, this.currentPage1)
      this.flag = 1
      this.ShowFlag = true
      this.tableDataName = ''
    },
    openData() {
      // this.tableDataName = []     
      // 判断search之后点击showall默认显示所有 
      if (!this.flag){
        this.ShowFlag = ! this.ShowFlag
      }
      
      this.getCreateTable()
    },
    handleClick(event) {
    event.target.blur();
    if(event.target.nodeName == "SPAN") {
        event.target.parentNode.blur();
    }
}
  },
}
</script>
 
<style type="text/css">
.header {
  padding: 30px;
  text-align: center;
}
.container_table {
  width:96%;
  margin-left:2%;
}
.el-table{

  border-radius: 10px;
}


</style>
