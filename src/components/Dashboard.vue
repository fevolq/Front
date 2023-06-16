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

      <el-button class="search" :icon="doSearching ? Loading : Search" @click="handleSearch" circle :disabled="doSearching"/>
    </div>

    <!-- 数据 -->
    <div class="data">
      <div class="table">
        <vTable :columns="columns" :data="tableData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, provide } from 'vue'
import { Search, Loading } from '@element-plus/icons-vue'

import dateRangeFilter from './filters/dateRangeFilter.vue'
import inputFilter from './filters/inputFilter.vue'
import inputsFilter from './filters/inputsFilter.vue'
import selectFilter from './filters/selectFilter.vue'

import vTable from './data/table.vue'

import * as dashboardApi from '../api/dashboard.js'

const doSearching = ref(false)

const props = defineProps({
  dashboardName: String,
  chartName: String,
})

class Filter {
  name;
  title;
  type;
  config = {
    name: null,
    title: null,
    type: null,
    options: null,
    sql: null,
    defaultExclude: null,
    defaultExpand: null,
    defaultValue: null,
    enableExclude: null,
    enableExpand: null,
    required: null,
  };

  values = ref();
  sendConfig = {};
  expand = false;

  constructor(config) {
    this.name = config['name']
    this.title = config['title']
    this.type = config['type']
    this.setConfig(config)
  }

  setConfig = (data) => {
    this.config.name = data['name']
    this.config.title =  data['title']
    this.config.type = data['type']
    this.config.options = data['options']
    this.config.sql = data['sql']
    this.config.defaultExclude = data['default_exclude']
    this.config.defaultExpand = data['default_expand']
    this.config.defaultValue = data['default_value']
    this.config.enableExclude = data['enable_exclude']
    this.config.enableExpand = data['enable_expand']
    this.config.required = data['required']
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
      const oneFilter = new Filter(data)
      filters[oneFilter.name] = oneFilter
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
  doSearching.value = true
  
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
    doSearching.value = false

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

.data {
  margin: 30px;
}

</style>