<template>
  <div id="side-compent">
    <div class="side-bar">
      <FinanceSideBar></FinanceSideBar>
    </div>
    <div class="compent">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import FinanceSideBar from '../components/FinanceSideBar.vue'
</script>