<template>
  <FinanceSideBar></FinanceSideBar>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<script setup>
import FinanceSideBar from '../components/FinanceSideBar.vue'
</script>

<style >
.content {
  display: grid;
  grid-template-columns: 1fr 7fr;
}
</style>