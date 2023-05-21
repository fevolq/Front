<template>
  <v-header />
  <v-tag />
  <div class="content">
    <RouterView v-slot="{ Component }">
      <transition name="move" mode="out-in">
          <KeepAlive :include="tagsList">
              <component :is="Component" />
          </KeepAlive>
      </transition>
    </RouterView>
  </div>
  <v-footer />
</template>

<script setup>
import vHeader from '../components/Header.vue'
import vFooter from '../components/Footer.vue'
import vTag from '../components/Tag.vue'
</script>
