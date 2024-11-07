<script setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile";

const router = useRouter();
const auth = useAuthStore();
const profileStore = useProfileStore();

// const memberId = auth.member.memberId;
const memberId = ref(null);

const member = reactive({
  email: "",
  password: "",
  income: "",
  occupation: "",
  residence: "",
  maritalStatus: "",
  hasChildren: "",
  housingType: "",
});

const error = ref("");

// JWT 디코딩 함수
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
    console.log("디코딩된 토큰:", decodedToken);
    memberId.value = decodedToken.sub;
  }
};

const onSubmit = async () => {
  if (!confirm("수정하시겠습니까?")) return;

  try {
    Object.assign(profileStore.ProfileInfo, member);

    await profileStore.updateProfileInfo(memberId.value);
    alert("정보를 수정하였습니다.");
    router.go();
  } catch (e) {
    error.value =
      e.response?.data?.message || "회원 정보 수정 중 오류가 발생했습니다.";
  }
};

const fetchProfileInfo = async () => {
  await profileStore.getProfileInfo(memberId.value);
  const profileData = profileStore.ProfileInfo;
  member.email = profileData.email;
  member.income = profileData.income;
  member.occupation = profileData.occupation;
  member.residence = profileData.residence;
  member.maritalStatus = profileData.maritalStatus;
  member.hasChildren = profileData.hasChildren;
  member.housingType = profileData.housingType;
};

onMounted(async () => {
  getTokenInfo();
  // console.log(memberId);
  console.log(memberId.value);
  await fetchProfileInfo();
});
</script>

<template>
  <div class="flex justify-center items-center mt-5 mx-auto w-full">
    <div class="w-[500px]">
      <h1 class="my-3 text-center">마이 페이지</h1>

      <div class="flex items-center mb-6">
        <div class="w-2/5 text-end mr-10">이메일</div>
        <div class="w-3/5">
          <input
            v-model="member.email"
            type="email"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
          />
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-2/5 text-end mr-10">비밀번호</div>
        <div class="w-3/5">
          <input
            v-model="member.password"
            type="password"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
          />
        </div>
        <router-link
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md inline-block"
          to="/auth/changepassword"
        >
          비밀번호 변경
        </router-link>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-2/5 text-end mr-10">거주지</div>
        <div class="w-3/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.residence"
          >
            <option value="null" disabled>거주지 선택</option>
            <option value="서울">서울</option>
            <option value="경기도">경기도</option>
            <option value="강원도">강원도</option>
            <option value="충청도">충청도</option>
            <option value="전라도">전라도</option>
            <option value="경상도">경상도</option>
            <option value="제주도">제주도</option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-2/5 text-end mr-10">주거 형태</div>
        <div class="w-3/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
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
        <div class="w-2/5 text-end mr-10">직업</div>
        <div class="w-3/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
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
        <div class="w-2/5 text-end mr-10">결혼 여부</div>
        <div class="w-3/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
            v-model="member.maritalStatus"
          >
            <option value="null" disabled>결혼 여부 선택</option>
            <option value="1">O</option>
            <option value="0">X</option>
          </select>
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-2/5 text-end mr-10">소득</div>
        <div class="w-3/5">
          <input
            v-model="member.income"
            type="text"
            placeholder="소득을 입력해주세요."
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
          />
        </div>
      </div>

      <div class="flex items-center mb-6">
        <div class="w-2/5 text-end mr-10">자녀 유무</div>
        <div class="w-3/5">
          <select
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-full p-4"
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
          class="mt-4 mr-3 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          @click="onSubmit"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
