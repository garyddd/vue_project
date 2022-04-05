<template>
  <div style="  fontSize:'5px';background-color:white">
    <h2 style="padding-top:20px">Summary of the Datasets</h2>
    <el-divider />

    <countSpecies></countSpecies>

    <el-divider style='margin-top:0px' />
    <el-row :gutter="10">
      <el-col :span="12">
        <lengthalpha></lengthalpha>
      </el-col>
      <el-col :span="12">
        <lengthbeta></lengthbeta>
      </el-col>
    </el-row>
    <el-divider />
    <h2>Next !!!</h2>
  </div>

</template>

<script lang="ts" setup>
// import echartsCom from './/summaryCom/lengthCom.vue'
import countSpecies from './summaryCom/countAll.vue'
import lengthbeta from './summaryCom/lengthbeta.vue'
import lengthalpha from './summaryCom/lengthalpha.vue'
</script>