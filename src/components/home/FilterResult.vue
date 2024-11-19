<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  filteredPolicies: Array,  
});

const currentPage = ref(1);
const pageSize = 5; 

// 페이지네이션을 위한 필터된 데이터
const paginatedPolicies = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return props.filteredPolicies.slice(start, end);
});

// 전체 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(props.filteredPolicies.length / pageSize);
});

// 페이지 변경 함수
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <section class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">추천 정책</h2>

    <!-- 결과가 있을 때 -->
    <div v-if="filteredPolicies.length > 0">
      <div v-for="policy in paginatedPolicies" :key="policy.idx" class="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 class="text-xl font-semibold">{{ policy.subject }}</h3>
        <p class="text-gray-500">{{ policy.condition }}</p>
        <a :href="policy.url" class="text-blue-500 mt-2 inline-block">자세히 보기</a>
      </div>

      <!-- 페이지네이션 -->
      <div class="flex justify-center mt-4">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1" 
          class="px-4 py-2 bg-gray-200 rounded-md">이전</button>
        
        <span class="mx-4">페이지 {{ currentPage }} / {{ totalPages }}</span>

        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages" 
          class="px-4 py-2 bg-gray-200 rounded-md">다음</button>
      </div>
    </div>

    <!-- 결과가 없을 때 -->
    <div v-else class="text-center text-gray-500">
      만족하는 조건이 없습니다
    </div>
  </section>
</template>
