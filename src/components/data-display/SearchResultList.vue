<template>
  <ul class="bg-grey-200 w-full">
    <SearchResultItem
      v-for="(item, index) in communities"
      :key="`result-${index}`"
      :item="item"
    />
  </ul>
</template>

<script lang="ts" setup>
import SearchResultItem from './SearchResultItem.vue'
import { ref, watch } from 'vue'
import { Community } from '@/api/community/community'

const communities = ref()
const awaitingSearch = ref(false)

const props = defineProps({
  searchInput: { type: String, default: '' },
})

watch(
  () => props.searchInput,
  () => {
    if (!awaitingSearch.value) {
      setTimeout(() => {
        getResult()
        awaitingSearch.value = false
      }, 800) // 2.5 sec delay
    }
    awaitingSearch.value = true
  }
)

const getResult = () => {
  if (props.searchInput != '') {
    Community.searchCommunity(props.searchInput).then((res) => {
      communities.value = res.data.data.children
    })
  } else {
    communities.value = undefined
  }
}
</script>
