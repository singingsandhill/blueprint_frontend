<script setup>
import FilterSection from "@/components/home/FilterSection.vue";
import { usePolicyStore } from "@/stores/policy.js";
import { ref, onMounted, onBeforeUnmount } from "vue";

const policyStore = usePolicyStore();
const policyList = ref([]);

// const pageGroup = ref(0);
// const currentPage = ref(1);
// const itemsPerPage = 10;

// const totalPages = computed(() =>
//   Math.ceil(policyList.value.length / itemsPerPage)
// );

// const visiblePages = computed(() => {
//   const start = pageGroup.value * 5 + 1;
//   const end = Math.min(start + 4, totalPages.value);
//   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
// });

// const changePage = (page) => {
//   if (page > 0 && page <= totalPages.value) {
//     currentPage.value = page;
//     localStorage.setItem("page", page);
//   }
// };

// const nextPageGroup = () => {
//   if (pageGroup.value < Math.floor(totalPages.value / 5)) {
//     pageGroup.value++;
//     currentPage.value = pageGroup.value * 5 + 1;
//   }
// };

// const previousPageGroup = () => {
//   if (pageGroup.value > 0) {
//     pageGroup.value--;
//     currentPage.value = pageGroup.value * 5 + 1;
//   }
// };

// const paginatedPolicies = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   console.log(
//     "Slicing from",
//     start,
//     "to",
//     end,
//     "in list of length",
//     policyList.value.length
//   );

//   return policyList.value.slice(start, end);
// });

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const updatePolicyList = () => {
  policyList.value = policyStore.PolicyInfoList || [];
};

onMounted(() => {
  window.addEventListener("filters-applied", updatePolicyList);
});

onBeforeUnmount(() => {
  window.removeEventListener("filters-applied", updatePolicyList);
});
</script>

<template>
  <FilterSection />
  <div class="mx-auto p-4 w-full max-w-8xl">
    <p class="text-2xl font-bold mb-4 text-[32px]">정책 정보</p>
    <div class="flex border-t-4 border-darkBlue py-4"></div>

    <ul>
      <li v-if="policyList.length === 0">
        <p class="text-center text-gray-500">검색한 결과가 없습니다.</p>
      </li>

      <li
        v-else
        v-for="(policy, index) in policyList"
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
            {{ formatDate(policy.startDate) }}
          </span>
          <span> ~ </span>
          <span class="text-gray-600 text-sm">
            {{ formatDate(policy.startDate) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
