<script>
import { ref, computed, onMounted } from "vue";
import { useSubscriptionStore } from "@/stores/subscription.js";

export default {
  setup() {
    const store = useSubscriptionStore();
    const subscriptionList = ref([]);
    const currentSlideIndex = ref(0);
    const visibleCards = ref(3);

    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    };

    const filteredSubscriptionList = computed(() => {
  console.log("Original Subscription List:", subscriptionList.value);

  // 오늘 날짜 확인
  console.log("Today's Date:", today);

  // 날짜 비교 함수
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 1. 필터링: 일주일 내 종료되는 항목만 선택
  const filteredList = subscriptionList.value.filter((item) => {
    const endDate = new Date(item.rceptEndde);
    return endDate >= today && endDate <= oneWeekLater;
  });

  console.log("Filtered Subscription List:", filteredList);

  // 2. 정렬
  const sortedList = filteredList.sort((a, b) => {
    const endDateA = new Date(a.rceptEndde);
    const endDateB = new Date(b.rceptEndde);
    const startDateA = new Date(a.rceptBgnde);
    const startDateB = new Date(b.rceptBgnde);

    // 현재 날짜 비교
    const isTodayA = isSameDay(endDateA, today);
    const isTodayB = isSameDay(endDateB, today);

    const isOngoingA = today >= startDateA && today <= endDateA; // 진행 중 여부
    const isOngoingB = today >= startDateB && today <= endDateB;

    const isNotStartedA = today < startDateA; // 아직 시작하지 않은 항목
    const isNotStartedB = today < startDateB;

    // 디버깅: 비교 중인 항목 출력
    console.log("Comparing Items:");
    console.log(`A: ${a.name}, Start Date: ${startDateA}, End Date: ${endDateA}, IsToday: ${isTodayA}, IsOngoing: ${isOngoingA}, IsNotStarted: ${isNotStartedA}`);
    console.log(`B: ${b.name}, Start Date: ${startDateB}, End Date: ${endDateB}, IsToday: ${isTodayB}, IsOngoing: ${isOngoingB}, IsNotStarted: ${isNotStartedB}`);

    // 1. 마감일이 오늘인 항목 우선
    if (isTodayA && !isTodayB) return -1;
    if (!isTodayA && isTodayB) return 1;

    // 2. 진행 중인 항목 우선
    if (isOngoingA && !isOngoingB) return -1;
    if (!isOngoingA && isOngoingB) return 1;

    // 3. 시작하지 않은 항목과 이미 마감된 항목은 마지막에 배치
    if (isNotStartedA && !isNotStartedB) return 1;
    if (!isNotStartedA && isNotStartedB) return -1;

    // 4. 시작일 기준 최신순
    if (startDateA > startDateB) return -1;
    if (startDateA < startDateB) return 1;

    // 5. 동일한 시작일의 경우 종료일 기준 정렬 (오름차순)
    return endDateA - endDateB;
  });

  console.log("Sorted Subscription List:", sortedList);

  return sortedList;
});


    const getBorderStyle = (item) => {
      const startDate = new Date(item.rceptBgnde);
      const endDate = new Date(item.rceptEndde);

      if (endDate.toDateString() === today.toDateString()) {
        return "border border-red-500";
      } else if (startDate <= today && endDate >= today) {
        return "border border-[#0E429D]";
      } else {
        return "border border-gray-400";
      }
    };

    const nextSlide = () => {
      const maxIndex = Math.max(0, filteredSubscriptionList.value.length - visibleCards.value);
      if (currentSlideIndex.value < maxIndex) {
        currentSlideIndex.value += 1;
      }
    };

    const prevSlide = () => {
      if (currentSlideIndex.value > 0) {
        currentSlideIndex.value -= 1;
      }
    };

    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 768) {
        visibleCards.value = 1;
      } else if (width < 1024) {
        visibleCards.value = 2; 
      } else if (width < 1440) {
        visibleCards.value = 3;
      } else {
        visibleCards.value = 4;
      }
    };

    onMounted(async () => {
      await store.getSubscription();
      subscriptionList.value = store.subscription;
      updateVisibleCards();
      window.addEventListener("resize", updateVisibleCards);
    });

    return {
      filteredSubscriptionList,
      formatDate,
      getBorderStyle,
      nextSlide,
      prevSlide,
      currentSlideIndex,
      visibleCards,
    };
  },
};
</script>

<template>
  <div class="section mt-20">
    <h2 class="text-2xl font-bold mb-8 text-center">다가오는 청약</h2>
    <div class="flex items-center justify-center relative space-x-4">

      <!-- 왼쪽 버튼 -->
      <button
        class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentSlideIndex === 0"
        @click="prevSlide"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <!-- 카드 컨테이너 -->
      <div class="overflow-hidden w-full">
        <div
          class="grid transition-transform duration-300 gap-4"
          :style="{
            transform: `translateX(-${currentSlideIndex * (100 / visibleCards)}%)`,
            gridTemplateColumns: `repeat(${filteredSubscriptionList.length}, 1fr)`
          }"
        >

          <div
            v-for="(item, index) in filteredSubscriptionList"
            :key="item.idx"
            :class="['card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4', getBorderStyle(item)]"
          >
          <div
              v-if="item.houseDtlSecd"
              class="text-sm bg-gray-100 rounded-full px-3 py-1 inline-block mb-2 text-center"
              style="background-color: #C1D5F9; color: white;"
              >
              {{ item.houseDtlSecd }}
            </div>
            <h3 class="text-lg font-semibold mb-2 text-center">{{ item.name }}</h3>
            
            <div class="text-center text-gray-700 mt-4 space-y-2 text-sm">
              <p v-if="item.region || item.city || item.district">
                <span>{{ item.region }}</span>
                <span v-if="item.city">, {{ item.city }}</span>
                <span v-if="item.district">, {{ item.district }}</span>
              </p>
              <br>
              <p><strong>시작일</strong> {{ formatDate(item.rceptBgnde) }}</p>
              <p><strong>종료일</strong> {{ formatDate(item.rceptEndde) }}</p>
            </div>
            <div class="text-right mt-4 absolute bottom-4 right-4">
              <a
                :href="item.pblancUrl"
                class="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                상세 정보 페이지
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 버튼 -->
      <button
        class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentSlideIndex >= filteredSubscriptionList.length - visibleCards"
        @click="nextSlide"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- 더보기 -->
    <div class="flex justify-end mt-6" v-if="filteredSubscriptionList.length > 0">
      <router-link
        to="/subscription"
        class="px-4 py-2 rounded-lg hover:bg-blue-200 hover:transition duration-200 font-semibold border"
      >
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
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-1px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .section {
    padding: 0 1rem;
  }
  .card {
    width: 100%;
    margin: 0 auto;
  }
}
</style>

