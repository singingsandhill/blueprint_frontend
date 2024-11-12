<script setup>
import { usePolicyStore } from "@/stores/policy.js";
import { ref, computed, onMounted } from "vue";

const policyStore = usePolicyStore();
const policyList = ref([]);

const selectedCity = ref(null);
const district = ref(null);
const selectedPolicyType = ref(null);

const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => {
  return Math.ceil(policyList.value.length / itemsPerPage);
});

const paginatedPolicies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return policyList.value.slice(start, end);
});

const cities = [
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

const applyFilters = async () => {
  localStorage.setItem("selectedCity", selectedCity.value);
  localStorage.setItem("district", district.value);
  localStorage.setItem("selectedPolicyType", selectedPolicyType.value);

  policyStore.filterCondition.city =
    selectedCity.value === "전체" || selectedCity.value === "null"
      ? null
      : selectedCity.value;

  policyStore.filterCondition.district =
    district.value === "" || district.value === "null" ? null : district.value;

  policyStore.filterCondition.type =
    selectedPolicyType.value === "전체" || selectedPolicyType.value === "null"
      ? null
      : selectedPolicyType.value;

  await policyStore.getPolicyFilter();
  policyList.value = policyStore.PolicyInfoList;
  currentPage.value = 1;
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

onMounted(() => {
  selectedCity.value = localStorage.getItem("selectedCity") || null;
  district.value = localStorage.getItem("district") || "";
  selectedPolicyType.value = localStorage.getItem("selectedPolicyType") || null;

  if (selectedCity.value || district.value || selectedPolicyType.value) {
    applyFilters();
  }
});
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg max-w-[900px] mx-auto">
    <h2 class="text-lg font-semibold mb-4">정책 필터</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label for="city" class="block text-sm font-medium text-gray-700"
          >지역 선택</label
        >
        <select
          v-model="selectedCity"
          id="city"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="null">전체</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div>
        <label for="district" class="block text-sm font-medium text-gray-700"
          >지역구 선택</label
        >
        <input
          v-model="district"
          id="district"
          type="text"
          placeholder="지역구를 입력해주세요."
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
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

  <div class="mx-auto p-4 max-w-4xl">
    <p class="text-2xl font-bold mb-4 text-[32px]">검색한 정책</p>
    <div class="flex border-t-4 border-darkBlue py-4"></div>

    <ul>
      <li
        v-for="(policy, index) in paginatedPolicies"
        :key="index"
        class="hover:bg-gray-100 cursor-pointer flex items-center space-x-4 border-t border-gray-200 p-2"
        @click="
          $router.push({
            name: 'PolicyDetail',
            params: { idx: policy.idx },
          })
        "
      >
        <div
          class="w-24 bg-lightBlue text-black text-center font-medium px-3 py-1 rounded-md text-xs"
        >
          {{ policy.type }}
        </div>
        <div class="p-2">
          <p class="policy-title text-lg font-semibold">
            {{ policy.name }}
          </p>
          <span class="text-gray-600 text-sm">
            {{ formatDate(policy.startDate) }}
          </span>
          <span> ~ </span>
          <span class="text-gray-600 text-sm">
            {{ formatDate(policy.startDate) }}
          </span>
        </div>
      </li>
    </ul>
    <div class="flex justify-center mt-4">
      <button
        class="px-4 py-2 mx-1 bg-darkBlue text-white rounded-md"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        이전
      </button>
      <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="px-4 py-2 mx-1 bg-darkBlue text-white rounded-md"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        다음
      </button>
    </div>
  </div>
</template>
