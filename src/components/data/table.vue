<template>
  <el-table :data="data" border style="width: 100%" ref="multipleTable" header-cell-class-name="table-header">
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
</template>

<script setup>

const props = defineProps({
  columns: Array,
  data: Array
})
</script>