<template>
  <div
    v-show="videoRendered"
    class="plyr__video-embed fit-content mt-2"
  >
    <video
      ref="videoPlayer"
      :width="video.width"
      :height="video.height"
      autoplay
      muted
      loop
      controls
      crossorigin
      playsinline
    >
      <source
        :src="videoSrc"
        type="video/mp4"
      />
      <audio
        v-if="audioSrc"
        ref="audioPlayer"
        controls
      >
        <source
          :src="audioSrc"
          type="audio/mp4"
        />
      </audio>
    </video>
  </div>
  <div
    v-show="!videoRendered"
    class="video__loader w-full flex items-center justify-center"
  >
    <Loader />
  </div>
</template>

<script lang="ts" setup>
import Plyr from 'plyr'
import Loader from '@/components/ui/Loader.vue'
import { computed, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import type { VideoModel } from '@/api/post/post.model'

/*PROPS*/
const props = defineProps({
  video: { type: Object as PropType<VideoModel>, required: true },
})

/*REFS*/
const videoSrc = ref(props.video?.fallback_url)
const videoPlayer = ref()
const audioPlayer = ref()
const videoRendered = ref(false)

/*Computed*/
const audioSrc = computed(() => {
  if (!videoSrc.value || props.video?.is_gif) return null
  return videoSrc.value.replace(/\/DASH_[0-9]+\.mp4/g, '/DASH_audio.mp4')
})

/*LIFECYCLE*/
onMounted(() => {
  const player = new Plyr(videoPlayer.value, {
    controls: ['play-large', 'play', 'progress', 'mute', 'volume', 'fullscreen'],
  })

  setTimeout(() => {
    videoRendered.value = true
  }, 500)

  player.muted = true

  if (audioPlayer.value) {
    videoPlayer.value.addEventListener('volumechange', () => {
      audioPlayer.value.volume = videoPlayer.value.volume
      audioPlayer.value.muted = videoPlayer.value.muted
    })

    videoPlayer.value.addEventListener('play', () => {
      audioPlayer.value?.play()
    })

    videoPlayer.value.addEventListener('pause', () => {
      audioPlayer.value?.pause()
    })

    videoPlayer.value.addEventListener('seeked', () => {
      audioPlayer.value.currentTime = videoPlayer.value.currentTime
    })
  }
})
</script>

<style scoped>
.video__loader {
  aspect-ratio: 16 / 9;
  background: var(--grey-300);
}
</style>
