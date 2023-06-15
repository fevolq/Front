<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-user-manage"
    router
  >
    <el-menu-item v-for="nav in financeNavRoutes" :key="nav.index" :index="nav.index">
      <template #title>{{ nav.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { financeNavRoutes } from '../constant/nav.js'

const route = useRoute()

</script>

<style scoped>
.content .el-menu-item {
  text-align: center;
  font-size: 16px;
}

.content .el-menu-item[class~="is-active"] {
  background-color: #3a6a9b35;
}
</style>