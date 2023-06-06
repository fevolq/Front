<template>
  <div class="container">
    <!-- 过滤器 -->
    <div class="filters">
      <template v-for="filter in filters" :key="filter.name">
        <template v-if="filter.type=='input'">
          <inputFilter :filterName="filter.name"/>
        </template>
        <template v-else-if="filter.type=='single' || filter.type=='multiple'">
          <selectFilter :filterName="filter.name"/>
        </template>
        <template v-else>
          {{ filter.title }} - {{ filter.type }}
        </template>
      </template>

      <el-button :icon="Search" @click="handleSearch" circle />
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable" header-cell-class-name="table-header">
        <template v-for="column in columns" :key="column.name">
          <el-table-column
           v-if="column.extra.show_tag"
           :prop="column.name"
           :label="column.label"
           align="center"
           width="180" >
           <template #default="scope">
              <el-tag
                :type="success"
                v-if="scope.row[column.name]"
              >
                {{ scope.row[column.name] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
           v-else
           :prop="column.name"
           :label="column.label"
           align="center"
           width="180"
           >
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, provide } from 'vue'
import {} from 'element-plus'

import inputFilter from '../components/filters/inputFilter.vue'
import selectFilter from '../components/filters/selectFilter.vue'
import * as dashboardApi from '../api/dashboard.js'

const props = defineProps({
  dashboardName: String,
  chartName: String,
})

const filters = reactive({})
const filtersValue = reactive({})

const columns = ref([])
const tableData = ref([])

const getFilters = () => {
  dashboardApi.getConfig(props.dashboardName).then(res => {
    for (let filterData of res['data']['filters']) {
      let oneFilter = {
        name: filterData['name'],
        title: filterData['title'],
        type: filterData['type'],
        options: filterData['options'],
        sql: filterData['sql'],
        defaultExclude: filterData['default_exclude'],
        defaultExpand: filterData['default_expand'],
        defaultValue: filterData['default_value'],
        enableExclude: filterData['enable_exclude'],
        enableExpand: filterData['enable_expand'],
        enableClear: filterData['enable_clear'],
      }
      filters[oneFilter.name] = oneFilter
      filtersValue[oneFilter.name] = ref(null)
    }
  })
}
provide('filters', {
  filters,
  filtersValue
})

onBeforeMount(() => {
  getFilters()
  getChart()
})

const getChart = () => {
  const filtersValues = []
  for (let filterName in filtersValue) {
    filtersValues.push({
      name: filterName,
      value: filtersValue[filterName]
    })
  }
  const query = {
    filters: filtersValues
  }

  dashboardApi.getChart(props.dashboardName, props.chartName, query)
  .then(res => {
    console.log(res);
    const resData = res['data']
    columns.value = resData['chart']['cols']
    tableData.value = resData['chart']['data']
  })
}

const handleSearch = () => {
  getChart()
}

</script>