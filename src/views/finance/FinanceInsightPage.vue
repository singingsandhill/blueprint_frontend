<template>
  <div>
    <h2>Finance List</h2>
    
    <div class="filters">
      <input v-model="filters.finPrdtNm" placeholder="Product Name" />
      <input v-model="filters.mrtgTypeNm" placeholder="Mortgage Type" />
      <input v-model="filters.lendRateTypeNm" placeholder="Interest Rate Type" />
      
      <div class="select-group">
        <label>정렬:</label>
        <select v-model="filters.sortBy">
          <option value="lendRateMin">최소 이율</option>
          <option value="lendRateMax">최대 이율</option>
          <option value="lendRateAvg">평균 이율</option>
        </select>
      </div>

      <div class="select-group">
        <label>기준:</label>
        <select v-model="filters.direction">
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>

    <button @click="fetchData">Apply Filters</button>
  </div>
    
    <div v-if="loading">Loading...</div>
    
    <div v-else-if="financeData?.content?.length">
      <table>
        <thead>
          <tr>
            <!-- <th>ID</th>
            <th>Product Code</th> -->
            <th>Company Name</th>
            <th>Product Name</th>
            <th>Join Way</th>
            <th>Loan Limit</th>
            <th>Mortgage Type</th>
            <th>Interest Rate Type</th>
            <th>Repayment Type</th>
            <th>Interest Rate Min</th>
            <th>Interest Rate Max</th>
            <th>Interest Rate Avg</th>
            <!-- <th>Category</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in financeData.content" :key="item.idx">
            <!-- <td>{{ item.idx }}</td>
            <td>{{ item.finPrdtCd }}</td> -->
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
            <!-- <td>{{ item.prdCategory }}</td> -->
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage" :disabled="page === 0">Previous</button>
        <span>Page {{ page + 1 }} of {{ financeData.totalPages }}</span>
        <button @click="nextPage" :disabled="financeData.last">Next</button>
      </div>
    </div>

    <div v-else>No data available</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/util/axiosInstance';

const financeData = ref({
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
  sortBy: 'lendRateMin',  // 기본값
  direction: 'asc'         // 기본값
});

const fetchData = async () => {
  loading.value = true;
  try {
    const params = {
      page: page.value,
      size: size.value,
      ...filters.value,
    };
    const response = await axiosInstance.get('/finance/loans', { params });
    if (response.data.success) {
      financeData.value = response.data.response.data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    financeData.value = {
      content: [],
      totalPages: 0,
      last: true
    };
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  page.value++;
  fetchData();
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchData();
  }
};

onMounted(fetchData);
</script>

<style scoped>
.filters {
  margin-bottom: 1rem;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
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
}

input {
  margin-right: 0.5rem;
  padding: 0.25rem;
}

button {
  padding: 0.25rem 0.5rem;
}

td {
  white-space: pre-line;
}

.filters {
  display: flex;
  gap: 1rem; /* 요소 간 간격 */
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap; /* 줄바꿈 방지 */
}

.filters input, 
.filters select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 150px; /* 고정 너비 설정 */
}

.select-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>