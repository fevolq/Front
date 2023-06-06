<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-user-manage"
    router
  >
    <el-menu-item v-for="nav in userNavRoutes" :key="nav.index" :index="nav.index">
      <!-- <el-icon><icon-menu /></el-icon> -->
      <template #title>{{ nav.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

import { userNavRoutes } from '../constant/nav.js'

const route = useRoute()
const router = useRouter()

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