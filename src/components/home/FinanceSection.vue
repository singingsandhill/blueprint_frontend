<script setup>
import { ref, onMounted } from "vue";
import { useFinanceStore } from "@/stores/finance";

const financeStore = useFinanceStore();

const cachedSavingsList = localStorage.getItem("cachedSavingsList");
const cachedLoanList = localStorage.getItem("cachedLoanList");

const savingsList = ref(cachedSavingsList ? JSON.parse(cachedSavingsList) : []);
const loanList = ref(cachedLoanList ? JSON.parse(cachedLoanList) : []);

const getBankImage = (bankName) => {
  const bankImageMap = {
    '한화생명보험주식회사': new URL('@/assets/bank/hanwha.png', import.meta.url).href,
    '삼성생명보험주식회사': new URL('@/assets/bank/samsung.png', import.meta.url).href,
    '흥국생명보험주식회사': new URL('@/assets/bank/heungkuk.png', import.meta.url).href,
    '교보생명보험주식회사': new URL('@/assets/bank/kyobo.png', import.meta.url).href,
    '하나생명보험주식회사': new URL('@/assets/bank/hana.png', import.meta.url).href,
    '동양생명보험주식회사': new URL('@/assets/bank/dongyang.png', import.meta.url).href,
    '삼성화재해상보험주식회사': new URL('@/assets/bank/samsung-fire.png', import.meta.url).href,
    '현대해상화재보험주식회사': new URL('@/assets/bank/hyundai.png', import.meta.url).href,
    '주식회사KB손해보험': new URL('@/assets/bank/kb.png', import.meta.url).href,
    '푸본현대생명보험주식회사': new URL('@/assets/bank/fubon.png', import.meta.url).href,
    '농협생명보험주식회사': new URL('@/assets/bank/nh.png', import.meta.url).href,
    '농협손해보험주식회사': new URL('@/assets/bank/nh.png', import.meta.url).href,
    '에이비엘생명보험주식회사': new URL('@/assets/bank/abl.png', import.meta.url).href,
    '롯데손해보험주식회사': new URL('@/assets/bank/lotte.png', import.meta.url).href,
    '우리은행': new URL('@/assets/bank/woori.png', import.meta.url).href,
    '한국스탠다드차타드은행': new URL('@/assets/bank/sc.svg', import.meta.url).href,
    '아이엠뱅크': new URL('@/assets/bank/im.png', import.meta.url).href,
    '부산은행': new URL('@/assets/bank/busanbank.png', import.meta.url).href,
    '광주은행': new URL('@/assets/bank/kjbank.png', import.meta.url).href,
    '제주은행': new URL('@/assets/bank/jeju.png', import.meta.url).href,
    '전북은행': new URL('@/assets/bank/jbbank.png', import.meta.url).href,
    '경남은행': new URL('@/assets/bank/bnk.png', import.meta.url).href,
    '중소기업은행': new URL('@/assets/bank/ibk.png', import.meta.url).href,
    '한국산업은행': new URL('@/assets/bank/kdb.jpg', import.meta.url).href,
    '국민은행': new URL('@/assets/bank/kb.png', import.meta.url).href,
    '신한은행': new URL('@/assets/bank/shinhan.png', import.meta.url).href,
    '농협은행주식회사': new URL('@/assets/bank/nh.png', import.meta.url).href,
    '하나은행': new URL('@/assets/bank/hana.png', import.meta.url).href,
    '케이뱅크': new URL('@/assets/bank/kbank.png', import.meta.url).href,
    '수협은행주식회사': new URL('@/assets/bank/sh.png', import.meta.url).href,
    '카카오뱅크': new URL('@/assets/bank/kakao.png', import.meta.url).href,
    '토스뱅크 주식회사': new URL('@/assets/bank/toss.png', import.meta.url).href
  };

  try {
    return bankImageMap[bankName] || new URL('@/assets/bank/default.png', import.meta.url).href;
  } catch (error) {
    console.error('Error loading bank image:', error);
    return '';
  }
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const fetchAndCacheData = async () => {
  if (!cachedSavingsList || !cachedLoanList) {
    try {
      await financeStore.getAllSavings();
      await financeStore.getAllLoans();

      localStorage.setItem(
        "cachedSavingsList",
        JSON.stringify(financeStore.AllSavingsList)
      );
      localStorage.setItem(
        "cachedLoanList",
        JSON.stringify(financeStore.AllLoanList)
      );

      savingsList.value = shuffleArray(financeStore.AllSavingsList).slice(0, 4);
      loanList.value = shuffleArray(financeStore.AllLoanList).slice(0, 4);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  } else {
    savingsList.value = shuffleArray(JSON.parse(cachedSavingsList)).slice(0, 4);
    loanList.value = shuffleArray(JSON.parse(cachedLoanList)).slice(0, 4);
  }
};

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

    <!-- 저축 상품 카드 -->
    <div class="mb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(item, index) in savingsList"
          :key="index"
          class="card relative border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
        <div class="content-wrapper">
          <div
          class="text-sm rounded-full px-3 py-1 mb-2 text-center limited-width"
          style="background-color: #C1D5F9; color: white;"
          >
          {{ getProductType(item.finPrdtNm) }}
        </div>
        
        <h3 class="text-lg font-semibold mb-2 text-center">
          {{ item.finPrdtNm || "상품명 없음" }}
        </h3>
        <div class="flex justify-center my-4" v-if="getBankImage(item.korCoNm)">
          <img
          :src="getBankImage(item.korCoNm)"
          alt="Bank Logo"
          class="w-32 h-15 object-contain" />
        </div>
  
        <div class="text-center text-gray-700 mt-4 space-y-2 text-sm">
          <p>가입 대상: {{ item.joinMember || "정보 없음" }}</p>
          <p>가입 방법: {{ item.joinWay || "정보 없음" }}</p>
          <p>이율: 최대 {{ item.intrRate2 || 0 }}%</p>
        </div>
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
          class="card border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <div class="content-wrapper">
            <!-- 대출 카테고리 -->
            <div
              class="text-sm rounded-full px-3 py-1 inline-block mb-2 text-center limited-width"
              style="background-color: #C1D5F9; color: white;"
            >
              {{ getLoanCategory(item.prdCategory) }}
            </div>

          <!-- 대출 상품명 -->
          <h3 class="text-lg font-semibold mb-2 text-center">
            {{ item.finPrdtNm || "상품명 없음" }}
          </h3>
          <div class="flex justify-center my-4" v-if="getBankImage(item.korCoNm)">
          <img
          :src="getBankImage(item.korCoNm)"
          alt="Bank Logo"
          class="w-32 h-15 object-contain" />
        </div>

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
  </div>
</template>

<style scoped>
.card {
  min-height: 300px;
  height: 100%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card:hover {
  transform: translateY(-1px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}
.limited-width {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: center;
}

@media (max-width: 768px) {
  .card {
    min-height: 250px;
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

