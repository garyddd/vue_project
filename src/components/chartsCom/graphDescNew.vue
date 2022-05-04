<template>
  <div style='margin-top:10rem'><span class='figcap'>Figure Description</span>
    <div v-if='logo'>
      <p class="p2"
         style='text-align:left'>The CDR3β sequence logos including amino acids as well as TRBV and TRBJ were depicted by calculating the occurrence weights of different amino acids at the
        same position. The amino acids were colored by their chemical properties.</p>
      <p class="p2"
         style='text-align:left'>The scatter plot of amino acid usage is obtained by calculating the proportion of amino acid use, with the horizontal and vertical coordinates being the
        proportion of use of the corresponding amino acid in the reference and TRA/B respectively. Reference data is calculated from 100,000 randomly sampled CDR3 sequences. We focus on amino acids in
        positions <b>5 to 9</b> of CDR3 chain. Use the mouse to see the exact values.</p>
      <!-- <p class="p2"
         style='text-align:left'><b>Default length α chain : 12&nbsp;&nbsp;β chain : 15</p> -->
    </div>
    <div v-if='hm'>
      <p class="p2"
         style='text-align:left'>The normalized mutual information value (NMI) heat map is obtained by calculating the NMI of the distribution of amino acid occurrences at different
        locations. The NMI is calculated by the <i>metrics normalized_mutual_info_score</i> method of the python package <i>sklearn</i>, with the default setting of the average_method
        <i><b>'arithmetic'</b></i>. The NMI takes values in the range 0-1, with a larger NMI indicating a more similar amino acid
        distribution.Inspired by <i>Lagattuta et al</i>. Use the mouse to see the exact values.
      </p>
    </div>
    <div v-if='graph'>
      <p class="p2"
         style='text-align:left'>The network graph is obtained by calculating the distances between the amino acids of different sequences. Because of the rather uneven distribution of
        the data, we only show the highest frequency of CDR3β amino acid residue lengths, 15 amino acids.<b> Hamming distance</b> was employed here , with a distance threshold <b>equal to 1</b>.
        Colored by TRBV. Use the mouse to see the exact values.</p>
    </div>
    <div v-if='length'>
      <p class="p2"
         style='text-align:left'>The length distribution of CDR3 for the corresponding species. We selected lengths from 10-21 for the statistics, which show the preference of CDR3 length
        distribution. <b> left:α chain; right: β chain.</b></p>
    </div>
    <div v-if='gene'>
      <p class="p2"
         style='text-align:left'>Gene use preferences were plotted by counting the gene use owned by all corresponding TCRs. The gene use analysis allows us to identify the dominant distribution of
        gene use.</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  name: String,
})
const logo = ref(false)
const hm = ref(false)
const graph = ref(false)
const length = ref(false)
const gene = ref(false)

if (props.name === 'logo') {
  logo.value = true
}
if (props.name === 'hm') {
  hm.value = true
}
if (props.name === 'graph') {
  graph.value = true
}
if (props.name === 'length') {
  length.value = true
}
if (props.name === 'gene') {
  gene.value = true
}
</script>
<style scoped>
.figcap {
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
}
.p2 {
  opacity: 0.6;
  margin-top: 0.5rem;
  font-size: 0.775rem;
  line-height: 1.25rem;
  font-family: sans-serif;
}
</style>