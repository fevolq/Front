<template>
  <div class="filter select" :class="filterConfig.required ? 'required' : ''">
    <span>{{ filter.title }}</span>
    <el-select
     v-model="filter.values"
     :clearable="!filterConfig.required"
     :placeholder="filterConfig.placeholder"
     :multiple="filter.type=='multiple'"
    >
      <el-option
        v-for="item in filterConfig.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
    filterName: String,
})

const { filters } = inject('filters')
const filter = filters[props.filterName]
const filterConfig = filter.config

</script>