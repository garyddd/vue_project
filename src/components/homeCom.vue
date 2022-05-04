<template>
  <div class="com-1">
    <h1 style="padding-top:20px">
      Welcome to <br> <span style='color:#f4606c'>Uc</span><span style='color:rgb(255,208,75)'>TCR</span>db!
    </h1>
    <el-divider style="color: #409eff; font-weight: bold" />

    <el-row :gutter="15">
      <el-col :span="14">

        <p class="one_one_p1">
          TCRdata is a rich T cell receptor(TCR) database. Theoretically, T
          cells undergoing random recombination of V(D)J gene during
          differentiation and maturation in thymus will have high diversity
          and antigen specificity to deal with antigen exposure and maintain
          immune balance in vivo. Among them, the diversity and antigen
          specificity of TCR are mainly determined by hypervariable
          complementarity determining region3(CDR3). Therefore, TCRdata
          contains processed sequences of TCRs CDR3 beta chain of human with
          different species and T cell types. Here, we provide a convenient
          interface to query the database and use integrated tools, which
          provides researchers with more ways to mine and predict the
          mechanism of TCR specific recognition and its Immune repertoire
          information from sequence data.
        </p>
        <br />
        <p align="left"><b>Users can do in UcTCRdb：</b></p>
        <ul align="left"
            text-align="justify">
          <li>
            <el-link class='link-1'
                     :underline="false"
                     href='#/browser'
                     target="_blank">
              Browse TCR CDR3 sequences in different species and T cell types.</el-link>
          </li>
          <li>
            <el-link class='link-1'
                     :underline="false"
                     href='#/search'
                     target="_blank">Search identical/similar TCR CDR3 sequences.</el-link>
          </li>
          <li>
            <el-link class='link-1'
                     :underline="false"
                     href='#/download'
                     target="_blank">
              Download the data you are interested in.</el-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="10">

        <div style="width:100%;background-color:#32295d">
          <el-row>
            <el-col :span="12">
              <countAll :countLabel='countLabelCate'></countAll>
            </el-col>
            <el-col :span="12">
              <countAll :countLabel='countLabelSpecies'></countAll>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <countAll :countLabel='countLabelGene'></countAll>
            </el-col>
            <el-col :span='12'>
              <countPaired></countPaired>
            </el-col>
          </el-row>
        </div>

        <div class='figcaption'>
          <p class='p1'>Count Summary | Total: 20,548</p>

          <p class='p2'><br> </p>
        </div>
        <!-- <div class="homeimg"
             style='background-color:#32295d'>
        </div>
        <div class="homeimg"
             style='background-color:rgb(244,191,40)'></div> -->
        <!-- <el-carousel trigger="click"
                     height="180px"
                     weight="150px">
          <el-carousel-item v-for="item in 4"
                            :key="item">
            <img alt="Vue logo"
                 src="../assets/logo_l.png" />
          </el-carousel-item>
        </el-carousel>
        <div class="one_three">
          <h3>Update</h3>
          <div style="text-align: left">
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
     
  </div> -->
      </el-col>
    </el-row>
    <div align='left'>
      <el-link href="/"
               :underline='false'
               class="arrow-f">

        <span class="arrow">
          <span class="line bar">
            <svg width="11"
                 height="18"
                 viewBox="0 0 11 18"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9L1 17"
                    stroke="rgb(255,208,75)"
                    stroke-width="2"></path>
            </svg>
          </span>
        </span> <span class="text order-first md:order-last">
          &nbsp;&nbsp; Learn More about the database
        </span>
      </el-link>
    </div>
    <!-- <el-link type="primary"
             href="#/summary"
             style='text-transform:uppercase'>
      <el-icon>
        <ArrowRightBold />
      </el-icon>
      <el-icon>
        <ArrowRightBold />
      </el-icon>

      <el-icon>
        <Minus />
      </el-icon>
      <el-icon>
        <ArrowRightBold />
      </el-icon>
      Learn More about the dataset
    </el-link> -->
  </div>

</template>

<script lang="ts" setup>
import countAll from './summaryCom/countAll.vue'
import countPaired from './summaryCom/countPaired.vue'
import { ArrowRightBold, Minus } from '@element-plus/icons-vue'
import length2Com from './humanCom/length2Com.vue'
import { ref } from 'vue'
const count = ref('Gene')
const countLabelGene = ref('Gene')
const countLabelSpecies = ref('Species')
const countLabelCate = ref('Cate')
const classspec = ref('spec')
const classcell = ref('cell')

const activities = [
  {
    content: 'ucTCR_db update.',
    timestamp: '2022-04-30',
  },
  {
    content: "ucTCR_db's deployment completed.",
    timestamp: '2022-04-20',
  },
  {
    content: 'ucTCR_db has been built.',
    timestamp: '2022-04-11',
  },
]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeimg {
  width: 100%;
  height: 50%;
  /* background-color: white; */
}
.container_table {
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
  border-radius: 4px;
}
.one_one_p1 {
  font-size: 1.5rem;
  line-height: 2.25rem;
  margin-top: 0;
  /* font-weight: 300; */
  text-align: left;
  font-weight: 400;
  font-family: Arial, Helvetica, sans-serif;
}
.el-link {
  margin-bottom: 20px;
}
.el-card {
  border: 0px;
}
.box-card {
  margin: 53% 3% 13% 3%;
}
.figcaption {
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
.el-link {
  display: inline;
}
.link-1:hover {
  text-decoration: blink !important;
  color: rgb(244, 96, 108);
  font-size: 16px;
  transition: all 0.25s ease-in-out;
}
.arrow-f {
  position: relative;
  font-family: 'sans-serif';
  font-weight: 500;
  letter-spacing: 0.1em;
  font-size: 0.95em;
  text-transform: uppercase;
}
.arrow-f:hover {
  color: rgb(244, 96, 108);
  transition: all 0.3s ease-in-out;
}
.arrow {
  position: relative;
  top: 2px;
  height: 100%;
}
.arrow .bar {
  position: relative;
  top: -7px;
  width: 2.4em;
}

.arrow-f:hover .bar {
  width: 4em;
  transition: width 0.2s ease-in-out;
}
.arrow:hover .bar {
  width: 4em;
  transition: width 0.2s ease-in-out;
}
.arrow .line {
  display: inline-block;
  height: 2px;
  background: rgb(255, 208, 75);
}

.arrow svg {
  position: absolute;
  top: -8px;
  right: -2px;
}
</style>




