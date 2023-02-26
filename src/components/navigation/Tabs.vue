<template>
  <div class="tabs w-full">
    <div class="tabs-titles py-2 bg-grey-100 border-grey-400 by-1 flex relative text-center" ref="titles">
      <div
          class="title-item cursor-pointer font-medium user-select-none"
          @click="select(index)"
          v-for="(item, index) in tabs"
          :class="{ 'active': index === tabIndex }"
          :key="item.label"
      >{{item.label}}</div>
      <div
          class="scroll-bar border-blue bb-2"
          ref="scrollBar"
          :style="{
              width: `${tabWidth}px`,
              transform: `translate3d(${tabIndex * tabWidth}px, 0, 0)`
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
				transition: touching ? '' : 'transform .3s'
			}"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "vue-slide-tabs",
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tabIndex: 0,
      tabWidth: 0,
      touching: false,
      dx: 0,
      translateX: 0,
      width: 0
    }
  },
  methods: {
    getAngle(dx: number, dy: number) {
      return 360 * Math.atan(dy / dx) / (2 * Math.PI);
    },
    select(index: any) {
      //@ts-ignore
      this.tabIndex = index;
    },
    handleTouchstart(e: { touches: { pageY: any; }[]; }) {
      //@ts-ignore
      this.touching = true;
      //@ts-ignore
      this.dx = 0;
      //@ts-ignore
      this.startX = e.touches[0].pageX;
        //@ts-ignore
      this.startY = e.touches[0].pageY;
        //@ts-ignore
      this.endX = e.touches[0].pageX;
        //@ts-ignore
      this.endY = e.touches[0].pageY;
    },
    handleTouchmove(e: { touches: { pageY: any; }[]; }) {
      //@ts-ignore
      const endX = e.touches[0].pageX;
      const endY = e.touches[0].pageY;
      //@ts-ignore
      const dx = this.dx = endX - this.startX;
      if (this.canSlider()) {
        return;
      }
      //@ts-ignore
      if (Math.abs(dx) > 6 && Math.abs(this.getAngle(dx, endY - this.startY)) < 30) {
        //@ts-ignore
        this.translateX = dx;
      }
    },
    handleTouchend() {
        //@ts-ignore
      this.touching = false;
        //@ts-ignore
      this.translateX = 0;
        //@ts-ignore
      const percent = this.dx / this.width;
      if (this.canSlider()) {
        return;
      }
      if (percent < -0.3) {
          //@ts-ignore
        this.tabIndex++;
      }
      if (percent > 0.3) {
          //@ts-ignore
        this.tabIndex--;
      }
    },
    //@ts-ignore
    canSlider() {
      //@ts-ignore
      return (this.dx < 0 && this.tabIndex >= this.tabs.length - 1) || (this.dx > 0 && this.tabIndex === 0);
    },
    resizeWidth() {
      //@ts-ignore
      this.width = this.$el.clientWidth;
      //@ts-ignore
      this.tabWidth = Math.round(this.width / this.tabs.length);
    }
  },
  watch: {
    tabIndex(newVal: any) {
      //@ts-ignore
      this.$emit('change', newVal);
    }
  },
  mounted() {
    //@ts-ignore
    this.resizeWidth();
    //@ts-ignore
    window.addEventListener('resize', this.resizeWidth);
  }
}
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
       & > div, & > section {
         display: inline-grid;
         width: 100%;
         height: 100%;
         font-size: 14px;
       }
    }
  }
}
</style>
