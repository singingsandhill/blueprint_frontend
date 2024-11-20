<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import richableImage from "@/assets/richable-home-bg.png";

const router = useRouter();

const banners = ref([
  {
    subtitle: "AI로 더 빠르고 똑똑하게 정책 확인",
    title: "[나만의 서비스] 지금 바로 맞춤형 정책을 확인하세요!",
    link: "/frontend/member/myService",
    backgroundColor: "bg-yellow-500",
  },
  {
    subtitle:
      "어려운 정책, 이제는 쉽고 간편하게! 새로운 정책의 기회를 놓치지 마세요",
    title: "[BluePrint] AI 맞춤형 정책 추천 플랫폼",
    link: "#",
    backgroundColor: "bg-blue-500",
  },
  {
    subtitle: "자산 관리 서비스",
    title: "Richable",
    link: "https://www.richable.site/",
    backgroundImage: {
      src: richableImage,
      alt: "Richable Background",
    },
  },
]);

const modules = [Autoplay, Pagination];
</script>

<template>
  <swiper
    :modules="modules"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :pagination="{ clickable: true }"
    :loop="true"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(banner, index) in banners"
      :key="index"
      :class="[
        'slide-content',
        banner.backgroundColor,
        'text-white',
        'p-4',
        'rounded-lg',
      ]"
    >
      <img
        v-if="banner.backgroundImage"
        :src="banner.backgroundImage.src"
        :alt="banner.backgroundImage.alt"
        class="absolute inset-0 w-full h-full object-fill -z-10"
      />

      <div class="text" :class="{ 'text-red-500': banner.backgroundImage }">
        <em class="block text-lg mb-2">{{ banner.subtitle }}</em>
        <strong class="block text-2xl font-bold mb-4">{{
          banner.title
        }}</strong>
        <a
          :href="banner.link"
          target="_blank"
          class="text-lg ['underline', banner.backgroundImage ? 'text-red-500' : 'text-white']"
          >자세히보기 &gt;</a
        >
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.mySwiper {
  width: 100%;
  max-width: 100%;
  height: 400px;
  margin: 0;
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
}
.text {
  max-width: 900px;
}
.swiper-button-next,
.swiper-button-prev {
  display: none;
}
</style>
