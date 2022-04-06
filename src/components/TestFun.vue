<template>
  <div style="  fontSize:'5px';background-color:white">
    <h2 style="padding-top:20px">Summary of the Datasets</h2>
    <el-divider style="color: #409EFF;font-weight: bold;" />

    <div style='width:30%;margin-left:1%'>
      <el-alert :title="updataD"
                type="success"
                :closable="false"
                show-icon />
    </div>
    <countSpecies></countSpecies>
    <el-divider style='margin-top:0px' />
    <!-- <el-row :gutter="10">
      <el-col :span="12">
        <lengthalpha></lengthalpha>
      </el-col>
      <el-col :span="12">
        <lengthbeta></lengthbeta>
      </el-col>
    </el-row> -->

    <lengthalpha></lengthalpha>
    <lengthbeta></lengthbeta>
    <el-divider />
    <sankeyHub></sankeyHub>
    
    <el-divider />
    <sankeyHua></sankeyHua>
  </div>
</template>

<script lang="ts" setup>
// import echartsCom from './/summaryCom/lengthCom.vue'
import countSpecies from './summaryCom/countAll.vue'
import lengthbeta from './summaryCom/lengthcate.vue'
import lengthalpha from './summaryCom/lengthspecies.vue'
import sankeyHua from './sankeyCom/sankeyHua.vue'
import sankeyHub from './sankeyCom/sankeyHub.vue'
import { getCurrentInstance, ref } from 'vue'

const updataD = ref(
  'Last updated on ' +
    getCurrentInstance()?.appContext.config.globalProperties.$updataTime
)
</script>
