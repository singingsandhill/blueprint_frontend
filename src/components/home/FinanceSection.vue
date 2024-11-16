<script setup>
import { ref, onMounted } from "vue";
import { useFinanceStore } from "@/stores/finance";

const financeStore = useFinanceStore();

const cachedSavingsList = localStorage.getItem("cachedSavingsList");
const cachedLoanList = localStorage.getItem("cachedLoanList");

const savingsList = ref(cachedSavingsList ? JSON.parse(cachedSavingsList) : []);
const loanList = ref(cachedLoanList ? JSON.parse(cachedLoanList) : []);

// 데이터 랜덤화 함수
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// API에서 데이터 가져오기 및 캐싱
const fetchAndCacheData = async () => {
  if (!cachedSavingsList || !cachedLoanList) {
    try {
      await financeStore.getAllSavings();
      await financeStore.getAllLoans();

      // 데이터 캐싱
      localStorage.setItem(
        "cachedSavingsList",
        JSON.stringify(financeStore.AllSavingsList)
      );
      localStorage.setItem(
        "cachedLoanList",
        JSON.stringify(financeStore.AllLoanList)
      );

      // 랜덤화 후 저장
      savingsList.value = shuffleArray(financeStore.AllSavingsList).slice(0, 4);
      loanList.value = shuffleArray(financeStore.AllLoanList).slice(0, 4);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  } else {
    // 캐싱된 데이터를 랜덤으로 정렬
    savingsList.value = shuffleArray(JSON.parse(cachedSavingsList)).slice(0, 4);
    loanList.value = shuffleArray(JSON.parse(cachedLoanList)).slice(0, 4);
  }
};

// "예금" 또는 "적금" 표시 함수
const getProductType = (productName) => {
  if (productName.includes("예금")) {
    return "예금";
  } else if (productName.includes("적금")) {
    return "적금";
  } else {
    return "상품";
  }
};

// 대출 카테고리 표시 함수
const getLoanCategory = (category) => {
  if (category === "mortgage") {
    return "주택 담보 대출";
  } else if (category === "rentHouse") {
    return "전세 자금 대출";
  } else {
    return "기타 대출";
  }
};

onMounted(async () => {
  await fetchAndCacheData();
});
</script>

<template>
  <div class="section mt-12">
    <h2 class="text-2xl font-bold mb-8 text-center">금주의 금융 상품 추천</h2>

    <!-- 저축 상품 -->
    <div class="mb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(item, index) in savingsList"
          :key="index"
          class="card bg-white border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <div
            class="text-sm rounded-full px-3 py-1 inline-block mb-2 text-center"
            style="background-color: #C1D5F9; color: white;"
          >
            {{ getProductType(item.finPrdtNm) }}
          </div>
          <h3 class="text-lg font-semibold mb-2 text-center">
            {{ item.finPrdtNm || "상품명 없음" }}
          </h3>
          <div class="text-center text-gray-700 mt-4 space-y-2 text-sm">
            <p>가입 대상: {{ item.joinMember || "정보 없음" }}</p>
            <p>가입 방법: {{ item.joinWay || "정보 없음" }}</p>
            <p>이율: 최대 {{ item.intrRate2 || 0 }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 대출 상품 -->
    <div class="mb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(item, index) in loanList"
          :key="index"
          class="card bg-white border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <!-- 대출 카테고리 표시 -->
          <div
            class="text-sm rounded-full px-3 py-1 inline-block mb-2 text-center"
            style="background-color: #C1D5F9; color: white;"
          >
            {{ getLoanCategory(item.prdCategory) }}
          </div>

          <!-- 대출 상품명 -->
          <h3 class="text-lg font-semibold mb-2 text-center">
            {{ item.finPrdtNm || "상품명 없음" }}
          </h3>

          <!-- 대출 상세 정보 -->
          <div class="text-center text-gray-700 mt-4 space-y-2 text-sm">
            <p>최소 금리: {{ item.lendRateMin || 0 }}%</p>
            <p>최대 금리: {{ item.lendRateMax || 0 }}%</p>
            <p>대출 금리 유형: {{ item.lendRateTypeNm || "정보 없음" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-height: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
}

.card:hover {
  transform: translateY(-1px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .card {
    width: 100%;
    min-height: 200px;
    padding: 1rem;
  }

  h3 {
    font-size: 1rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }
}
</style>

