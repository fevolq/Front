<template>
  Home
  <button @click="onClick">点击</button>
</template>

<script setup>
import userApi from '../api/user.js'

const onClick = () => {
  console.log(import.meta.env);
    userApi.register()
}
</script>
