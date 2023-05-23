<template>
    <div class="footer">
      <div class="scroll-container">
        <p class="scroll-text">{{ data.content }}</p>
      </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

import * as poemApi from '../api/poem.js'

const data = reactive({
  id: null,
  content: null,
})

async function getWitticism() {
  return poemApi.getWitticism(data.id).then((res) => {
    Object.keys(res.data[0]).forEach(key => {
      data[key] = res.data[0][key]
    })
  })
}

// 获取文本尺寸
function getFonrSize(el) {
  const computedStyle = window.getComputedStyle(el)
  const fontSize = computedStyle.getPropertyValue('font-size')
  const size = parseInt(fontSize.replace('px', ''))
  return isNaN(size) ? 1 : size
}

async function scroll(containerEl, scrollEl, speed=5) {
  await getWitticism()
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
  // containerEl.addEventListener('mouseenter', () => animation.pause())
  // containerEl.addEventListener('mouseleave', () => animation.play())

  animation.onfinish = () => {
    // containerEl.removeEventListener('mouseenter', () => animation.pause())
    // containerEl.removeEventListener('mouseleave', () => animation.play())
    scroll(containerEl, scrollEl, speed)
    animation.finish()
  }
}

onMounted(() => {
  const containerEl = document.querySelector('.scroll-container')
  const textEl = document.querySelector('.scroll-text')
  // scroll(containerEl, textEl, 5)
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