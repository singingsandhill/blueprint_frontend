<template>
    <div>
      <div class="container mx-auto flex justify-center items-center space-x-4 flex-wrap">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="flex justify-center items-center rounded-lg overflow-hidden" 
          :style="{ width: containerWidth, height: containerHeight }"
        >
          <a :href="image.url" target="_blank" rel="noopener noreferrer" class="w-full h-full flex justify-center items-center">
            <img 
              :src="image.src" 
              :alt="image.alt" 
              :style="{ width: image.width, height: image.height }"
              class="object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import img1 from "@/assets/datasource/국토교통부.jpg";
  import img2 from "@/assets/datasource/금융감독원.svg";
  import img3 from "@/assets/datasource/한국부동산원.png";
  import img4 from "@/assets/datasource/bizinfo.png";
  import img5 from "@/assets/datasource/gbyouth.jpg";
  
  export default {
    data() {
      return {
        containerWidth: "250px",
        containerHeight: "100px",
        images: [
          { src: img1, alt: "국토교통부", width: "150px", height: "80px", url: "https://www.molit.go.kr" },
          { src: img2, alt: "금융감독원", width: "130px", height: "60px", url: "https://www.fss.or.kr" },
          { src: img3, alt: "한국부동산원", width: "160px", height: "90px", url: "https://www.reb.or.kr/reb/main.do" },
          { src: img4, alt: "기업마당", width: "140px", height: "70px", url: "https://www.bizinfo.go.kr" },
          { src: img5, alt: "청년 e끌림", width: "110px", height: "50px", url: "https://gbyouth.co.kr/main.tc" },
        ],
      };
    },
    mounted() {
      this.updateSizes();
      window.addEventListener("resize", this.updateSizes);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.updateSizes);
    },
    methods: {
      updateSizes() {
        const isMobile = window.innerWidth <= 768; 
        this.containerWidth = isMobile ? "100px" : "250px";
        this.containerHeight = isMobile ? "50px" : "100px"; 
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    flex-wrap: wrap;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  </style>
  