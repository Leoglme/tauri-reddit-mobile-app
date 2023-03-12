<template>
  <div
    v-if="!userSelectionOption"
    class="poll__container d-grid gap-3 b-1 border-grey-600 font-medium text-grey-700 mt-2"
  >
    <div class="poll__header py-2 pl-3 bb-1 border-grey-600">
      <span class="text-sm">{{ poll.total_vote_count }} vote<span v-if="poll.total_vote_count > 1">s</span></span>
    </div>

    <div class="poll_content d-grid gap-4 px-3 py-2">
      <div
        v-if="poll.options && poll.options.length"
        class="poll__options d-grid pl-3 gap-3"
      >
        <div
          v-for="option in poll.options"
          :key="option.id"
          class="poll__option flex items-center"
        >
          <input
            :id="option.id"
            v-model="selectedOptionId"
            type="radio"
            :value="option.id"
          />
          <label :for="option.id">{{ option.text }}</label>
        </div>
      </div>
      <div>
        <button
          v-if="poll.voting_end_timestamp - Date.now() > 0"
          class="btn w-full"
          data-variant="primary"
          @click="submitVote"
        >
          Voter
        </button>
        <p
          v-if="poll.voting_end_timestamp"
          class="text-sm mt-2"
        >
          <span v-if="poll.voting_end_timestamp - Date.now() <= 0">Le temp est écoulé</span>
          <span v-else>Temps restant : {{ timestampToRemainingTime(poll.voting_end_timestamp) }}</span>
        </p>
      </div>
    </div>
  </div>
  <div
    v-else
    class="poll__container d-grid gap-3 b-1 border-grey-600 font-medium text-grey-700 mt-2"
  >
    <div class="poll__header py-2 pl-3 bb-1 border-grey-600">
      <span class="text-sm">{{ poll.total_vote_count }} vote<span v-if="poll.total_vote_count > 1">s</span></span>
    </div>

    <div class="poll_content d-grid gap-4 px-3 py-2">
      <div
        v-if="poll.options && poll.options.length"
        class="poll__results d-grid gap-3"
      >
        <ul
          v-for="option in poll.options"
          :key="option.id"
          class="poll__result text-white flex items-center pl-6 py-1"
          :class="{ active: option.id === userSelectionOption.id }"
        >
          <li class="flex items-center">
            <span class="mr-3">{{ option.vote_count }}</span
            >{{ option.text
            }}<CheckCircle
              v-if="option.id === userSelectionOption.id"
              :size="18"
              class="ml-2"
            />
          </li>
        </ul>
      </div>
      <p
        v-if="poll.voting_end_timestamp"
        class="text-sm"
      >
        <span v-if="poll.voting_end_timestamp - Date.now() <= 0">Le temp est écoulé</span>
        <span v-else>Temps restant : {{ timestampToRemainingTime(poll.voting_end_timestamp) }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import type { PollData } from '@/api/post/post.model'
import { timestampToRemainingTime } from '@/utils/dateUtils'
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'

/*PROPS*/
const props = defineProps({
  poll: {
    type: Object as PropType<PollData>,
    required: true,
  },
})

/*REF*/
const selectedOptionId = ref('')

/*COMPUTED*/
const userSelectionOption = computed(() => {
  return props.poll.options.find((option) => option.id === props.poll.user_selection)
})

/*METHODS*/
const submitVote = () => {
  if (selectedOptionId.value) {
    console.log(`Submitting vote for option ${selectedOptionId.value}.`)
  }
}
</script>

<style lang="scss" scoped>
.poll__container {
  border-radius: 8px;
}

.poll__result {
  &.active {
    background: var(--blue-dark);
    font-weight: 600;
    border-radius: 4px;
  }
}
</style>
