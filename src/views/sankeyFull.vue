<template>
  <sankeyTwo :species='species'
             :cate='cate'></sankeyTwo>
</template>
<script lang="ts" setup>
import sankeyTwo from '../components/sankeyCom2.vue'
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query)
const species = route.query.species
const cate = route.query.cate
</script>