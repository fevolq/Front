<template>
  <div class="poem">
    <h1 class="poem-title">
      {{ data.title }}
      <el-icon size="small" @click="getPoem"><Refresh /></el-icon>
    </h1>
    <h3 class="poem-author">
      <!-- span若换行，则会多出一个空格 -->
      {{ data.author }}<span v-if="data.dynasty">[{{ data.dynasty }}]</span>
    </h3>
    <div class="poem-content">
      <p v-for="(item, index) in data.content" :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

import * as poemApi from '../api/poem.js'

const data = reactive({
  id: null,
  title: null,
  author: null,
  dynasty: null,
  content: null,
})

const getPoem = () => {
  poemApi.getPoem(data.id).then((res) => {
    Object.keys(res.data[0]).forEach(key => {
      data[key] = res.data[0][key];
    });
  })
}

getPoem()
onBeforeRouteUpdate(() => {
  getPoem()
})

</script>

<style>
.content {
  background: url('../assets/images/bg01.png') no-repeat;
  /* background: url('../assets/images/bg02.jpg') no-repeat; */
  background-size: cover;
}

.poem {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.poem .poem-title {
  margin: 100px auto;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 30px;
  text-indent: 30px;
  font-size: 24px;
  font-weight: 400;
  position: relative;
}

.poem .poem-author {
  margin: 10px auto;
  text-align: center;
  letter-spacing: 5px;
  text-indent: 5px;
  font-weight: 400;
  font-size: 16px;
}

.poem-author span {
  margin-left: 5px;
}

.poem .poem-content {
  display: grid;
  gap: 10px;
  
  margin-top: 10px;
  text-align: center;
  letter-spacing: 3px;
  text-indent: 3px;
  font-weight: 300;
}

.poem .el-icon {
  position: absolute;
  cursor: pointer;
}
</style>