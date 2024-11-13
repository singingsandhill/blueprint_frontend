<!-- <script setup>
import { onMounted, ref } from "vue";
import { usePolicyStore } from "@/stores/policy.js";
import { useRoute } from "vue-router";

const route = useRoute();
const policyStore = usePolicyStore();
const policyDetail = ref({});
const policyListInfo = ref({});

onMounted(async () => {
  const idx = route.params.idx;
  await policyStore.getPolicyDetail(idx);
  await policyStore.getPolicyFilter();
  policyListInfo.value = policyStore.PolicyInfoList;
  policyDetail.value = policyStore.PolicyDetail;
});
</script>

<template>
  <div class="container mx-auto p-4">
    <p class="text-2xl font-bold mb-4 text-[32px]">정책 상세 정보</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">대상</p>
    <p>{{ policyDetail.subject }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">조건</p>
    <p>{{ policyDetail.condition }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">상세 내용</p>
    <p>{{ policyDetail.content }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">지원 규모</p>
    <p>{{ policyDetail.scale }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">문의처</p>
    <p>{{ policyDetail.enquiry }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">지원 방법</p>
    <p>{{ policyDetail.way }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">서류</p>
    <p>{{ policyDetail.document }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <p class="text-2xl font-bold mb-4 text-[22px]">URL</p>
    <p>{{ policyDetail.url }}</p>
    <div
      class="w-full h-1 bg-gradient-to-r from-lightBlue to-darkBlue my-4"
    ></div>

    <button
      @click="$router.back()"
      class="mt-6 bg-darkBlue text-white px-6 py-2 rounded-lg"
    >
      돌아가기
    </button>
  </div>
</template> -->
