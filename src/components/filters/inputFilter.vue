<template>
  <span>{{ filterData.title }}</span>
  <el-input v-model="filterValue" :placeholder="filterData.placeholder" :clearable="filterData.enableClear"/>
</template>

<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
    filterName: String,
})

const { filters, filtersValue } = inject('filters')
const filterData = filters[props.filterName]
const filterValue = filtersValue[props.filterName]
console.log(filterValue);

</script>