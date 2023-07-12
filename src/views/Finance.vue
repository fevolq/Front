<template>
  <div class="side-bar">
    <FinanceSideBar></FinanceSideBar>
  </div>
  <div class="compent">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<script setup>
import FinanceSideBar from '../components/FinanceSideBar.vue'
</script>