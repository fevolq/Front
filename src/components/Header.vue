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
        <!-- <el-tooltip
        class="box-item"
        effect="dark" 
        :content="message?`有${message}条未读消息`:`个人主页`" 
        placement="bottom"
        >
        <router-link to="/userHome" style="color: black; text-decoration: none;">
          <img src="../assets/images/avator.jpeg" alt="头像">
          <span>{{ userStore.user.Name }}</span>
        </router-link>
        </el-tooltip> -->
        <!-- <span class="badge"></span> -->

        <el-dropdown class="user-name" trigger="click" @command="handleUserCommand">
          <span class="el-drondown-link">
            {{ userStore.user.Name }}
            <i class="el-icon-caret-bottm"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="toUserHome">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import { useRouter } from 'vue-router'

import vNav from './Nav.vue'
import { useInstanceStore } from '../stores/instance.js'
import { useUserStore } from '../stores/user.js'

const store = useInstanceStore()
const userStore = useUserStore()
const router = useRouter()

const handleUserCommand = (command) => {
  switch (command) {
    case "toUserHome":
      router.push('/userHome')
      break
    case "logout":
      store.clearToken()
      router.push('/login')
      break
  }
}
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

.user {
  cursor: pointer;
}

/* .user img {
  float: left;
  margin-right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
} */

</style>
