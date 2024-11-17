<script setup>
import { usePolicyStore } from "@/stores/policy.js";
import { useMyPageStore } from "@/stores/myPage";
import { ref, onMounted } from "vue";

const policyStore = usePolicyStore();
const myPageStore = useMyPageStore();

const selectedCity = ref(null);
const district = ref(null);
const selectedPolicyType = ref(null);
const selectedAge = ref(null);
const selectedJob = ref(null);
const selectedName = ref(null);

const cities = ref(null);

const props = defineProps({
  immediateApply: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["filterApplied"]);

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

const fetchCity = async () => {
  await myPageStore.getCity();
  cities.value = myPageStore.cities;
};

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

  const filterEvent = new CustomEvent("filters-applied");
  window.dispatchEvent(filterEvent);

  emit("filterApplied", {
    city: selectedCity.value,
    district: district.value,
    type: selectedPolicyType.value,
    age: selectedAge.value,
    job: selectedJob.value,
    name: selectedName.value,
  });
};

onMounted(() => {
  fetchCity();

  selectedCity.value = localStorage.getItem("selectedCity") || null;
  district.value = localStorage.getItem("district") || "";
  selectedPolicyType.value = localStorage.getItem("selectedPolicyType") || null;
  selectedAge.value = localStorage.getItem("selectedAge") || "";
  selectedJob.value = localStorage.getItem("selectedJob") || null;
  selectedName.value = localStorage.getItem("selectedName") || "";

  if (props.immediateApply) {
    applyFilters();
  }
});
</script>

<template>
  <section
    class="text-white p-4 rounded-lg mt-6 flex mx-auto flex-row items-center gap-2 justify-start overflow-x-auto whitespace-nowrap"
  >
    <div
      class="flex items-center space-x-2 bg-darkBlue text-white px-4 py-3 rounded-lg w-auto"
    >
      <strong class="text-base">정책 검색</strong>
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border border-gray-300 rounded-md w-auto"
    >
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
      class="flex items-center space-x-2 bg-white text-black px-2 py-3 border border-gray-300 rounded-md w-auto"
    >
      <input
        v-model="district"
        id="district"
        type="text"
        placeholder="지역구를 입력해 주세요."
        class="bg-transparent w-full focus:outline-none"
      />
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border border-gray-300 rounded-md w-auto"
    >
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

    <div
      class="flex items-center space-x-2 bg-white text-black px-2 py-3 border border-gray-300 rounded-md w-auto"
    >
      <input
        v-model="selectedAge"
        id="selectedAge"
        type="text"
        placeholder="나이를 입력해 주세요."
        class="bg-transparent w-full focus:outline-none"
      />
    </div>

    <div
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border border-gray-300 rounded-md w-auto"
    >
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
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border border-gray-300 rounded-md w-auto"
    >
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
      class="bg-darkBlue px-4 py-3 rounded-lg w-full md:w-auto flex items-center justify-center"
    >
      <span class="ml-1">검색</span>
    </button>
  </section>
</template>
