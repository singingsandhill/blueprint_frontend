<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useMyPageStore } from "@/stores/myPage";
import { useFinanceStore } from "@/stores/finance";

const myPageStore = useMyPageStore();
const financeStore = useFinanceStore();
const filterSavings = ref([]);
const filterLoan = ref([]);

const cities = ref(null);
const districts = ref(null);
const locals = ref(null);

const member = reactive({
  occupation: null,
  region: null,
  district: null,
  local: null,
  maritalStatus: null,
  hasChildren: null,
  housingType: null,
});

const MyPageInfo = computed(() => myPageStore.MyPageInfo);
const hasValuesInMyPageInfo = computed(() =>
  Object.entries(MyPageInfo.value)
    .filter(([key]) => key !== "email")
    .filter(([key]) => key !== "password")
    .some(([, value]) => value !== null)
);

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = async () => {
  Object.assign(myPageStore.MyPageInfo, member);
  await myPageStore.updateMyPageInfo();
  showModal.value = false;
};

const fetchCity = async () => {
  await myPageStore.getCity();
  cities.value = myPageStore.cities;
};

watch(
  () => member.region,
  async (newRegion) => {
    if (newRegion) {
      await myPageStore.getDistrict(newRegion);
      districts.value = myPageStore.districts;
    }
  }
);

watch(
  () => member.district,
  async (newDistrict) => {
    if (newDistrict && member.region) {
      myPageStore.selectedCity = member.region;
      myPageStore.selectedDistrict = newDistrict;
      await myPageStore.getLocal();
      locals.value = myPageStore.locals;
    }
  }
);

const fetchSavings = async () => {
  await financeStore.getSavings();
  filterSavings.value = financeStore.SavingsList;
};

const fetchLoan = async () => {
  await financeStore.getLoan();
  filterLoan.value = financeStore.LoanList;
};

onMounted(async () => {
  await fetchSavings();
  await fetchLoan();
  await myPageStore.getMyPageInfo();
  await fetchCity();
});
</script>

<template>
  <div
    v-if="hasValuesInMyPageInfo"
    class="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-xl font-bold mb-4">정책</h1>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-xl font-bold mb-4">청약</h1>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-xl font-bold mb-4">추천 금융 상품_예금</p>
      <p class="text-lg font-semibold mb-2">
        은행명: {{ filterSavings.korCoNm }}
      </p>
      <p class="text-gray-600 mb-1">예금명: {{ filterSavings.finPrdtNm }}</p>
      <p class="text-gray-600 mb-1">가입 방법: {{ filterSavings.joinWay }}</p>
      <p class="text-gray-600 mb-1">
        가입 가능 대상: {{ filterSavings.joinMember }}
      </p>
      <p class="text-gray-600 mb-1">
        이자 방식: {{ filterSavings.intrRateNm }}
      </p>
      <p class="text-gray-600 mb-1">저축 기간: {{ filterSavings.saveTrm }}</p>
      <p class="text-gray-600 mb-1">기본 금리: {{ filterSavings.intrRate }}</p>
      <p class="text-gray-600 font-bold">
        최대 금리: {{ filterSavings.intrRate2 }}
      </p>

      <p class="text-xl font-bold mb-4 mt-4">추천 금융 상품_대출</p>
      <p class="text-lg font-semibold mb-2">
        상품 이름 : {{ filterLoan.korCoNm }}
      </p>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <p class="text-xl font-bold mb-4">부동산</p>
    </div>
  </div>
  <div v-else>
    <p class="text-4xl text-center text-border">
      등록된 추가 정보가 없어서 맞춤형 정보를 제공해드리기 어려워요.
    </p>
    <p class="text-4xl text-center text-border">
      추가 정보를 등록하시겠습니까?
      <span @click="openModal" class="cursor-pointer text-blue-500 underline">
        네
      </span>
    </p>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
      <p class="text-2xl font-bold mb-4">추가 정보 등록</p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold ">지역</span>
        <select class="w-4/5 py-2" v-model="member.region">
          <option value="null" disabled>지역 선택</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold">지역구</span>
        <select class="w-4/5 py-2" v-model="member.district">
          <option value="null" disabled>지역구 선택</option>
          <option
            v-for="district in districts"
            :key="district"
            :value="district"
          >
            {{ district }}
          </option>
        </select>
      </p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold">읍/면/동</span>
        <select class="w-4/5 py-2" v-model="member.local">
          <option value="null" disabled>동 선택</option>
          <option v-for="local in locals" :key="local" :value="local">
            {{ local }}
          </option>
        </select>
      </p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold">주거 형태</span>
        <select class="w-4/5 py-2" v-model="member.housingType">
          <option value="null" disabled>주거 형태 선택</option>
          <option value="아파트">아파트</option>
          <option value="오피스텔">오피스텔</option>
          <option value="연립 주택">연립 주택</option>
          <option value="단독 주택">단독 주택</option>
          <option value="기타">기타</option>
        </select>
      </p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold">직업</span>
        <select class="w-4/5 py-2" v-model="member.occupation">
          <option value="null" disabled>직업 선택</option>
          <option value="직장인">직장인</option>
          <option value="사업가">사업가</option>
          <option value="프리랜서">프리랜서</option>
          <option value="취업 준비생">취업 준비생</option>
          <option value="학생">학생</option>
          <option value="기타">기타</option>
        </select>
      </p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold">결혼 여부</span>
        <select class="w-4/5 py-2" v-model="member.maritalStatus">
          <option value="null" disabled>결혼 여부 선택</option>
          <option value="1">O</option>
          <option value="0">X</option>
        </select>
      </p>

      <p class="flex items-center mb-4">
        <span class="w-1/5 text-xl font-semibold">자녀 유무</span>
        <select class="w-4/5 py-2" v-model="member.hasChildren">
          <option value="null" disabled>자녀 유무 선택</option>
          <option value="1">O</option>
          <option value="0">X</option>
        </select>
      </p>

      <div class="flex justify-center mt-6">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-darkBlue text-white rounded"
        >
          저장
        </button>
      </div>
    </div>
  </div>
</template>
