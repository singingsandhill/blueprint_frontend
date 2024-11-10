<script setup>
import { usePolicyStore } from "@/stores/policy.js";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

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

  router.push({
    path: '/policy',
    query: {
      city: selectedCity.value,
      district: district.value,
      type: selectedPolicyType.value,
    },
  });
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(async () => {
  if (route.query.city || route.query.district || route.query.type) {
    selectedCity.value = route.query.city || null;
    district.value = route.query.district || null;
    selectedPolicyType.value = route.query.type || null;

    policyStore.filterCondition.city = selectedCity.value;
    policyStore.filterCondition.district = district.value;
    policyStore.filterCondition.type = selectedPolicyType.value;

    await policyStore.getPolicyFilter();
    policyList.value = policyStore.PolicyInfoList;
  }
});
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
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
  <div class="container mx-auto p-4">
    <p class="text-2xl font-bold mb-4 text-[32px]">정책 리스트</p>
    <div class="overflow-hidden rounded-md border border-gray-300">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-darkBlue text-white">
            <th class="border border-gray-300 px-4 py-2">이름</th>
            <th class="border border-gray-300 px-4 py-2">지역</th>
            <th class="border border-gray-300 px-4 py-2">지역구</th>
            <th class="border border-gray-300 px-4 py-2">정책 유형</th>
            <th class="border border-gray-300 px-4 py-2">운영 기관</th>
            <th class="border border-gray-300 px-4 py-2">정책 시작 날짜</th>
            <th class="border border-gray-300 px-4 py-2">정책 마감 날짜</th>
            <th class="border border-gray-300 px-4 py-2">신청 시작 날짜</th>
            <th class="border border-gray-300 px-4 py-2">신청 마감 날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(policy, index) in paginatedPolicies"
            :key="index"
            class="hover:bg-gray-100 cursor-pointer"
            @click="
              $router.push({
                name: 'policyDetail',
                params: { idx: policy.idx },
              })
            "
          >
            <td class="border border-gray-300 px-4 py-2">{{ policy.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ policy.city }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ policy.district }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ policy.type }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ policy.offerInst }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ policy.startDate }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ policy.endDate }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ policy.applyStartDate }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ policy.applyEndDate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
