<script setup>
import FilterSection from "@/components/home/FilterSection.vue";
import { useRoute } from "vue-router";
import { usePolicyStore } from "@/stores/policy.js";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const route = useRoute();
const policyStore = usePolicyStore();
const policyList = ref([]);

const currentPage = ref(1);
const itemsPerPage = 15;
const pageGroupSize = 5;

const totalPages = computed(() =>
  Math.ceil(policyList.value.length / itemsPerPage)
);

const paginatedPolicies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return policyList.value.slice(start, end);
});

const currentGroup = computed(() =>
  Math.ceil(currentPage.value / pageGroupSize)
);

const visiblePages = computed(() => {
  const startPage = (currentGroup.value - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages.value);
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    localStorage.setItem("page", page);
  }
};

const previousPageGroup = () => {
  if (currentGroup.value > 1) {
    currentPage.value = (currentGroup.value - 1) * pageGroupSize;
  }
};

const nextPageGroup = () => {
  if (currentGroup.value * pageGroupSize < totalPages.value) {
    currentPage.value = currentGroup.value * pageGroupSize + 1;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  if (year > 2030) {
    return "예산 소진 시까지";
  }
  return date.toISOString().split("T")[0];
};

const updatePolicyList = () => {
  policyList.value = policyStore.PolicyInfoList || [];
};

onMounted(() => {
  const savedPage = localStorage.getItem("page");
  if (savedPage && (route.name === "policy" || route.name === "PolicyDetail")) {
    currentPage.value = parseInt(savedPage, 10);
  }

  window.addEventListener("filters-applied", updatePolicyList);
});

onBeforeUnmount(() => {
  if (route.name !== "policy" && route.name !== "PolicyDetail") {
    localStorage.removeItem("page");
    localStorage.removeItem("selectedCity");
    localStorage.removeItem("district");
    localStorage.removeItem("selectedPolicyType");
    localStorage.removeItem("selectedAge");
    localStorage.removeItem("selectedJob");
    localStorage.removeItem("selectedName");
    localStorage.removeItem("page");
  }

  window.removeEventListener("filters-applied", updatePolicyList);
});
</script>

<template>
  <div class="mt-12 max-w-8xl mx-auto p-4 w-full">
    <p class="text-ml font-bold mb-4 text-[32px]">정책 정보</p>
    <div class="flex border-t-4 border-darkBlue py-4"></div>
    <div class="filterSection flex flex-col items-center w-full max-w-8xl">
      <FilterSection immediateApply />
    </div>
  </div>

  <div class="mx-auto p-4 w-90% max-w-8xl mt-6 text-sm">
    <div class="w-full">
      <div class="flex items-center border-b border-gray-300 pb-2 mb-4">
        <div class="w-32 text-center mx-2 font-semibold text-gray-700 text-sm">정책 유형</div>
        <div class="flex-grow w-40 mx-4 text-left font-semibold text-gray-700 text-sm">정책 이름</div>
        <div class="w-64 text-right mx-12 font-semibold text-gray-700 text-sm">신청 기간</div>
      </div>
      <ul>
        <li v-if="paginatedPolicies.length === 0">
          <p class="text-center mt-10 mb-10 text-gray-600">검색한 결과가 없습니다</p>
        </li>
      </ul>
      <ul>
        <li
          v-for="(policy, index) in paginatedPolicies"
          :key="index"
          class="hover:bg-gray-100 cursor-pointer flex items-center space-x-4 border-b border-gray-200 px-4 py-2 text-sm"
          @click="
            $router.push({
              name: 'PolicyDetail',
              params: { idx: policy.idx },
            })
          "
        >
          <div class="w-24 bg-lightBlue text-white text-center font-medium px-2 py-1 rounded-md text-xs flex-shrink-0">
            {{ policy.type }}
          </div>

          <div class="flex-grow">
            <span class="policy-title text-sm font-semibold text-left">
              {{ policy.name }}
            </span>
          </div>

          <div class="w-64 text-right">
            <span class="text-gray-600 text-xs">
              {{ formatDate(policy.startDate) }} ~ {{ formatDate(policy.endDate) }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="flex justify-center mt-4 space-x-2">
    <button
      class="px-4 py-2 rounded-md border border-gray-300 text-darkBlue"
      :disabled="currentGroup.value === 1"
      @click="previousPageGroup"
    >
      이전
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="[ 
        'px-4 py-2 rounded-md',
        page === currentPage
          ? 'bg-darkBlue text-white'
          : 'border border-gray-300 text-darkBlue',
      ]"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      class="px-4 py-2 rounded-md border border-gray-300 text-darkBlue"
      :disabled="currentGroup.value * pageGroupSize >= totalPages.value"
      @click="nextPageGroup"
    >
      다음
    </button>
  </div>
</template>

<style scoped>
.filterSection {
  border: 2px solid var(--darkBlue);
}
</style>