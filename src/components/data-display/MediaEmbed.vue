<template>
  <div class="media__embed--container">
    <iframe
      v-if="iframeSrc"
      ref="embed"
      class="media__embed--iframe"
      :src="iframeSrc"
      width="100%"
      height="512"
      scrolling="no"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen="true"
    />
  </div>
</template>

<script lang="ts" setup>
/*PROPS*/
import { ref } from 'vue'

const props = defineProps({
  iframeContent: {
    type: String,
    required: true,
  },
})

const iframeSrc = ref()

/*Get url in iframe content */
const srcRegex = /iframe.*?src="(.*?)"/
const match = props.iframeContent.match(srcRegex)
const embed = ref()
if (match) {
  iframeSrc.value = match[1]
  /* format for work with twitch iframe */
  if (iframeSrc.value.includes('twitch')) {
    const channelNameRegex = /(?<=channel%3D)(?:(?!channel%3D|%)[\s\S])*?(?=%)/
    const result = iframeSrc.value.match(channelNameRegex)
    if (result) {
      iframeSrc.value = `https://player.twitch.tv/?channel=${result[0]}&muted=true&autoplay=false&parent=localhost`
    }
  }
}
</script>

<style lang="scss" scoped>
.media__embed--container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.media__embed--iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
