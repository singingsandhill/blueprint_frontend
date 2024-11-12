<script>
import { ref, computed, onMounted } from "vue";
import { useSubscriptionStore } from "@/stores/subscription.js";

export default {
  setup() {
    const store = useSubscriptionStore();
    const subscriptionList = ref([]);

    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    const filteredSubscriptionList = computed(() => {
      return subscriptionList.value
        .filter(item => {
          const endDate = new Date(item.rceptEndde);
          return endDate >= today && endDate <= oneWeekLater;
        })
        .sort((a, b) => new Date(a.rceptEndde) - new Date(b.rceptEndde));
    });

    const getBorderStyle = (item) => {
      const startDate = new Date(item.rceptBgnde);
      const endDate = new Date(item.rceptEndde);

      if (endDate.toDateString() === today.toDateString()) {
        return 'border border-red-500'; 
      } else if (startDate <= today && endDate >= today) {
        return 'border border-blue-700'; 
      } else {
        return 'border border-gray-300'; 
      }
    };

    const nextSlide = () => {
      document.querySelector(".cards").scrollBy({ left: 300, behavior: "smooth" });
    };
    const prevSlide = () => {
      document.querySelector(".cards").scrollBy({ left: -300, behavior: "smooth" });
    };

    onMounted(async () => {
      await store.getSubscription();
      subscriptionList.value = store.subscription;
    });

    return {
      filteredSubscriptionList,
      formatDate,
      getBorderStyle,
      nextSlide,
      prevSlide,
    };
  },
};
</script>

<template>
  <div class="section mt-20">
    <h2 class="text-2xl font-bold mb-12 text-center">다가오는 청약 정보</h2>
    <div class="flex items-center justify-center space-x-4">

      <button class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="cards flex overflow-x-auto w-full mx-4 space-x-4">
        <div
          v-for="(item, index) in filteredSubscriptionList"
          :key="item.idx"
          :class="['card cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex-shrink-0', getBorderStyle(item)]"
        >
          <h3 class="text-lg font-semibold mb-2 text-center">{{ item.name }}</h3>
          <div v-if="item.houseDtlSecd" class="text-gray-500 text-sm bg-gray-100 rounded-full px-3 py-1 inline-block mt-2 text-center">
            {{ item.houseDtlSecd }}
          </div>
          <div class="text-center text-gray-700 mt-4 space-y-2 text-sm">
            <p>시작일: {{ formatDate(item.rceptBgnde) }}</p>
            <p>종료일: {{ formatDate(item.rceptEndde) }}</p>
            <p v-if="item.region || item.city || item.district">
              <span>{{ item.region }}</span>
              <span v-if="item.city">, {{ item.city }}</span>
              <span v-if="item.district">, {{ item.district }}</span>
            </p>
          </div>
          <div class="text-right mt-4 absolute bottom-4 right-4">
            <a
              :href="item.pblancUrl"
              class="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >상세 정보 페이지</a>
          </div>
        </div>
      </div>

      <button class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div class="flex justify-center mt-6" v-if="filteredSubscriptionList.length > 0">
      <router-link to="/subscription" class="px-4 py-2 rounded-lg hover:bg-blue-200 hover:transition duration-200 font-semibold border">
        더보기
      </router-link>
    </div>

    <p v-else class="text-center mt-4 text-gray-500">현재는 청약 정보가 없습니다.</p>
  </div>
</template>

<style scoped>
.card {
  min-width: 300px;
  max-width: 300px;
  min-height: 300px;
  flex-shrink: 0;
  scroll-snap-align: start;
  transition: transform 0.3s;
  text-align: center;
  position: relative;
}
.card:hover {
  transform: translateY(-5px);
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .card {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
