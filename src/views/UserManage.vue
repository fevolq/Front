<template>
  <div id="side-compent">
    <div class="side-bar">
      <UserSideBar></UserSideBar>
    </div>
    <div class="compent">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import UserSideBar from '../components/UserSideBar.vue'
</script>