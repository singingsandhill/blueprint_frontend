<script setup>
import { ref, computed, onMounted } from "vue";
import { useMyPageStore } from "@/stores/myPage";
import { useFinanceStore } from "@/stores/finance";

const myPageStore = useMyPageStore();
const financeStore = useFinanceStore();
const filterSavings = ref([]);
const filterLoan = ref([]);

const MyPageInfo = computed(() => myPageStore.MyPageInfo);

// 데이터 없을 때 입력하게 만들기
//근데
// const InputInfo = async () => {
//   if(!MyPageInfo.value.occupation) {

//   }
// }

const fetchSavings = async () => {
  await financeStore.getSavings();
  filterSavings.value = financeStore.SavingsList;
};

const fetchLoan = async () => {
  await financeStore.getLoan();
  filterLoan.value = financeStore.LoanList;
};

onMounted(async () => {
  await fetchSavings();
  await fetchLoan();
  await myPageStore.getMyPageInfo();
});
</script>

<!-- <template>
  <div v-if="MyPageInfo.occupation">hi</div>
  <div v-else="MyPageInfo.occupation">등록된 추가 정보가 없어서 맞춤형 정보를 제공해드리기 어려워요.</div>
  <h1>Savings 추천</h1>
  <div>은행명 : {{ filterSavings.korCoNm }}</div>
  <div>예금명 : {{ filterSavings.finPrdtNm }}</div>
  <div>가입방법 : {{ filterSavings.joinWay }}</div>
  <div>가입할 수 있는 사람 : {{ filterSavings.joinMember }}</div>
  <div>이자 방식 : {{ filterSavings.intrRateNm }}</div>
  <div>{{ filterSavings.saveTrm }}</div>
  <div>{{ filterSavings.intrRate }}</div>
  <div>최대 금리 : {{ filterSavings.intrRate2 }}</div>
  <h1>loan 추천</h1>
  <div>{{ filterLoan.korCoNm }}</div>
</template> -->

<template>
  <div
    v-if="MyPageInfo.occupation"
    class="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-xl font-bold mb-4">정책</h1>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-xl font-bold mb-4">청약</h1>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-xl font-bold mb-4">추천 금융 상품_예금</p>
      <p class="text-lg font-semibold mb-2">
        은행명: {{ filterSavings.korCoNm }}
      </p>
      <p class="text-gray-600 mb-1">예금명: {{ filterSavings.finPrdtNm }}</p>
      <p class="text-gray-600 mb-1">가입 방법: {{ filterSavings.joinWay }}</p>
      <p class="text-gray-600 mb-1">
        가입 가능 대상: {{ filterSavings.joinMember }}
      </p>
      <p class="text-gray-600 mb-1">
        이자 방식: {{ filterSavings.intrRateNm }}
      </p>
      <p class="text-gray-600 mb-1">저축 기간: {{ filterSavings.saveTrm }}</p>
      <p class="text-gray-600 mb-1">기본 금리: {{ filterSavings.intrRate }}</p>
      <p class="text-gray-600 font-bold">
        최대 금리: {{ filterSavings.intrRate2 }}
      </p>

      <p class="text-xl font-bold mb-4 mt-4">추천 금융 상품_대출</p>
      <p class="text-lg font-semibold mb-2">
        상품 이름 : {{ filterLoan.korCoNm }}
      </p>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-xl font-bold mb-4">부동산</p>
    </div>
  </div>
  <div v-else>
    등록된 추가 정보가 없어서 맞춤형 정보를 제공해드리기 어려워요.
  </div>
</template>

<style>
/* TailwindCSS로 반응형 스타일 적용 */
</style>
