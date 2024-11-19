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
  "일자리 (창업)",
  "일자리 (취업)",
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
  district.value =
    localStorage.getItem("district") === "" ||
    localStorage.getItem("district") === "null"
      ? null
      : localStorage.getItem("district");
  selectedPolicyType.value =
    localStorage.getItem("selectedPolicyType") === "" ||
    localStorage.getItem("selectedPolicyType") === "null"
      ? null
      : localStorage.getItem("selectedPolicyType");
  selectedAge.value =
    localStorage.getItem("selectedAge") === "" ||
    localStorage.getItem("selectedAge") === "null"
      ? null
      : localStorage.getItem("selectedAge");
  selectedJob.value =
    localStorage.getItem("selectedJob") === "" ||
    localStorage.getItem("selectedJob") === "null"
      ? null
      : localStorage.getItem("selectedJob");
  selectedName.value =
    localStorage.getItem("selectedName") === "" ||
    localStorage.getItem("selectedName") === "null"
      ? null
      : localStorage.getItem("selectedName");

  if (props.immediateApply) {
    applyFilters();
  }
});
</script>

<template>
  <section
    class="text-white p-4 border-4 border-darkBlue rounded-lg mt-6 flex flex-wrap lg:flex-nowrap mx-auto items-center gap-2 lg:gap-4 justify-center overflow-x-auto whitespace-nowrap max-w-screen-xl"
  >
    <!-- 정책 검색 -->
    <div
      class="flex items-center space-x-2 bg-darkBlue text-white px-4 py-3 rounded-lg w-auto"
    >
      <strong class="text-sm">정책 검색</strong>
    </div>

    <!-- 시/도 필터 -->
    <div
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border-2 border-darkBlue rounded-md w-full lg:w-80"
    >
      <select
        v-model="selectedCity"
        class="bg-transparent w-full focus:outline-none text-sm md:text-sm"
      >
      <option
      value="null"
      class="text-center font-bold bg-gray-200"
      :class="{ 'font-bold': selectedJob === 'null' }"
    >시 / 도</option>
        <option v-for="city in cities" :key="city" :value="city" class="text-center">
          {{ city }}
        </option>
      </select>
    </div>

    <!-- 지역구 필터 -->
    <div
      class="flex items-center space-x-2 bg-white text-black px-2 py-3 border-2 border-darkBlue rounded-md w-full lg:w-80"
    >
      <input
        v-model="district"
        id="district"
        type="text"
        placeholder="시 / 군 / 구"
        class="bg-transparent w-full text-center focus:outline-none text-sm md:text-sm"
      />
    </div>

    <!-- 직업 필터 -->
<div
  class="flex items-center space-x-2 bg-white text-black px-4 py-3 border-2 border-darkBlue rounded-md w-full lg:w-80"
>
  <select
    v-model="selectedJob"
    class="bg-transparent w-full text-center focus:outline-none text-sm md:text-sm"
  >
    <option
      value="null"
      class="text-center font-bold bg-gray-200"
      :class="{ 'font-bold': selectedJob === 'null' }"
    >
      직업
    </option>
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


    <!-- 나이 필터 -->
    <div
      class="flex items-center space-x-2 bg-white text-black px-2 py-3 border-2 border-darkBlue rounded-md w-full lg:w-80"
    >
      <input
        v-model="selectedAge"
        id="selectedAge"
        type="text"
        placeholder="나이"
        class="bg-transparent w-full text-center focus:outline-none text-sm md:text-sm"
      />
    </div>

    <!-- 정책 유형 필터 -->
    <div
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border-2 border-darkBlue rounded-md w-full lg:w-80"
    >
      <select
        v-model="selectedPolicyType"
        class="bg-transparent w-full focus:outline-none text-sm md:text-sm"
      >
      <option
      value="null"
      class="text-center font-bold bg-gray-200"
      :class="{ 'font-bold': selectedJob === 'null' }"
    > 정책 유형
        </option>
        <option v-for="type in policyTypes" :key="type" :value="type" class="text-center">
          {{ type }}
        </option>
      </select>
    </div>

    <!-- 정책명 입력 -->
    <div
      class="flex items-center space-x-2 bg-white text-black px-4 py-3 border-2 border-darkBlue rounded-md w-full lg:w-80"
    >
      <input
        v-model="selectedName"
        id="selectedName"
        type="text"
        placeholder="정책명"
        class="bg-transparent text-center w-full focus:outline-none text-sm md:text-sm"
      />
    </div>

    <!-- 검색 버튼 -->
    <button
      @click="applyFilters"
      class="bg-darkBlue px-4 py-3 rounded-lg w-full lg:w-auto flex items-center justify-center text-sm md:text-sm"
    >
      <span class="ml-1">검색</span>
    </button>
  </section>
</template>

<style scoped>
section {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center;
  padding: 0.5rem
}

.flex {
  gap: 12px;
}

select {
  position: relative;
  appearance: none; 
  background: transparent;
  outline: none;
  cursor: pointer;
}

select:focus {
  outline: none; 
}

option {
  position: relative;
  z-index: 10;
  text-indent: 10px;
  padding: 5px;
}

select::-ms-expand {
  display: none;
}

select {
  box-shadow: none;
  text-indent: 0.01px;
  text-overflow: '';
  z-index: 5;
}

@media (min-width: 1024px) {
  section {
    flex-wrap: nowrap; 
  }
}

@media (max-width: 768px) {
  section {
    padding: 1rem;
  }

  .flex {
    flex-direction: column; 
    align-items: center;
    gap: 16px;
  }

  .flex > div,
  .flex > button {
    width: 100%; 
    max-width: none;
  }

  .flex > div input,
  .flex > div select {
    font-size: 1rem;
  }
}
</style>



