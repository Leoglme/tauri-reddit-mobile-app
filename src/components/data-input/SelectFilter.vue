<template>
  <div class="flex flex-col">
    <div class="relative">
      <button
        class="text-grey-800 flex items-center justify-center gap-2 bg-grey-400 font-semibold px-2 py-1 radius"
        @click="handleClick"
      >
        <component :is="currentFilterIcon" />
        {{ currentFilter }}
        <ChevronDownIcon
          :class="open ? 'rotate-up' : 'rotate-reset'"
          :size="22"
        />
      </button>
    </div>
    <div
      v-if="open"
      class="absolute menu"
    >
      <ul>
        <li
          :class="{ active: currentFilter === 'meilleurs' }"
          @click="setCurrentFilter('meilleurs')"
        >
          <component :is="RocketIcon" />
          Meilleurs
        </li>
        <li
          :class="{ active: currentFilter === 'populaires' }"
          @click="setCurrentFilter('populaires')"
        >
          <component :is="FireIcon" />
          Populaires
        </li>
        <li
          :class="{ active: currentFilter === 'nouvelles' }"
          @click="setCurrentFilter('nouvelles')"
        >
          <component :is="StarIcon" />
          Nouvelles
        </li>
        <li
          :class="{ active: currentFilter === 'top' }"
          @click="setCurrentFilter('top')"
        >
          <component :is="TopIcon" />
          Au Top
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import { ref } from 'vue'
import RocketIcon from 'vue-material-design-icons/Rocket.vue'
import FireIcon from 'vue-material-design-icons/Fire.vue'
import StarIcon from 'vue-material-design-icons/OctagramOutline.vue'
import TopIcon from 'vue-material-design-icons/ChartLineVariant.vue'
import { useAppStore } from '@/stores/app.store'

const currentFilter = ref('meilleurs')
const currentFilterIcon = ref(RocketIcon)

const appStore = useAppStore()

appStore.setCurrentFilter('')

const setCurrentFilter = (newFilter: string) => {
  currentFilter.value = newFilter
  switch (newFilter) {
    case 'meilleurs':
      appStore.setCurrentFilter('')
      currentFilterIcon.value = RocketIcon
      break
    case 'populaires':
      appStore.setCurrentFilter('hot')
      currentFilterIcon.value = FireIcon
      break
    case 'nouvelles':
      appStore.setCurrentFilter('new')
      currentFilterIcon.value = StarIcon
      break
    case 'top':
      appStore.setCurrentFilter('top')
      currentFilterIcon.value = TopIcon
      break
  }
  open.value = false
}
/*Refs*/
const open = ref(false)

/*Methods*/
const handleClick = () => {
  open.value = !open.value
}
</script>

<style lang="scss" scoped>
.menu {
  top: var(--navbar-height);
  background: var(--grey-100);
  left: 0;
  width: 100%;
  max-width: 500px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--grey-500);

  li {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    border-radius: 8px;
    padding: 8px;
  }

  li:hover {
    background: var(--grey-200);
    cursor: pointer;
  }

  li.active {
    background: var(--grey-500);
  }
}
</style>
