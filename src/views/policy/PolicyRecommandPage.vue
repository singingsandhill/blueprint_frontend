<script setup>
import { usePolicyStore } from "@/stores/policy.js";
import { ref, computed, onMounted } from "vue";

const policyStore = usePolicyStore();
const policyList = ref([]);

const selectedCity = ref(null);
const district = ref(null);
const selectedPolicyType = ref(null);
const selectedAge = ref(null);
const selectedJob = ref(null);
const selectedName = ref(null);

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
  localStorage.setItem("selectedAge", selectedAge.value);
  localStorage.setItem("selectedJob", selectedJob.value);
  localStorage.setItem("selectedName", selectedName.value);

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

  policyStore.filterCondition.age =
    selectedAge.value === "" || selectedAge.value === "null"
      ? null
      : selectedAge.value;

  policyStore.filterCondition.job =
    selectedJob.value === "전체" || selectedJob.value === "null"
      ? null
      : selectedJob.value;

  policyStore.filterCondition.name =
    selectedName.value === "" || selectedName.value === "null"
      ? null
      : selectedName.value;

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
  selectedAge.value = localStorage.getItem("selectedAge") || "";
  selectedJob.value = localStorage.getItem("selectedJob") || null;
  selectedName.value = localStorage.getItem("selectedName") || "";

  if (
    selectedCity.value ||
    district.value ||
    selectedPolicyType.value ||
    selectedAge.value ||
    selectedJob.value ||
    selectedName.value
  ) {
    applyFilters();
  }
});
</script>

<template>
  <section
    class="bg-gray-800 text-white p-4 rounded-lg mt-6 flex mx-auto flex-col items-center gap-4 md:gap-2 shadow-md w-[90%] md:flex-row md:flex-wrap md:justify-center"
  >
    <div
      class="flex items-center space-x-2 bg-[#002842] text-white px-3 py-2 rounded-lg md:rounded-l-lg w-full md:w-auto"
    >
      <i class="fas fa-users"></i>
      <strong class="text-lg font-semibold">정책 검색</strong>
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto"
    >
      <i class="fas fa-map-marker-alt text-gray-500"></i>
      <select
        v-model="selectedCity"
        class="bg-transparent w-full focus:outline-none"
      >
        <option value="null">전체</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto"
    >
      <i class="fas fa-user text-gray-500"></i>
      <input
        v-model="district"
        id="district"
        type="text"
        placeholder="지역구를 입력해 주세요."
        class="bg-transparent w-full focus:outline-none"
      />
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto"
    >
      <i class="fas fa-briefcase text-gray-500"></i>
      <select
        v-model="selectedJob"
        class="bg-transparent w-full focus:outline-none"
      >
        <option value="null">전체</option>
        <option value="학생">학생</option>
        <option value="무직">무직</option>
        <option value="직장인">직장인</option>
        <option value="자영업">자영업</option>
        <option value="프리랜서">프리랜서</option>
        <option value="(예비)창업자">(예비)창업자</option>
        <option value="일용근로자">일용근로자</option>
        <option value="단기근로자">단기근로자</option>
        <option value="영농종사자">영농종사자</option>
      </select>
    </div>

    <!-- 연령 필터 -->
    <div
      class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto"
    >
      <i class="fas fa-user text-gray-500"></i>
      <input
        v-model="selectedAge"
        id="selectedAge"
        type="text"
        placeholder="나이를 입력해 주세요."
        class="bg-transparent w-full focus:outline-none"
      />
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto"
    >
      <i class="fas fa-briefcase text-gray-500"></i>
      <select
        v-model="selectedPolicyType"
        class="bg-transparent w-full focus:outline-none"
      >
        <option value="null">전체</option>
        <option v-for="type in policyTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto"
    >
      <i class="fas fa-user text-gray-500"></i>
      <input
        v-model="selectedName"
        id="selectedName"
        type="text"
        placeholder="정책명을 입력해 주세요."
        class="bg-transparent w-full focus:outline-none"
      />
    </div>

    <button
      @click="applyFilters"
      class="bg-[#002842] px-4 py-2 rounded-lg w-full md:w-auto flex items-center justify-center"
    >
      <i class="fas fa-search"></i>
      <span class="ml-1">검색</span>
    </button>
  </section>

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
