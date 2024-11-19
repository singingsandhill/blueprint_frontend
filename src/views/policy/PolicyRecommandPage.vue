<script setup>
import FilterSection from "@/components/home/FilterSection.vue";
import { useRoute } from "vue-router";
import { usePolicyStore } from "@/stores/policy.js";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const route = useRoute();
const policyStore = usePolicyStore();
const policyList = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10;
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
    return "예산 소진시까지";
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
  }

  window.removeEventListener("filters-applied", updatePolicyList);
});
</script>

<template>
  <FilterSection immediateApply />
  <div class="mx-auto p-4 w-full max-w-8xl">
    <p class="text-2xl font-bold mb-4 text-[32px]">정책 정보</p>
    <div class="flex border-t-4 border-darkBlue py-4"></div>

    <ul>
      <li v-if="paginatedPolicies.length === 0">
        <p class="text-center text-gray-500">검색한 결과가 없습니다.</p>
      </li>

      <li
        v-else
        v-for="(policy, index) in paginatedPolicies"
        :key="index"
        class="hover:bg-gray-100 cursor-pointer flex items-center space-x-10 border-t border-gray-200 p-2"
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
            {{ formatDate(policy.applyStartDate) }}
          </span>
          <span> ~ </span>
          <span class="text-gray-600 text-sm">
            {{ formatDate(policy.applyEndDate) }}
          </span>
        </div>
      </li>
    </ul>

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
  </div>
</template>
