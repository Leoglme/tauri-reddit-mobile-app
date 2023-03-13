<template>
  <div class="flex flex-col justify-center gap-2 cursor-pointer user-select-none select__visibility">
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
      style="background: #000"
      max-height="40vh"
    >
      <div class="d-grid gap-2">
        <h1 class="text-center text-white text-lg mb-2">Type de communauté</h1>
        <div
          v-for="visibility in visibilities"
          :key="visibility.value"
          class="flex items-center gap-3 visibility-item px-3 py-2"
          :class="{ active: visibility.value === activeVisibility.value }"
          @click="setActiveVisibility(visibility)"
        >
          <component
            :is="visibility.icon"
            fill-color="var(--grey-800)"
            :size="28"
          />
          <div class="flex-1 flex flex-col">
            <h2 class="text-md">{{ visibility.value }}</h2>
            <p class="text-sm text-grey-800">
              {{ visibility.description }}
            </p>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import { visibilities } from '@/env'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
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
.visibility-item {
  cursor: pointer;

  &:active {
    background: var(--grey-600);
  }
}
</style>
