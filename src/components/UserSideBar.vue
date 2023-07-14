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
import { useRoute } from 'vue-router'

import { userNavRoutes } from '../constant/nav.js'

const route = useRoute()

</script>