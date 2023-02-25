<template>
  <li class="search__result--item cursor-pointer flex gap-3 px-2 py-1">
    <Avatar class="relative top-3" image="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png" :size="20"/>
    <div class="d-grid gap-1">
      <h5 class="text-md font-medium">{{props.item.title}}</h5>
      <p class="text-sm">{{props.item.type}} • {{props.item.members}} membres</p>
    </div>
  </li>
</template>

<script lang="ts" setup>
import Avatar from "../../components/data-display/Avatar.vue"
import { PropType } from "vue";

type Item = {
  title: string,
  type: string,
  members: string
}

/*PROPS*/
const props = defineProps({
  item: {type: Object as PropType<Item>, required: true}
})
</script>

<style scoped>
.search__result--item:hover {
  background: var(--grey-200);
}
</style>
