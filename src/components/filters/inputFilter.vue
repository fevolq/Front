<template>
  <div class="filter input" :class="filterData.required ? 'required' : ''">
    <span>{{ filterData.title }} : </span>
    <el-input
     class="filter-input"
     v-model="filterValue"
     :placeholder="filterData.placeholder"
     clearable
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
    filterName: String,
})

const { filters, filtersValue } = inject('filters')
const filterData = filters[props.filterName]
const filterValue = filtersValue[props.filterName]
console.log(filterValue);

</script>

<style scoped>
.input > span {
  display: inline;
}

.filter-input {
  width: 70%;
}
</style>