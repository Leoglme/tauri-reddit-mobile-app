<template>
  <div class="flex items-center bb-1 border-grey-500 py-2">
    <ArrowLeftIcon
      class="clickable-icon"
      fill-color="var(--grey-800)"
      size="32px"
    />
    <h1 class="w-full text-lg text-center">Créer une communauté</h1>
  </div>

  <Form
    v-slot="{ meta }"
    class="w-full p-3"
    @submit="createCommunity"
  >
    <TextInput
      id="communityName"
      prefix="r/"
      label="Nom de la communauté"
      rules="required|max:20"
      show-reset
    />
    <TextInput
      id="communityDescription"
      label="Desciption"
      rules="required"
      show-reset
    />
    <SelectVisibility />

    <div class="flex justify-between mb-3 mt-2">
      <h3 class="text-grey-800">Communauté pour adulte</h3>
      <Switch v-model:checked="checked" />
    </div>

    <button
      v-if="!meta.valid"
      class="btn w-full"
      disabled
    >
      Continuer
    </button>
    <button
      v-if="meta.valid"
      class="btn w-full"
      data-variant="primary"
      type="submit"
    >
      Continuer
    </button>
  </Form>
</template>

<script lang="ts" setup>
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
import { Form } from 'vee-validate'
import TextInput from '@/components/data-input/TextInput.vue'
import SelectVisibility from '@/components/data-input/SelectVisibility.vue'
import Switch from '@/components/data-input/Switch.vue'
import { ref } from 'vue'
import { Community } from '@/api/community/community'
import { CommunityCommand } from '@/api/community/community.model'
import { useRouter } from 'vue-router'

const router = useRouter()
const checked = ref(false)

const Info: CommunityCommand = {
  communityDescription: 'descriptionC',
  communityName: 'nameC',
  type: 'public',
  over18: false,
  restrictCommenting: false,
  restrictPosting: false,
}

const createCommunity = (command: { communityName: string; communityDescription: string }) => {
  const body = { ...Info, ...command }
  Community.createCommunity(body)
    .then(() => {
      router.push('/r/' + body.communityName)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
