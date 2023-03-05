<template>
  <swiper
    :parallax="true"
    :keyboard="{
      enabled: true,
    }"
    :grab-cursor="true"
    :speed="700"
    :lazy="true"
    :slides-per-view="1"
    :pagination="{ clickable: true, dynamicBullets: true }"
  >
    <swiper-slide
      v-for="image in images"
      :key="image.src"
    >
      <img
        :src="image.src"
        :alt="image.alt"
      />
    </swiper-slide>
  </swiper>
</template>
<script>
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, A11y, Keyboard, Lazy, Parallax } from 'swiper'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y, Keyboard, Lazy, Parallax])

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<!--<template>-->
<!--  <div class="swiper mySwiper">-->
<!--    <div class="swiper-wrapper">-->
<!--      <div class="swiper-slide" v-for="image in images">-->
<!--        <img :src="image.src" :alt="image.alt">-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="swiper-pagination"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Swiper, {Pagination} from 'swiper';-->

<!--// configure Swiper to use modules-->
<!--Swiper.use([Pagination]);-->

<!--export default {-->
<!--  name: 'SwiperComponent',-->
<!--  props: {-->
<!--    images: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--      default: () => []-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      swiperOption: {-->
<!--        slidesPerView: 1,-->
<!--        spaceBetween: 0,-->
<!--        direction: 'horizontal',-->
<!--        lazy: true,-->
<!--        loop: false,-->
<!--        grabCursor: false,-->
<!--        speed: 700,-->
<!--        keyboard: {-->
<!--          enabled: true,-->
<!--        },-->
<!--        pagination: {-->
<!--          el: '.swiper-pagination',-->
<!--          clickable: true,-->
<!--          dynamicBullets: false,-->
<!--        },-->
<!--        autoplay: {-->
<!--          delay: 2500,-->
<!--          enabled: false,-->
<!--          disableOnInteraction: false-->
<!--        },-->
<!--        paginationClickable: true,-->
<!--        parallax: true,-->
<!--        mousewheelControl: 1,-->
<!--        navigation: {-->
<!--          nextEl: '.swiper-button-next',-->
<!--          prevEl: '.swiper-button-prev'-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.swiper = new Swiper('.mySwiper', this.swiperOption);-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
