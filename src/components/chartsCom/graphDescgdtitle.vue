<template>
  <div class='figcaption'
       style='margin-left:0.25rem'>
    <p class="p1">{{props.name}} of CDR3 chain</p><p class='p2'>&nbsp;&nbsp;length:15</p>
    <!-- <p class='p2'> length:15 | <el-button @focus="blurAgain"
                 type='text'
                 @click="describe=true">DESCRIPTION</el-button>
    </p>
    <el-drawer v-model="describe"
               title="DESCRIPTION"
               direction="rtl"
               size="20%">
      <p class="p1">Graph</p>
      <p class="p2">The relationship graph consists of CDR3s of length 15 corresponding to the cell type. Colored by TRBV. Hamming distances, threshold: MAIT(equal 1), iNKT&GEMT(less
        than
        5)</p>
      <p class="p1">Logo | Heatmap</p>
      <p class="p2">Probability of each amino acid in each CDR3β position depicted by a sequence logo, with a heat map of normalized MI (NMI) between each pair of CDR3β residues for the
        most frequent CDR3β length, 15 amino acids. Inspired by <i>Lagattuta et al</i>.</p>
     
    </el-drawer> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  name: String,
})
const describe = ref(false)
const blurAgain = (e) => {
  e.target.blur()
}
</script>

<style scoped>
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
</style>