<template>
  <div class="tabs w-full">
    <div
      ref="titles"
      class="tabs-titles py-2 bg-grey-100 border-grey-400 by-1 flex relative text-center"
    >
      <div
        v-for="(item, index) in tabs"
        :key="item.label"
        class="title-item cursor-pointer font-medium user-select-none"
        :class="{ active: index === tabIndex }"
        @click="select(index)"
      >
        {{ item.label }}
      </div>
      <div
        ref="scrollBar"
        class="scroll-bar border-blue bb-2"
        :style="{
          width: `${tabWidth}px`,
          transform: `translate3d(${tabIndex * tabWidth}px, 0, 0)`,
        }"
      />
    </div>

    <div
      class="tabs-content"
      @touchstart="handleTouchstart"
      @touchmove="handleTouchmove"
      @touchend="handleTouchend"
    >
      <div
        class="wrapper"
        :style="{
          transform: `translate3d(${translateX - tabIndex * width}px, 0, 0)`,
          transition: touching ? '' : 'transform .3s',
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*PROPS*/
import { onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'

type Tab = {
  label: string
}

const props = defineProps({
  tabs: { type: Array as PropType<Tab[]>, default: () => [] },
})

/*REFS*/
const tabIndex = ref(0)
const tabWidth = ref(0)
const touching = ref(false)
const dx = ref(0)
const titles = ref()
const translateX = ref(0)
const width = ref(0)
const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)

/*METHODS*/
const getAngle = (dx: number, dy: number) => {
  return (360 * Math.atan(dy / dx)) / (2 * Math.PI)
}

/*EMITS*/
const emit = defineEmits(['change'])

const select = (index: number) => {
  tabIndex.value = index
}

const handleTouchstart = (e: TouchEvent) => {
  touching.value = true
  dx.value = 0
  startX.value = e.touches[0].pageX
  startY.value = e.touches[0].pageY
  endX.value = e.touches[0].pageX
  endY.value = e.touches[0].pageY
}

const handleTouchmove = (e: TouchEvent) => {
  const endX = e.touches[0].pageX
  const endY = e.touches[0].pageY
  dx.value = endX - startX.value

  if (canSlider()) {
    return
  }

  if (Math.abs(dx.value) > 6 && Math.abs(getAngle(dx.value, endY - startY.value)) < 30) {
    translateX.value = dx.value
  }
}

const handleTouchend = () => {
  touching.value = false
  translateX.value = 0
  const percent = dx.value / width.value

  if (canSlider()) {
    return
  }
  if (percent < -0.3) {
    tabIndex.value++
  }
  if (percent > 0.3) {
    tabIndex.value--
  }
}

const canSlider = () => {
  return (dx.value < 0 && tabIndex.value >= props.tabs.length - 1) || (dx.value > 0 && tabIndex.value === 0)
}

const resizeWidth = () => {
  width.value = titles.value.clientWidth
  tabWidth.value = Math.round(width.value / props.tabs.length)
}

/*WATCHERS*/
watch(
  () => tabIndex.value,
  (newVal) => {
    emit('change', newVal)
  }
)

/*LIFECYCLE*/
onMounted(() => {
  resizeWidth()
  window.addEventListener('resize', resizeWidth)
})
</script>

<style lang="scss">
$color-theme: var(--white);

.tabs {
  &-titles {
    .scroll-bar {
      position: absolute;
      bottom: 0;
      z-index: 1;
      border-radius: 5px;
      transition: transform 0.3s;
    }

    .title-item {
      flex: 1;
      color: var(--grey-700);

      &.active {
        color: $color-theme;
      }
    }
  }

  &-content {
    height: calc(100% - 44px);
    overflow: hidden;

    .wrapper {
      white-space: nowrap;
      font-size: 0;

      & > div,
      & > section {
        display: inline-grid;
        width: 100%;
        height: 100%;
        font-size: 14px;
      }
    }
  }
}
</style>
