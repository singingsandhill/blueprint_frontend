<template>
  <div>
    <h2>금융 상품</h2>

    <!-- Tabs for Loan and Savings -->
    <div class="tabs">
      <button 
        :class="{ active: selectedTab === 'loan' }" 
        @click="selectTab('loan')">대출</button>
      <button 
        :class="{ active: selectedTab === 'savings' }" 
        @click="selectTab('savings')">저축</button>
    </div>

    

    <!-- Loan Table -->
    <div v-if="selectedTab === 'loan'">
      <!-- Filters -->
    <div class="filters" v-if="selectedTab === 'loan'">
      <div class="input-group">
        <label>검색조건</label>
        <div class="input-fields">
          <input v-model="filters.finPrdtNm" placeholder="상품명" />
          <input v-model="filters.mrtgTypeNm" placeholder="담보 유형" />
          <input v-model="filters.lendRateTypeNm" placeholder="Interest Rate Type" />
        </div>
      </div>

      <div class="select-group">
        <label>정렬:</label>
        <select v-model="filters.sortBy">
          <option value="lendRateMin">최소 이율</option>
          <option value="lendRateMax">최대 이율</option>
          <option value="lendRateAvg">평균 이율</option>
        </select>

        <label>기준:</label>
        <select v-model="filters.direction">
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
        <button @click="fetchData">Apply Filters</button>
      </div>
    </div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="financeData?.content?.length">
        <table>
          <thead>
            <tr>
              <th>금융사</th>
              <th>상품명</th>
              <th>가입방법</th>
              <th>대출 한도</th>
              <th>담보 유형</th>
              <th>이자 유형</th>
              <th>상환 유형</th>
              <th>최소 이율</th>
              <th>최대 이율</th>
              <th>평균 이율</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in financeData.content" :key="item.idx">
              <td>{{ item.korCoNm }}</td>
              <td>{{ item.finPrdtNm }}</td>
              <td>{{ item.joinWay }}</td>
              <td>{{ item.loanLmt }}</td>
              <td>{{ item.mrtgTypeNm || '-' }}</td>
              <td>{{ item.lendRateTypeNm }}</td>
              <td>{{ item.rpayTypeNm }}</td>
              <td>{{ item.lendRateMin }}%</td>
              <td>{{ item.lendRateMax }}%</td>
              <td>{{ item.lendRateAvg || '-' }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>No data available</div>
    </div>

    <!-- Savings Table -->
    <div v-if="selectedTab === 'savings'">
      <!-- Filters -->
    <div class="filters" v-if="selectedTab === 'savings'">
      <div class="input-group">
        <label>검색조건</label>
        <div class="input-fields">
          <input v-model="filters.intrRateNm" placeholder="금리 유형" />
          <input v-model="filters.prdCategory" placeholder="상품 유형" />
        </div>
      </div>

      <div class="select-group">
        <label>정렬:</label>
        <select v-model="filters.sortBy">
          <option value="intrRate">최소 이율</option>
          <option value="intrRate2">최대 이율</option>
        </select>

        <label>기준:</label>
        <select v-model="filters.direction">
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
        <button @click="fetchData">Apply Filters</button>
      </div>
    </div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="savingsData?.content?.length">
        <table>
          <thead>
            <tr>
              <th>금융사</th>
              <th>상품 유형</th>
              <th>상품명</th>
              <th>가입방법</th>
              <th>저축 기간</th>
              <th>이자 유형</th>
              <th>최소 이율</th>
              <th>최대 이율</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in savingsData.content" :key="item.idx">
              <td>{{ item.korCoNm }}</td>
              <td>{{ item.prdCategory }}%</td>
              <td>{{ item.finPrdtNm }}</td>
              <td>{{ item.joinWay }}</td>
              <td>{{ item.saveTrm }}</td>
              <td>{{ item.intrRateNm }}</td>
              <td>{{ item.intrRate }}%</td>
              <td>{{ item.intrRate2 }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>No data available</div>
    </div>
    <div class="flex justify-center mt-4 space-x-2">
      <!-- "pagination" -->
        <button 
        class="pagination-button"
        @click="prevPage" :disabled="page === 0">이전</button>
        <button
        v-for="p in financeData.totalPages" :key="p" @click="goToPage(p - 1)"
        :class="{'pagination-button': true, 'active': p - 1 === page}">
        {{ p }}
      </button>
        <button class="pagination-button"
        @click="nextPage" :disabled="financeData.last">다음</button>
      </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/util/axiosInstance';

const selectedTab = ref('loan'); // Default tab is "loan"
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
const filters = ref({
  finPrdtNm: '',
  mrtgTypeNm: '',
  lendRateTypeNm: '',
  intrRateNm: '', // 추가
  prdCategory: '', // 추가
  sortBy: 'lendRateMin',
  direction: 'asc'
});

const selectTab = (tab) => {
  selectedTab.value = tab;
  // 탭 변경 시 필터 초기화
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
  fetchData();
};
const fetchData = async () => {
  loading.value = true;
  try {
    const params = {
      page: page.value,
      size: size.value,
      ...filters.value,
    };
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

onMounted(fetchData);
</script>
<style>
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  cursor: pointer;
}

.tabs button.active {
  background-color: #0d223d;
  color: white;
  font-weight: bold;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #002842;
  padding: 1rem;
  border-radius: 8px;
  gap: 5rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-fields {
  display: flex;
  gap: 0.5rem;
}

.select-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filters input,
.filters select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 150px;
}
label {
  color: white;
  font-weight: bold;
}

button {
  background-color: #0d223d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

th {
  white-space: nowrap;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: white;
  color: #1e3a8a; /* 텍스트 색상 */
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  white-space: nowrap;
}

input {
  margin-right: 0.5rem;
  padding: 0.25rem;
}

button {
  padding: 0.25rem 0.5rem;
}
</style>