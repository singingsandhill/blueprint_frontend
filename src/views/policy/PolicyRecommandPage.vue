<script setup>
import { usePolicyStore } from "@/stores/policy.js";
import { ref, onMounted } from "vue";

const policyStore = usePolicyStore();
const policyList = ref([]);
const isModalOpen = ref(false);

const fetchPolicyList = async () => {
  await policyStore.getPolicyInfo();
};

const openPolicyDetailModal = async (idx) => {
  await policyStore.getPolicyDetail(idx);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(async () => {
  await fetchPolicyList();
  policyList.value = policyStore.PolicyInfoList;
});
</script>

<template>
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
