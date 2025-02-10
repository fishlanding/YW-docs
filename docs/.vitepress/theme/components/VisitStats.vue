<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const totalVisits = ref(0)
const monthlyVisits = ref(0)
const weeklyVisits = ref(0)
const dailyVisits = ref(0)

// 只在首页显示
const showStats = computed(() => {
  return frontmatter.value.layout === 'home'
})

onMounted(async () => {
  if (!showStats.value) return

  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  // 这里设置 startOfWeek 时注意不要修改 now 本身，多复制一个副本：
  const startOfWeek = new Date(new Date().setDate(now.getDate() - now.getDay()))
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  try {
    const response = await fetch(`/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDates: [
          startOfDay.toISOString(),
          startOfWeek.toISOString(),
          startOfMonth.toISOString()
        ]
      })
    })

    const data = await response.json()
    
    totalVisits.value = data.total
    monthlyVisits.value = data.monthly
    weeklyVisits.value = data.weekly
    dailyVisits.value = data.daily
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
  }
})
</script>

<template>
  <div v-if="showStats" class="visit-stats">
    <div class="stat-item">
      <div class="stat-value">{{ totalVisits }}</div>
      <div class="stat-label">总访问量</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ monthlyVisits }}</div>
      <div class="stat-label">本月访问</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ weeklyVisits }}</div>
      <div class="stat-label">本周访问</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ dailyVisits }}</div>
      <div class="stat-label">今日访问</div>
    </div>
  </div>
</template>

<style scoped>
.visit-stats {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  margin: 50px auto 10px auto; /* 上外边距50px，将组件向下移动 */
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 10px;    /* 整体字体较小 */
  max-width: 300px;   /* 限制宽度，减小体积 */
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 14px;    /* 数值字体稍大，便于突出显示 */
  font-weight: bold;
  color: var(--vp-c-brand);
}

.stat-label {
  font-size: 8px;     /* 标签字体较小 */
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
</style>