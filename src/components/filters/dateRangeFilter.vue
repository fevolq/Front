<template>
  <div class="filter daterange" :class="filterConfig.required ? 'required' : ''">
    <span>{{ filter.title }} : </span>
    <el-date-picker
      v-model="filter.values"
      type="daterange"
      value-format="YYYY-MM-DD"
      unlink-panels
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      :shortcuts="shortcuts"
      
      :clearable="!filterConfig.required"
      size="default"
      editable
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'

import { getDate } from '../../utils/util.js'

const props = defineProps({
    filterName: String,
})

const { filters } = inject('filters')
const filter = filters[props.filterName]
const filterConfig = filter.config
if (filterConfig.defaultValue) {
  filter.values = [getDate(filterConfig.defaultValue[0]), getDate(filterConfig.defaultValue[1])]
}

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

</script>

<style scoped>
.input > span {
  display: inline;
}

.filter-input {
  width: 70%;
}
</style>