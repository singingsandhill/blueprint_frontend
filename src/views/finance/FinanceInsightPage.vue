<script setup>
import { ref, computed, onMounted } from 'vue';
import axiosInstance from '@/util/axiosInstance';

const selectedTab = ref('loan');
const financeData = ref({
  content: [],
  totalPages: 0,
  last: true
});
const savingsData = ref({
  content: [],
  totalPages: 0,
  last: true
});
const page = ref(0);
const size = ref(10);
const loading = ref(false);
const visiblePageCount = 5;

const mortgageTypes = [
  { value: '', label: '전체' },
  { value: '아파트', label: '아파트' },
  { value: '아파트외', label: '아파트외' }
];

const interestTypes = [
  { value: '', label: '전체' },
  { value: '고정금리', label: '고정금리' },
  { value: '변동금리', label: '변동금리' }
];

const filters = ref({
  finPrdtNm: '',
  mrtgTypeNm: '',
  lendRateTypeNm: '',
  intrRateNm: '',
  prdCategory: '',
  sortBy: 'lendRateMin',
  direction: 'asc'
});

const displayedPages = computed(() => {
  const totalPages = selectedTab.value === 'loan' ? 
    financeData.value.totalPages : 
    savingsData.value.totalPages;
  const current = page.value;
  const half = Math.floor(visiblePageCount / 2);
  
  let start = current - half;
  let end = current + half;
  
  if (start < 0) {
    start = 0;
    end = Math.min(visiblePageCount - 1, totalPages - 1);
  }
  
  if (end >= totalPages) {
    end = totalPages - 1;
    start = Math.max(0, end - visiblePageCount + 1);
  }
  
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const selectTab = (tab) => {
  selectedTab.value = tab;
  filters.value = tab === 'loan' ? {
    finPrdtNm: '',
    mrtgTypeNm: '',
    lendRateTypeNm: '',
    sortBy: 'lendRateMin',
    direction: 'asc'
  } : {
    intrRateNm: '',
    prdCategory: '',
    sortBy: 'intrRate',
    direction: 'asc'
  };
  page.value = 0;
  fetchData();
};

const fetchData = async () => {
  loading.value = true;
  try {
    const params = {
      ...filters.value,
      page: page.value,
      size: size.value,
    };
    
    if (params.mrtgTypeNm === '-') {
      params.mrtgTypeNm = '';
    }
    
    const url = selectedTab.value === 'loan' ? '/finance/loans' : '/finance/savings';
    const response = await axiosInstance.get(url, { params });
    if (response.data.success) {
      if (selectedTab.value === 'loan') {
        financeData.value = response.data.response.data;
      } else {
        savingsData.value = response.data.response.data;
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    financeData.value = savingsData.value = { content: [], totalPages: 0, last: true };
  } finally {
    loading.value = false;
  }
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchData();
  }
};

const nextPage = () => {
  const totalPages = selectedTab.value === 'loan' ? 
    financeData.value.totalPages : 
    savingsData.value.totalPages;
  if (page.value < totalPages - 1) {
    page.value++;
    fetchData();
  }
};

const goToPage = (newPage) => {
  page.value = newPage;
  fetchData();
};

onMounted(fetchData);
</script>

<template>
<div class="flex justify-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- 전체를 감싸는 컨테이너 -->
  <div class="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
    <div class="items-center space-x-2 bg-[#002842] text-white px-4 py-3 rounded-lg w-full md:w-auto whitespace-nowrap"> 검색 조건 </div>
    <!-- Tabs -->
    <div class="flex gap-2 whitespace-nowrap">
      <button 
        :class="[
          'px-4 py-3 rounded-lg text-sm font-medium',
          selectedTab === 'loan' 
            ? 'bg-white border  border-[#002842]' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
        @click="selectTab('loan')"
      >
        대출
      </button>
      <button 
        :class="[
          'px-4 py-3 rounded-lg text-sm font-medium',
          selectedTab === 'savings' 
            ? 'bg-white border  border-[#002842]' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
        @click="selectTab('savings')"
      >
        저축
      </button>
    </div>

    <!-- Filter Section -->
    <div class="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto">
      <!-- 대출 필터 -->
      <template v-if="selectedTab === 'loan'">
        <div class="items-center space-x-2 text-[#002842] px-4 py-3 rounded-lg w-full md:w-auto whitespace-nowrap"> 담보 유형 </div>
        <select 
          v-model="filters.mrtgTypeNm"
          class="filter-select"
        >
          <option v-for="type in mortgageTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
        <div class="items-center space-x-2 text-[#002842] px-4 py-3 rounded-lg w-full md:w-auto whitespace-nowrap"> 금리 유형 </div>
        <select 
          v-model="filters.lendRateTypeNm"
          class="filter-select"
        >
          <option v-for="type in interestTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </template>

      <!-- 저축 필터 -->
      <template v-else>
        <div class="items-center space-x-2 text-[#002842] px-4 py-3 rounded-lg w-full md:w-auto whitespace-nowrap"> 금리 유형 </div>
        <select 
          v-model="filters.intrRateNm"
          class="filter-select"
        >
          <option value="">전체</option>
          <option value="단리">단리</option>
          <option value="복리">복리</option>
        </select>

        <div class="items-center space-x-2 text-[#002842] px-4 py-3 rounded-lg w-full md:w-auto whitespace-nowrap"> 상품 유형 </div>
        <select 
          v-model="filters.prdCategory"
          class="filter-select"
        >
          <option value="">전체</option>
          <option value="saving">예금</option>
          <option value="deposit">적금</option>
        </select>
      </template>

      <!-- 검색 버튼 -->
      <button 
        @click="fetchData"
        class="items-center space-x-2 bg-[#002842] text-white px-4 py-3 rounded-lg w-full md:w-auto whitespace-nowrap"
      >
        검색
      </button>
    </div>
  </div>
</div>
    <div class="mx-auto p-4 w-full max-w-8xl">
    <!-- 제목 -->
    <h2 class="text-2xl font-bold mb-4 text-[32px]">금융 상품</h2>
    <div class="flex border-t-4 border-darkBlue py-4"></div>
    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <!-- Loan Table -->
        <table v-if="selectedTab === 'loan'" class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">금융사</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">상품명</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">가입방법</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">대출 한도</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">담보 유형</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">이자 유형</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">상환 유형</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">최소 이율</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">최대 이율</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">평균 이율</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in financeData.content" :key="item.idx" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.korCoNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.finPrdtNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.joinWay }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.loanLmt }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.mrtgTypeNm || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.lendRateTypeNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.rpayTypeNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.lendRateMin }}%</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.lendRateMax }}%</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.lendRateAvg || '-' }}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Savings Table -->
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">금융사</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">상품 유형</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">상품명</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">가입방법</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">저축 기간</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">이자 유형</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">최소 이율</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">최대 이율</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in savingsData.content" :key="item.idx" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.korCoNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.prdCategory === 'deposit' ? '적금' : item.prdCategory === 'saving' ? '예금' : item.prdCategory }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.finPrdtNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.joinWay }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.saveTrm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.intrRateNm }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.intrRate }}%</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.intrRate2 }}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div 
        v-if="!loading && (!financeData.content.length && !savingsData.content.length)" 
        class="text-center py-12 text-gray-500"
      >
        데이터가 없습니다
      </div>
    </div>
  </div>

    <!-- 페이지네이션 -->
<div class="flex justify-center mt-4 space-x-2">
  <button 
    class="pagination-button"
    @click="prevPage" 
    :disabled="page === 0"
  >
    이전
  </button>

  <!-- 첫 페이지 버튼 -->
  <button
    v-if="displayedPages[0] > 0"
    class="pagination-button"
    @click="goToPage(0)"
  >
    1
  </button>

  <!-- 첫 페이지 이후 생략 부호 -->
  <span v-if="displayedPages[0] > 1" class="px-2">...</span>

  <!-- 페이지 번호 -->
  <button
    v-for="p in displayedPages"
    :key="p"
    @click="goToPage(p)"
    :class="{'pagination-button': true, 'active': p === page}"
  >
    {{ p + 1 }}
  </button>

  <!-- 마지막 페이지 이전 생략 부호 -->
  <span 
    v-if="displayedPages[displayedPages.length - 1] < (selectedTab === 'loan' ? financeData.totalPages : savingsData.totalPages) - 2" 
    class="px-2"
  >
    ...
  </span>

  <!-- 마지막 페이지 버튼 -->
  <button
    v-if="displayedPages[displayedPages.length - 1] < (selectedTab === 'loan' ? financeData.totalPages : savingsData.totalPages) - 1"
    class="pagination-button"
    @click="goToPage((selectedTab === 'loan' ? financeData.totalPages : savingsData.totalPages) - 1)"
  >
    {{ selectedTab === 'loan' ? financeData.totalPages : savingsData.totalPages }}
  </button>

  <button 
    class="pagination-button"
    @click="nextPage" 
    :disabled="selectedTab === 'loan' ? financeData.last : savingsData.last"
  >
    다음
  </button>
</div>
</template>

<style scoped>
.loading-spinner {
  @apply flex justify-center items-center py-12;
}

.loading-spinner::after {
  content: '';
  @apply w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.pagination-button:hover {
  background-color: #f5f5f5;
}

.pagination-button:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

.pagination-button.active {
  background-color: #0d223d;
  color: white;
  border-color: #0d223d;
}
.filter-select {
  min-width: 120px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  outline: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.filter-select:hover {
  border-color: #999;
}

.filter-select:focus {
  border-color: #666;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .filter-select {
    width: 100%;
  }
}
</style>
