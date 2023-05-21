<template>
    <div class="nav">
      <el-menu
       :default-active="onRoutes"
       mode="horizontal"
       collapse-transition
       >
        <template v-for="navRoute in navRoutes" :key="navRoute.index">
          <template v-if="navRoute.children.length > 0">
            <el-sub-menu :index="navRoute.index">
              <template #title>{{ navRoute.title }}</template>
              <el-menu-item class="sub-menu-item" v-for="item in navRoute.children" :key="item.index" :index="item.index">{{ item.title }}</el-menu-item>
            </el-sub-menu>
          </template>

          <template v-else>
            <el-menu-item :index="navRoute.index">{{ navRoute.title }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { navRoutes } from '../constant/nav.js'

const route = useRoute()

const onRoutes = computed(() => route.path)
</script>

<style>
.nav .el-menu {
  display: flex;
  align-items: center;
  justify-content: center;

  /* 去掉下划线 */
  border-bottom: none !important;

  height: 100%;
}

.el-menu > .el-menu-item,
.el-menu > .el-sub-menu > .el-sub-menu__title {
  font-size: 18px;
}

</style>