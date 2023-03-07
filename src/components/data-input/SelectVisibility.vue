<template>
  <!--  https://github.com/vaban-ru/vue-bottom-sheet -->
  <div class="flex flex-col justify-center gap-2 cursor-pointer user-select-none select__visibility">
    <span class="text-sm font-medium text-grey-800">Type de communauté</span>
    <div class="flex flex-col justify-center gap-1">
      <span
        class="flex items-center font-semibold text-grey-800 select__visibility--label"
        @click="open"
        >{{ activeVisibility.value }}
        <MenuDownIcon
          fill-color="var(--grey-700)"
          :size="26"
      /></span>
      <span class="text-sm font-medium text-grey-700">{{ activeVisibility.description }}</span>
    </div>

    <vue-bottom-sheet
      ref="myBottomSheet"
      style="height: 100%"
    >
      <h1 class="text-center text-white">Type de communauté</h1>
      <div
        v-for="visibility in visibilities"
        :key="visibility.value"
        class="flex items-center gap-3 visibility-item"
        :class="{ active: visibility.value === activeVisibility.value }"
        @click="setActiveVisibility(visibility)"
      >
        <component
          :is="visibility.icon"
          :size="28"
        />
        <div class="flex-1 flex flex-col">
          <h2 class="text-md">{{ visibility.value }}</h2>
          <p class="text-sm">
            {{ visibility.description }}
          </p>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import { visibilities } from '@/env'

type Visibility = {
  icon: {
    name: string
    emits: string[]
    props: {
      title: { type: StringConstructor }
      fillColor: { type: StringConstructor; default: string }
      size: { type: NumberConstructor; default: number }
    }
  }
  value: string
  description: string
}

import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'

const myBottomSheet = ref()

const open = () => {
  myBottomSheet.value.open()
}

const close = () => {
  myBottomSheet.value.close()
}

/*REFS*/
const activeVisibility = ref<Visibility>(visibilities[0])

const setActiveVisibility = (visibility: Visibility) => {
  activeVisibility.value = visibility
  close()
}
</script>

<style lang="scss">
.select__visibility {
  &:hover {
    .select__visibility--label {
      color: var(--white);
    }
  }

  &:active {
    .select__visibility--label {
      color: var(--grey-800);
    }
  }
}

.visibility-item.active {
  background: #000;
}
</style>
