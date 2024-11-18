<script setup>
import { usePolicyStore } from "@/stores/policy";
import { useRouter } from "vue-router";

const router = useRouter();
const policyStore = usePolicyStore();

const filterType = async (type) => {
  policyStore.filterCondition.type = type;
  localStorage.setItem("selectedPolicyType", type);
  await policyStore.getPolicyFilter();
  router.push("/policy");
};
</script>

<template>
  <div class="flex justify-center items-center mt-10 mb-8">
    <div
      :class="{
        'grid grid-cols-2 gap-4 sm:grid-cols-5': true,
        'lg:flex lg:space-x-12': true,
      }"
    >
      <span>
        <button
          @click="filterType('일자리 (창업)')"
          class="text-darkBlue font-bold"
        >
          <img
            src="@/assets/policyType/job1.png"
            class="w-16 h-16 object-contain"
          />
          일자리 (창업)
        </button>
      </span>
      <span>
        <button
          @click="filterType('일자리 (취업)')"
          class="text-darkBlue font-bold"
        >
          <img
            src="@/assets/policyType/job2.png"
            class="w-16 h-16 object-contain"
          />
          일자리 (취업)
        </button>
      </span>
      <span>
        <button @click="filterType('건강')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/health.png"
            class="w-16 h-16 object-contain"
          />
          건강
        </button>
      </span>
      <span>
        <button @click="filterType('교육')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/education.png"
            class="w-16 h-16 object-contain"
          />
          교육
        </button>
      </span>
      <span>
        <button @click="filterType('금융')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/finance.png"
            class="w-16 h-16 object-contain"
          />금융
        </button>
      </span>
      <span>
        <button @click="filterType('문화')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/culture.png"
            class="w-16 h-16 object-contain"
          />문화
        </button>
      </span>
      <span>
        <button @click="filterType('복지')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/welfare.png"
            class="w-16 h-16 object-contain"
          />복지
        </button>
      </span>
      <span>
        <button
          @click="filterType('주거비 지원')"
          class="text-darkBlue font-bold"
        >
          <img
            src="@/assets/policyType/residence.png"
            class="w-16 h-16 object-contain"
          />주거비 지원
        </button>
      </span>
      <span>
        <button @click="filterType('주택공급')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/housing.png"
            class="w-16 h-16 object-contain"
          />주택공급
        </button>
      </span>
      <span>
        <button @click="filterType('참여')" class="text-darkBlue font-bold">
          <img
            src="@/assets/policyType/participation.png"
            class="w-16 h-16 object-contain"
          />참여
        </button>
      </span>
    </div>
  </div>
</template>
