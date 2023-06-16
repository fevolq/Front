<template>
  <div class="filter input" :class="filterConfig.required ? 'required' : ''">
    <span>{{ filter.title }}</span>
    <el-input
     class="filter-input"
     v-model="filter.values"
     :placeholder="filterConfig.placeholder"
     clearable
    />
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

<style scoped>

.filter-input {
  width: 70%;
}
</style>