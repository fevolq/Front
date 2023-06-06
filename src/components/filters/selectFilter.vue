<template>
  <div class="filter select" :class="filterData.required ? 'required' : ''">
    <span>{{ filterData.title }} : </span>
    <el-select
     v-model="filterValue"
     clearable
     :placeholder="filterData.placeholder"
     :multiple="filterData.type=='multiple'"
    >
      <el-option
        v-for="item in filterData.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
    filterName: String,
})

const { filters, filtersValue } = inject('filters')
const filterData = filters[props.filterName]
const filterValue = ref(filtersValue[props.filterName])

</script>