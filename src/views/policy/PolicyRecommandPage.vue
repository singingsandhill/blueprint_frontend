<script setup>
import { usePolicyStore } from "@/stores/policy.js";
import { ref, onMounted } from "vue";

const policyStore = usePolicyStore();
const policyList = ref([]);
const isModalOpen = ref(false);

const selectedRegion = ref(null);
const selectedPolicyType = ref(null);

const regions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경상북도",
  "경남",
  "제주",
];
const policyTypes = [
  "일자리(창업)",
  "일자리(취업)",
  "건강",
  "교육",
  "금융",
  "문화",
  "복지",
  "주거비 지원",
  "주택공급",
  "참여",
];

// const fetchPolicyList = async () => {
//   await policyStore.getPolicyInfo();
// };

const openPolicyDetailModal = async (idx) => {
  await policyStore.getPolicyDetail(idx);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const applyFilters = async () => {
  policyStore.filterCondition.district = selectedRegion.value;
  policyStore.filterCondition.type = selectedPolicyType.value;
  await policyStore.getPolicyFilter();
  policyList.value = policyStore.PolicyInfoList;
};

// onMounted(async () => {
//   await fetchPolicyList();
//   policyList.value = policyStore.PolicyInfoList;
// });
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-lg font-semibold mb-4">정책 필터</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label for="region" class="block text-sm font-medium text-gray-700"
          >지역 선택</label
        >
        <select
          v-model="selectedRegion"
          id="region"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="null">전체</option>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>

      <div>
        <label for="policyType" class="block text-sm font-medium text-gray-700"
          >정책 유형</label
        >
        <select
          v-model="selectedPolicyType"
          id="policyType"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="null">전체</option>
          <option v-for="type in policyTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-6">
      <button
        @click="applyFilters"
        class="w-full bg-darkBlue text-white py-2 px-4 rounded-md"
      >
        필터 적용
      </button>
    </div>
  </div>

  <div class="container mx-auto p-4">
    <p class="text-2xl font-bold mb-4 text-[32px]">정책 리스트</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="(policy, index) in policyList"
        :key="index"
        class="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        @click="openPolicyDetailModal(policy.idx)"
      >
        <h2 class="text-lg font-bold mb-2 text-gray-800">{{ policy.name }}</h2>
        <div class="text-gray-600 text-sm space-y-1">
          <p><strong>인덱스:</strong> {{ policy.idx }}</p>
          <p><strong>지역:</strong> {{ policy.city }}</p>
          <p><strong>지역:</strong> {{ policy.district }}</p>
          <p><strong>정책 유형:</strong> {{ policy.type }}</p>
          <p><strong>운영 기관:</strong> {{ policy.offerInst }}</p>
          <p><strong>주관 기관:</strong> {{ policy.manageInst }}</p>
          <p><strong>정책 시작 날짜:</strong> {{ policy.startDate }}</p>
          <p><strong>정책 마감 날짜:</strong> {{ policy.endDate }}</p>
          <p><strong>신청 시작 날짜:</strong> {{ policy.applyStartDate }}</p>
          <p><strong>신청 마감 날짜:</strong> {{ policy.applyEndDate }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="bg-white rounded-lg shadow-2xl p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative"
      >
        <p class="text-2xl font-semibold mb-4 text-[26px] text-gray-800">
          정책 상세 정보
        </p>
        <div class="text-gray-700 space-y-2">
          <p><strong>대상:</strong> {{ policyStore.PolicyDetail.subject }}</p>
          <p><strong>조건:</strong> {{ policyStore.PolicyDetail.condition }}</p>
          <p>
            <strong>상세 내용:</strong> {{ policyStore.PolicyDetail.content }}
          </p>
          <p>
            <strong>지원 규모:</strong> {{ policyStore.PolicyDetail.scale }}
          </p>
          <p><strong>문의처:</strong> {{ policyStore.PolicyDetail.enquiry }}</p>
          <p><strong>지원 방법:</strong> {{ policyStore.PolicyDetail.way }}</p>
          <p><strong>서류:</strong> {{ policyStore.PolicyDetail.document }}</p>
          <p><strong>URL:</strong> {{ policyStore.PolicyDetail.url }}</p>
        </div>
        <button
          class="mt-6 bg-darkBlue text-white px-6 py-2 rounded-lg w-full"
          @click="closeModal"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>
