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

<style>
.content {
  width: 100%;
}

#side-compent {
  height: 100%;
  /* display: grid;
  grid-template-columns: 1fr 7fr; */

  display: flex;
}

.side-bar {
  flex: 0 0 12.5%;
  min-width: 100px;
  max-width: 150px;
}

.compent {
  flex: 1;
  padding: 30px;
}

.side-bar .el-menu {
  height: 100%;
}

.side-bar .el-menu-item {
  text-align: center;
  font-size: 16px;

  display: flex;
  justify-content: center;
}

.side-bar .el-menu-item[class~="is-active"] {
  background-color: #3a6a9b35;
}
</style>
