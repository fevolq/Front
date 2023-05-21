import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useInstanceStore = defineStore('instance', () => {
  const tokenUpdate = ref(false)
  const token = ref(localStorage.getItem('token'))
  const headerCollapse = ref(false)
  const tags = ref([])

  watch(tokenUpdate, () => { token.value = localStorage.getItem('token')})
  
  function saveToken(value) {
    tokenUpdate.value = !tokenUpdate.value
      if (value) {
          localStorage.setItem('token', value)
      }
  }

  function clearToken() {
      localStorage.removeItem('token')
  }

  function handleHeaderCollapse() {
    headerCollapse.value = !headerCollapse.value
  }

  function initTag(route) {
    return {
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
    }
  }

  // 增加一个tag
  function addTag(tag) {
    if (tag.path === '/403') {
        return
    }
    if (tags.value.length === 10) {
      delTag(0)
    }
    tags.value.push(tag)
  }

  // 删除指定索引的tag（默认最后一个）
  function delTag(index=tags.value.length-1) {
    tags.value.splice(index, 1)
  }

  // 只留指定索引的tag
  function leaveTag(index) {
    tags.value = [tags.value[index]]
  }

  // 清空tag
  function clearTags() {
    tags.value = []
  }

  return { 
      token, headerCollapse, tags,
      saveToken, clearToken, handleHeaderCollapse,
      initTag, addTag, delTag, leaveTag, clearTags,
  }
})