<script setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useMyPageStore } from "@/stores/myPage";

const router = useRouter();
const auth = useAuthStore();
const myPageStore = useMyPageStore();

const memberId = ref(null);
const error = ref("");

const oldPassword = ref(null);
const newPassword = ref(null);
const checkNewPassword = ref(null);
const isStrongPassword = ref(false);
const passwordStrengthMessage = ref(
  "대소문자, 숫자, 특수문자를 모두 포함한 8글자 이상이어야 합니다."
);
const matchPasswordMessage = ref(null);
const isPasswordMatched = ref(false);

const member = reactive({
  email: "",
  income: "",
  occupation: "",
  region: null,
  district: null,
  local: null,
  maritalStatus: "",
  hasChildren: "",
  housingType: "",
});

const cities = ref(null);
const districts = ref(null);
const locals = ref(null);

// const regions = [
//   "서울",
//   "부산",
//   "대구",
//   "인천",
//   "광주",
//   "대전",
//   "울산",
//   "세종",
//   "경기",
//   "강원",
//   "충북",
//   "충남",
//   "전북",
//   "전남",
//   "경상북도",
//   "경남",
//   "제주",
// ];

function decodeJWT(token) {
  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  );
  return decodedPayload;
}

const getTokenInfo = () => {
  if (auth.token) {
    const decodedToken = decodeJWT(auth.token);
    memberId.value = decodedToken.sub;
  }
};

const verifyPassword = async () => {
  try {
    myPageStore.password = oldPassword;
    await myPageStore.verifyPassword();
    if (myPageStore.checkPassword) {
      alert("기존 비밀번호와 일치합니다.");
    } else {
      alert("기존 비밀번호와 일치하지 않습니다.");
    }
  } catch (e) {
    console.error("비밀번호 검증 중 에러 발생: ", e);
    alert("비밀번호 검증 중 문제가 발생했습니다. 다시 시도해 주세요.");
  }
};

const enhancedSecurityPassword = (newPassword) => {
  const minLength = 8;
  const specialChars = /[~!@#$%^&*]/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;

  return (
    newPassword.length >= minLength &&
    specialChars.test(newPassword) &&
    upperCase.test(newPassword) &&
    lowerCase.test(newPassword)
  );
};

const checkPasswordStrength = () => {
  isStrongPassword.value = enhancedSecurityPassword(newPassword.value);
  if (isStrongPassword.value) {
    passwordStrengthMessage.value = "비밀번호가 강합니다.";
  } else if (newPassword.value.length > 0) {
    passwordStrengthMessage.value = "비밀번호가 약합니다.";
  } else {
    passwordStrengthMessage.value =
      "대소문자, 숫자, 특수문자를 모두 포함한 8글자 이상이어야 합니다.";
  }
};

const matchPassword = () => {
  if (newPassword.value !== checkNewPassword.value) {
    matchPasswordMessage.value = "비밀번호가 일치하지 않습니다.";
    isPasswordMatched.value = false;
  } else {
    matchPasswordMessage.value = "비밀번호가 일치합니다.";
    isPasswordMatched.value = true;
  }
};

const onSubmit = async () => {
  if (!confirm("수정하시겠습니까?")) return;

  try {
    Object.assign(myPageStore.MyPageInfo, member);

    if (newPassword.value) {
      myPageStore.newPassword = newPassword.value;
      await myPageStore.updatePassword();
    }

    await myPageStore.updateMyPageInfo();
    alert("정보를 수정하였습니다.");
    router.go();
  } catch (e) {
    error.value =
      e.response?.data?.message || "회원 정보 수정 중 오류가 발생했습니다.";
  }
};

const fetchMyPageInfo = async () => {
  await myPageStore.getMyPageInfo();
  const myPageData = myPageStore.MyPageInfo;
  member.email = myPageData.email;
  member.income = myPageData.income;
  member.occupation = myPageData.occupation;
  member.region = myPageData.region;
  member.district = myPageData.district;
  member.local = myPageData.local;
  member.maritalStatus = myPageData.maritalStatus;
  member.hasChildren = myPageData.hasChildren;
  member.housingType = myPageData.housingType;
};

// const fetchCity = async () => {
//   await myPageStore.getCity();
//   console.log("Fetched cities:", myPageStore.cities);
//   cities.value = myPageStore.cities;

//   if (member.residence) {
//     await myPageStore.getDistrict(member.residence);
//     districts.value = myPageStore.districts;
//   }

//   if (member.district) {
//     myPageStore.selectedCity = member.city;
//     myPageStore.selectedDistrict = member.district;

//     await myPageStore.getLocal();
//     locals.value = myPageStore.locals;
//   }
// };

const fetchCity = async () => {
  await myPageStore.getCity();
  cities.value = myPageStore.cities;
};

watch(
  () => member.region,
  async (newResidence) => {
    if (newResidence) {
      await myPageStore.getDistrict(newResidence);
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

onMounted(async () => {
  getTokenInfo();
  await fetchMyPageInfo();
  await fetchCity();
});
</script>

<template>
  <div class="flex justify-center items-center mt-5 mx-auto w-full">
    <div class="w-[500px]">
      <h1 class="my-3 text-center">마이 페이지</h1>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">이메일</div>
        <div class="w-4/5">
          <input
            v-model="member.email"
            type="email"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            readOnly
          />
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">비밀번호</div>
        <div class="w-3/5">
          <input
            v-model="oldPassword"
            type="password"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
          />
        </div>
        <div class="w-1/5 text-center">
          <button
            type="submit"
            class="ml-3 px-4 py-2 bg-midBlue text-white text-sm rounded-md"
            @click="verifyPassword"
          >
            확인
          </button>
        </div>
      </div>

      <div v-if="myPageStore.checkPassword">
        <div class="flex items-center mb-6">
          <div class="w-1/5 text-end mr-10">새 비밀번호</div>
          <div class="w-4/5">
            <input
              v-model="newPassword"
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              @input="checkPasswordStrength"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            />
            <p
              :class="isStrongPassword ? 'text-green-500' : 'text-red-500'"
              class="text-sm mt-2"
            >
              {{ passwordStrengthMessage }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="passwordStrengthMessage === '비밀번호가 강합니다.'">
        <div class="flex items-center mb-6">
          <div class="w-1/5 text-end mr-10">새 비밀번호 확인</div>
          <div class="w-4/5">
            <input
              v-model="checkNewPassword"
              type="password"
              placeholder="새 비밀번호를 확인해주세요."
              @input="matchPassword"
              class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            />
            <p
              :class="isPasswordMatched ? 'text-green-500' : 'text-red-500'"
              class="text-sm mt-2"
            >
              {{ matchPasswordMessage }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">지역</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.region"
          >
            <option value="null" disabled>지역 선택</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">지역구</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.district"
          >
            <option value="null" disabled>지역구 선택</option>
            <option
              v-for="district in districts"
              :key="district"
              :value="district"
            >
              {{ district }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">동</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.local"
          >
            <option value="null" disabled>동 선택</option>
            <option v-for="local in locals" :key="local" :value="local">
              {{ local }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">주거 형태</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.housingType"
          >
            <option value="null" disabled>주거 형태 선택</option>
            <option value="아파트">아파트</option>
            <option value="오피스텔">오피스텔</option>
            <option value="연립 주택">연립 주택</option>
            <option value="단독 주택">단독 주택</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">직업</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.occupation"
          >
            <option value="null" disabled>직업 선택</option>
            <option value="직장인">직장인</option>
            <option value="사업가">사업가</option>
            <option value="프리랜서">프리랜서</option>
            <option value="취업 준비생">취업 준비생</option>
            <option value="학생">학생</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">결혼 여부</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.maritalStatus"
          >
            <option value="null" disabled>결혼 여부 선택</option>
            <option value="1">O</option>
            <option value="0">X</option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">소득</div>
        <div class="w-4/5">
          <input
            v-model="member.income"
            type="text"
            placeholder="소득을 입력해주세요."
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
          />
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-1/5 text-end mr-10">자녀 유무</div>
        <div class="w-4/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.hasChildren"
          >
            <option value="null" disabled>자녀 유무 선택</option>
            <option value="1">O</option>
            <option value="0">X</option>
          </select>
        </div>
      </div>

      <div v-if="error" class="text-red-600">{{ error }}</div>
      <div class="text-center">
        <button
          type="submit"
          class="mt-4 mr-3 px-10 py-2 bg-midBlue text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          @click="onSubmit"
        >
          저장
        </button>
      </div>
    </div>
  </div>
</template>
