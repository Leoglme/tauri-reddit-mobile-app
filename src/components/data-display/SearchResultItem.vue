<template>
  <li>
    <RouterLink
      class="search__result--item cursor-pointer flex gap-3 px-2 py-1"
      :to="`/${props.item.data.display_name_prefixed}`"
    >
      <Avatar
        class="relative top-3"
        :image="removeAmpUrl(props.item.data.community_icon)"
        :size="20"
      />
      <div class="d-grid gap-1">
        <h5 class="text-md font-medium">{{ props.item.data.display_name_prefixed }}</h5>
        <p class="text-sm">
          Communauté<span v-if="props.item.data.subscribers"> • {{ props.item.data.subscribers }} membres</span>
        </p>
      </div>
    </RouterLink>
  </li>
</template>

<script lang="ts" setup>
import Avatar from '../../components/data-display/Avatar.vue'
import { PropType } from 'vue'
import { removeAmpUrl } from '@/utils/urlUtils'

type Item = {
  data: {
    primary_color: string
    community_icon: string
    display_name_prefixed: string
    title: string
    subscribers: number
  }
}

/*PROPS*/
const props = defineProps({
  item: { type: Object as PropType<Item>, required: true },
})
</script>

<style scoped>
.search__result--item:hover {
  background: var(--grey-200);
}
</style>
