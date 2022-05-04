<template>
  <el-carousel height="600px"
               :autoplay="false">
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <graphDescgdtitle :name='"Gene usage"'></graphDescgdtitle>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <graphDescGD :name='"hm"'></graphDescGD>
          </el-col>
          <el-col :span="13">
            <div class="carousel-ele gene">
              <sankeyOne2 :species='species'
                          :cate='cate'>
              </sankeyOne2>
            </div>
          </el-col>

          <el-col :span="1"></el-col>
        </el-row>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <graphDescgdtitle :name='"NMI Heatmap"'></graphDescgdtitle>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2"></el-col>
          <el-col :span="13">
            <div style='margin-top:1rem;'>
              <heatmapCom :species='species'
                          :cate='cate'></heatmapCom>
            </div>
          </el-col>
          <el-col :span="8">
            <graphDescGD :name='"hm"'></graphDescGD>
          </el-col>

          <el-col :span="1"></el-col>
        </el-row>

      </div>
    </el-carousel-item>
    <el-carousel-item>

      <div class="carousel-ele">
        <el-row>
          <graphDescgdtitle :name='"Sequence Logo"'></graphDescgdtitle>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <graphDescGD :name='"logo"'></graphDescGD>

          </el-col>
          <el-col :span="13">
            <seqLogo :species='species'
                     :cate='cate'></seqLogo>
            <aaUsage3 :species='species'
                      :cate='cate'></aaUsage3>
          </el-col>

          <el-col :span="1"></el-col>
        </el-row>

      </div>
    </el-carousel-item>

    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <graphDescgdtitle :name='"Network Graph"'></graphDescgdtitle>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"></el-col>
          <el-col :span="12">
            <graphCom :species='species'
                      :cate='cate'></graphCom>
          </el-col>
          <el-col :span="8">
            <graphDescGD :name='"graph"'></graphDescGD>
          </el-col>

          <el-col :span="1"></el-col>
        </el-row>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">Browser data of {{species}} {{cate}} CDR3</p>
          </div>

        </el-row>

        <dataTable :species='species'
                   :cate='cate'></dataTable>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts" setup>
import graphCom from './humanCom/graphCom.vue'
import aaUsageNew from './humanCom/aaNew.vue'
import aaUsage3 from './humanCom/aa3.vue'
import seqLogo from './seqLogo.vue'
import heatmapCom from './heatmapCom.vue'
import graphDescgdtitle from './chartsCom/graphDescgdtitle.vue'
import graphDescGD from './chartsCom/graphDescGD.vue'
import dataTable from './chartsCom/dataTable.vue'
import sankeyOne2 from './sankeyCom2.vue'
import { defineProps } from 'vue'
const props = defineProps({
  cate: String,
  species: String,
})
</script>
<style scoped>
.figure {
  margin-bottom: 1.5rem;
}
.figcaption {
  text-align: left;
}
.species-h1 {
  text-align: left;
}
.p1 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 1.675rem;
  line-height: 2.25rem;
  font-weight: 300;
  font-family: sans-serif;
}
.p2 {
  opacity: 0.6;
  margin-top: 0.5rem;
  font-size: 0.775rem;
  line-height: 1.25rem;
  font-family: sans-serif;
}
.carousel-ele {
  width: 100%;
  height: 650px;
  background-color: #e7e4da;
}
.gene {
  overflow: auto;
  height: 500px;
}
</style>