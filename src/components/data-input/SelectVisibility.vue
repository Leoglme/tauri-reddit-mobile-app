<template>
<!--  https://github.com/vaban-ru/vue-bottom-sheet-->
  <div class="flex flex-col justify-center gap-2 cursor-pointer user-select-none select__visibility">
    <span class="text-sm font-medium text-grey-800">Type de communauté</span>
    <div class="flex flex-col justify-center gap-1">
      <span class="flex items-center font-semibold text-grey-800 select__visibility--label">{{ activeVisibility.label }} <MenuDownIcon fill-color="var(--grey-700)" :size="26"/></span>
      <span class="text-sm font-medium text-grey-700">{{ activeVisibility.description }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue';
import { visibilities } from "@/env";

/*PROPS*/
const props = defineProps({
  visibility: {type: String, default: visibilities[0].value}
})

/*REFS*/
const activeVisibility = ref(visibilities.find(v => v.value === props.visibility) || visibilities[0])
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

</style>
