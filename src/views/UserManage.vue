<template>
  <UserSideBar></UserSideBar>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<script setup>
import UserSideBar from '../components/UserSideBar.vue'
</script>

<style >
.content {
  display: grid;
  grid-template-columns: 1fr 7fr;
}
</style>