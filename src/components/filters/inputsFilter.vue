<template>
  <div class="filter inputs" :class="filterConfig.required ? 'required' : ''">
    <span>{{ filter.title }} : </span>
    <a-input-tag
     class="filter-inputs"
     v-model="filter.values"
     :style="{width:'200px'}"
     :default-value="filterConfig.defaultValue || []"
     placeholder="Enter"
     :max-tag-count="3"
     allow-clear
     unique-value
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

.inputs .filter-inputs {
  /* display: inline-block; */
}

.filter-inputs {
  border: 1px inset rgba(143, 141, 141, 0.203);
  background-color: white;
}
</style>