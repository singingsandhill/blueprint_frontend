<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <!-- Header Section -->
      <div class="flex items-center space-x-2 text-gray-800">
        <i class="fas fa-arrow-left"></i>
        <h1 class="text-lg font-medium">다가오는 청약</h1>
        <div class="flex-1"></div>
        <i class="fas fa-info-circle"></i>
      </div>
  
      <!-- Tab Navigation -->
      <div class="flex mt-4 border-b">
        <button class="px-4 py-2 font-semibold text-black border-b-2 border-black">
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
  
          <div class="text-gray-500 text-sm bg-gray-100 rounded-full px-3 py-1 inline-block mt-2">
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
              >신청 페이지</a>
            </div>
          </div>
        </div>
      </div>
  
      <p v-else>데이터를 불러오는 중...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useSubscriptionStore } from "@/stores/subscription.js";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const store = useSubscriptionStore();
      const subscriptionList = ref([]);
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
      };
  
      onMounted(async () => {
        await store.getSubscription();
        subscriptionList.value = store.subscription; // Pinia 스토어에서 데이터 불러오기
      });
  
      return {
        subscriptionList,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
  </style>
  