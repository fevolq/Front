<template>
    <div class="tags">
      <div class="tag-box">
        <el-tag
         v-for="(tag, index) in store.tags"
         :key="index"
         :type="tag.path === route.fullPath ? '' : 'info'"
         size="large"
         closable
         @close="closeTag(index)"
         @click.native="onClickTag(tag)"
         :class="{ 'active': tag.path === route.fullPath }"
        >
          {{ tag.title }}
        </el-tag>
      </div>

      <div class="tag-option">
        <el-dropdown @command="handleTagBox">
          <el-button type="primary">
            Tag选项<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

import { useInstanceStore } from '../stores/instance.js'

const route = useRoute()
const router = useRouter()
const store = useInstanceStore()

const onClickTag = (tag) => router.push(tag.path)

const closeTag = (index) => {
  const delItem = store.tags[index]
    store.delTag(index)

  const prevTag = store.tags[index] ? store.tags[index] : store.tags[index - 1]
  if (prevTag) {
      // 删除的为当前页
      delItem.path === route.fullPath && router.push(prevTag.path)
      // if (delItem.path === route.fullPath) {
      //     router.push(prevTag.path)
      // }
  } else {
      router.push('/')
  }
}

const addTag = (r) => {
  const isExist = store.tags.some(
    (item) => item.path === r.fullPath
  )
  if (!isExist) {
    store.addTag(store.initTag(r))
  }
}
addTag(route);
// TODO: router.push无法触发RouteUpdate
onBeforeRouteUpdate((to) => {addTag(to)})

const handleTagBox = (command) => {
  const currentIndex = store.tags.findIndex((tag) => tag.path === route.fullPath)
  switch (command) {
    case 'other':
      if (currentIndex > -1) {
          store.leaveTag(currentIndex)
      }
      break
    default:
      store.clearTags()
      router.push('/')
  }
}

</script>

<style scoped>

.tags {
  display: flex;
  align-items: center;
}

.tags .tag-box {
  float: left;
  display: flex;
  width: 100%;
  height: 100%;
}

.tags .tag-option {
  float: right;
}

.tag-box > span.el-tag {
  font-size: 15px;
  margin: auto 3px;
  padding: 3px;

  /* 使鼠标出现点击图案 */
  cursor: pointer;
}

.tag-box > span.el-tag:first-of-type {
  margin-left: 20px;
}

/* .tag-box > span.el-tag > span.el-tag__content > a {
  text-decoration: none;
  color: black;
}

span[class~='active'] > span.el-tag__content > a {
  color: white;
} */


/* ul li {
  list-style-type: none;
  font-size: 16px;
  line-height: 100%;
}

.tag-li {
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  overflow: hidden;
} */
</style>