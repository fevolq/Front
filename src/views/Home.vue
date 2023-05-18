<template>
  Home
  <button @click="onClick">点击</button>
</template>

<script setup>
import { useInstanceStore } from '../stores/instance.js'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()
const store = useInstanceStore()
const onClick = () => {
  console.log('token: ', store.token);
  console.log(userStore.user);
}
</script>
