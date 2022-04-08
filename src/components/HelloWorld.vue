<template>
  <div class="container_table">
    <el-row>
      <el-col :span='16'>
        <div style="width:100%;height:300px;background-color:white">
<h2 style=";margin:2%;">Welcome to UcTCR-db!</h2>
        </div>
      </el-col>
      <el-col :span='8'>
        <img alt="logo"
             src="../assets/logo_l.png">
        <p>blabla...</p>
      </el-col>
    </el-row>

    <el-row :gutter='10'>
      <el-col :span='18'>

        <div style="margin:2%;">

          <h3 style="text-align:left;margin:2%;">Data Statistics:</h3>
        </div>
        <countSpecies></countSpecies>
        <el-link type='primary'
                 align='left' href="/summary">View more<el-icon class="el-icon--right">
            <ArrowRightBold />
          </el-icon>
        </el-link>
      </el-col>
      <el-col :span='6'>
        <el-card class="box-card"  style="background-color:#19CAAD" body-style="background-color:white">
          <template #header>
            <div class="card-header">
              <span>RECENTLY NEWS</span>
            </div>
          </template>
          <div>News</div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts" setup>
import countSpecies from './summaryCom/countAll.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container_table {
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
}
.el-link {
  margin-bottom: 20px;
}
.el-card {
  border:0px;
}
.box-card {
  margin:53% 3% 13% 3%;

}

</style>




