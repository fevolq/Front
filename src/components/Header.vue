<template>
    <div class="header" :is-collapse="store.headerCollapse">
      <div class="logo flex">
        <router-link to="/" style="color: black; text-decoration: none;">
          <img src="../assets/images/logo.jpg" alt="图标">
          <span>天命</span>
        </router-link>
      </div>

      <v-nav />

      <div class="user flex">
        <el-tooltip
        class="box-item"
        effect="dark" 
        :content="message?`有${message}条未读消息`:`个人主页`" 
        placement="bottom"
        >
        <router-link to="/userHome" style="color: black; text-decoration: none;">
          <img src="../assets/images/avator.jpeg" alt="头像">
          <span>{{ userStore.user.Email }}</span>
        </router-link>
        </el-tooltip>
        <span class="badge"></span>
      </div>

      <div class="collapse-btn flex" @click="store.handleHeaderCollapse">
        <i v-if="!store.headerCollapse">
            <el-icon><ArrowUp /></el-icon>
        </i>
        <i v-else>
            <el-icon><ArrowDown /></el-icon>
        </i>
      </div>
    </div>
</template>

<script setup>
import vNav from './Nav.vue'
import { useInstanceStore } from '../stores/instance.js'
import { useUserStore } from '../stores/user.js'

const store = useInstanceStore()
const userStore = useUserStore()
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 3fr 12fr  3fr 1fr;
}

.header .flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  padding: 10px;
}

.logo img {
  float: left;
  margin-right: 5px;
  width: 30px;
  height: 30px;
}

.logo span,
.user span {
  display: inline-block;
  text-align: center;
  margin: 5px 0;
}

.user img {
  float: left;
  margin-right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

</style>
