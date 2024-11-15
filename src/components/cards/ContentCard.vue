<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <!-- Header Section -->
      <div class="flex items-center space-x-2 text-gray-800">
        <i class="fas fa-arrow-left"></i>
        <h1 class="text-lg font-medium">청약</h1>
        <div class="flex-1"></div>
        <i class="fas fa-info-circle"></i>
      </div>
  
      <!-- Tab Navigation -->
      <div class="flex mt-4 border-b">
        <button class="px-4 py-2 font-semibold border-b-2 border-black">
          청약신청
        </button>
        <!-- <button class="px-4 py-2 text-gray-500">청약내역/취소</button> -->
      </div>
  
      <!-- Subscription List -->
      <div v-if="subscriptionList.length > 0" class="space-y-4 mt-4">
        <div
          v-for="item in subscriptionList"
          :key="item.idx"
          class="bg-white rounded-lg shadow-md p-4"
        >
          <h2 class="text-lg font-semibold">{{ item.name }}</h2>
  
          <div class="text-gray-500 text-sm bg-gray-100 rounded-full px-3 py-1 inline-block mt-2 custom_color">
            {{ item.houseDtlSecd }}
          </div>
  
          <div class="mt-4 space-y-2 text-gray-700 text-sm">
            <div class="flex justify-between">
              <span>지역</span>
              <span>{{ item.region || "지역 정보 없음" }}</span>
            </div>
            <div class="flex justify-between">
              <span>도시</span>
              <span>{{ item.city || "도시 정보 없음" }}</span>
            </div>
            <div class="flex justify-between">
              <span>구</span>
              <span>{{ item.district || "구 정보 없음" }}</span>
            </div>
            <div class="flex justify-between">
              <span>상세주소</span>
              <span>{{ item.detail || "상세주소 정보 없음" }}</span>
            </div>
            <div class="flex justify-between">
              <span>분류</span>
              <span>{{ item.rentSecd }}</span>
            </div>
            <div class="flex justify-between">
              <span>청약 시작일</span>
              <span>{{ formatDate(item.rceptBgnde) }}</span>
            </div>
            <div class="flex justify-between">
              <span>청약 종료일</span>
              <span>{{ formatDate(item.rceptEndde) }}</span>
            </div>
            <div class="flex justify-between">
              <span>청약 페이지</span>
              <a
                :href="item.pblancUrl"
                class="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >상세 정보 페이지</a>
            </div>
          </div>
        </div>
      </div>
      
      <p v-else>데이터를 불러오는 중...</p>

      <!-- Pagination -->
    <div class="flex justify-center mt-4 space-x-2">
      <button 
        class="pagination-button"
        @click="prevPage" 
        :disabled="currentPage === 0">
        이전
      </button>
      <button
        v-for="p in totalPages"
        :key="p"
        @click="goToPage(p - 1)"
        :class="{'pagination-button': true, 'active': p - 1 === currentPage}">
        {{ p }}
      </button>
      <button 
        class="pagination-button"
        @click="nextPage" 
        :disabled="currentPage >= totalPages - 1">
        다음
      </button>
    </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from "vue";
  import { useSubscriptionStore } from "@/stores/subscription.js";
  
  const store = useSubscriptionStore();
  const subscriptionList = ref([]);
  const currentPage = ref(0);
  const totalPages = ref(0);
  const pageSize = 10;
  
  const formatDate = (dateString) => {
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  const fetchData = async (page) => {
   await store.getSubscription(page, pageSize);
   subscriptionList.value = store.subscription.content;
   totalPages.value = store.subscription.totalPages;
   currentPage.value = page;
  };
  
  const prevPage = () => {
   if (currentPage.value > 0) {
     fetchData(currentPage.value - 1);
   }
  };
  
  const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchData(currentPage.value + 1);
  }
};
  
  const goToPage = (page) => {
   fetchData(page);
  };
  
  onMounted(() => {
   fetchData(0);
  });
  </script>
  
  <style scoped>
  .pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  color: #1e3a8a;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.pagination-button.active {
  background-color: #1e3a8a;
  color: white;
}

.custom_color{
  color: wheat;
  background-color: #0E429D;
}
  </style>
  