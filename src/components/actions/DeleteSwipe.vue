<template>
  <vue-bottom-sheet
    ref="deleteSwipe"
    max-height="25vh"
  >
    <div class="d-grid gap-3 py-2 px-4">
      <h3 class="text-center text-white text-lg">Supprimer la publication ?</h3>
      <p class="text-grey-800 text-md">Si vous supprimer cette publication, elle ne pourra pas être restauré.</p>
      <div class="flex justify-center gap-4 items-center wrap">
        <a
          href="#"
          class="flex-1 text-center"
          @click.prevent="closeSwipe"
        >
          Revenir en arrière
        </a>
        <button
          class="btn flex-1"
          data-variant="red"
          @click="emitConfirm"
        >
          Oui, supprimer
        </button>
      </div>
    </div>
  </vue-bottom-sheet>
</template>

<script lang="ts" setup>
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import { ref, watch } from 'vue'
import { usePostStore } from '@/stores/post.store'
import { Post } from '@/api/post/post'
import { useAppStore } from '@/stores/app.store'

/*STORE*/
const postStore = usePostStore()
const appStore = useAppStore()
/*REFS*/
const deleteSwipe = ref()

/*METHODS*/
const openSwipe = () => {
  deleteSwipe.value.open()
}

const closeSwipe = () => {
  deleteSwipe.value.close()
  reset()
}

const reset = () => {
  postStore.setDeletePostId(undefined)
}

const emitConfirm = async () => {
  try {
    await Post.deletePost(postStore.deletePostId)
    postStore.removePost(postStore.deletePostId)
  } catch (err) {
    console.log(err)
  }

  closeSwipe()
}

/*WATCHERS*/
watch(
  () => appStore.openDeleteSwipe,
  () => {
    if (appStore.openDeleteSwipe) {
      openSwipe()
    } else {
      closeSwipe()
    }
  }
)
</script>
