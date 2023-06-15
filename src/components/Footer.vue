<template>
    <div class="footer">
      <div class="scroll-container">
        <p class="scroll-text">{{ data }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import * as poemApi from '../api/poem.js'

const data = ref(null)

const records = []
const toShow = []
const size = 10

// 获取新的数据
async function getNewWitticism() {
  const ids = []
  records.forEach(item => ids.push(item.id))
  toShow.forEach(item => ids.push(item.id))
  return poemApi.getWitticism(ids.join(), size).then((res) => {
    if (res.data.length === 0) {
      // 当没有新数据时，清空记录
      records.splice(0, records.length)
    }
    res.data.forEach(item => toShow.push(item))
  })
}

// 加载新的数据
async function loadNewData() {
  if (toShow.length == 0) {
    await getNewWitticism()
  } else if (toShow.length < 3) {
    getNewWitticism()
  }

  const newData = toShow.shift()
  data.value = newData.content
  records.push(newData)
}

// 获取文本尺寸
function getFonrSize(el) {
  const computedStyle = window.getComputedStyle(el)
  const fontSize = computedStyle.getPropertyValue('font-size')
  const size = parseInt(fontSize.replace('px', ''))
  return isNaN(size) ? 1 : size
}

async function scroll(containerEl, scrollEl, speed=5) {
  await loadNewData()
  // 计算文本的宽度
  const textWidth = scrollEl.textContent.length * getFonrSize(scrollEl)
  
  // 设置动画的持续时间
  const animationDuration = textWidth / speed
  // console.log(scrollEl.textContent.length, getFonrSize(scrollEl), animationDuration);
  
  const animation = scrollEl.animate(
    [
      { transform: `translateX(100%)`},
      { transform: `translateX(-${textWidth + 50}px)`},
    ],
    {
      duration: animationDuration > 0 ? parseInt(animationDuration) * 500 : "auto",
      iterations: 1,
      easing: 'linear',
    }
  )
  animation.play()

  // 鼠标事件
  containerEl.addEventListener('mouseenter', () => animation.pause())
  containerEl.addEventListener('mouseleave', () => animation.play())

  animation.onfinish = () => {
    // containerEl.removeEventListener('mouseenter', () => animation.pause())
    // containerEl.removeEventListener('mouseleave', () => animation.play())
    animation.cancel()
    scroll(containerEl, scrollEl, speed)
  }
}

onMounted(() => {
  const containerEl = document.querySelector('.scroll-container')
  const textEl = document.querySelector('.scroll-text')
  scroll(containerEl, textEl, 3)
})

</script>

<style>
.footer {
  display: flex;
  align-items: center;
}

.scroll-container {
  width: 100%;
  overflow: hidden;
}

</style>