<template>
  <div class="container">
    <!-- 过滤器 -->
    <div class="filters">
      <template v-for="filter in filters" :key="filter.name">
        <template v-if="filter.type=='daterange'">
          <dateRangeFilter :filterName="filter.name"/>
        </template>
        <template v-else-if="filter.type=='input'">
          <inputFilter :filterName="filter.name"/>
        </template>
        <template v-else-if="filter.type=='inputs'">
          <inputsFilter :filterName="filter.name"/>
        </template>
        <template v-else-if="filter.type=='single' || filter.type=='multiple'">
          <selectFilter :filterName="filter.name"/>
        </template>
        <template v-else>
          {{ filter.title }} - {{ filter.type }}
        </template>
      </template>

      <el-button class="search" :icon="Search" @click="handleSearch" circle />
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
import { Search } from '@element-plus/icons-vue'

import dateRangeFilter from '../components/filters/dateRangeFilter.vue'
import inputFilter from '../components/filters/inputFilter.vue'
import inputsFilter from '../components/filters/inputsFilter.vue'
import selectFilter from '../components/filters/selectFilter.vue'
import * as dashboardApi from '../api/dashboard.js'

const props = defineProps({
  dashboardName: String,
  chartName: String,
})

class Filter {
  name;
  title;
  type;
  config = {};

  values = ref();
  sendConfig = {};
  expand = true;

  constructor(config) {
    this.name = config['name']
    this.title = config['title']
    this.type = config['type']
    this.config = config
  }

  getSendConfig = () => {
    return {
      name: this.name,
      values: this.values.value,
      // is_expand: this.expand,
    }
  }
}

// 页面中所有过滤器。name: filter
const filters = reactive({})

const columns = ref([])
const tableData = ref([])

const getFilters = () => {
  dashboardApi.getConfig(props.dashboardName)
  .then(res => {
    res['data']['filters'].forEach(data => {
      let filterName = data['name']
      let filterConfig = {
        name: data['name'],
        title: data['title'],
        type: data['type'],
        options: data['options'],
        sql: data['sql'],
        defaultExclude: data['default_exclude'],
        defaultExpand: data['default_expand'],
        defaultValue: data['default_value'],
        enableExclude: data['enable_exclude'],
        enableExpand: data['enable_expand'],
        required: data['required'],
      }

      const oneFilter = new Filter(filterConfig)
      filters[filterName] = oneFilter
    })
  })
}
provide('filters', {
  filters
})

onBeforeMount(() => {
  getFilters()
  getChart()
})

const getChart = () => {
  const filtersValues = []
  for (let filterName in filters) {
    filtersValues.push(filters[filterName].getSendConfig())
  }
  console.log(filtersValues);
  const query = {
    filters: filtersValues
  }

  dashboardApi.getChart(props.dashboardName, props.chartName, query)
  .then(res => {
    const resData = res['data']
    columns.value = resData['chart']['cols']
    tableData.value = resData['chart']['data']
  })
}

const handleSearch = () => {
  getChart()
}

</script>

<style>

.filters {
  display: flex;
  /* flex-wrap: wrap;
  flex: 300px; */
  align-items: center;
  margin: auto 30px;
  border-bottom: 1px inset rgba(133, 132, 132, 0.197);
  padding-bottom: 10px;
}

.filters .filter {
  margin: 10px 20px;
}

.filters .required > span::after {
  content: ' *';
  color: red;
}

.filter > span {
  text-align: center;
  margin-right: 5px;
}

.filters > .search {
  color: red;
  background-color: white;
}

.table {
  margin: 30px;
}

</style>