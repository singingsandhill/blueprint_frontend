<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axiosInstance from '@/util/axiosInstance';

const router = useRouter();
const auth = useAuthStore();
const member = reactive({
  memberId: "",
  password: "",
});
const error = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

const login = async () => {
  if (!member.memberId || !member.password) {
    error.value = "아이디와 비밀번호를 모두 입력해주세요.";
    return;
  }
  isLoading.value = true;
  try {
    const isValidMemberId = await auth.checkMemberId(member.memberId);
    if (isValidMemberId) {
      error.value = "존재하지 않는 아이디 입니다.";
      return;
    }

    const response = await auth.login(member.memberId, member.password);
    console.log('로그인 응답:', response); 
    
    if (response.success) {
    
      auth.token = auth.token;  
      auth.isAuthenticated = auth.isAuthenticated;

      auth.setMemberFromToken();
      
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
      
      router.push(auth.member.auth === "ROLE_ADMIN" ? "/admin" : "/");
    } else {
      error.value = response.error; 
    }
  } catch (err) {
    console.error('로그인 오류:', err.response ? err.response : err);
    error.value = "로그인 중 오류가 발생했습니다.";
  } finally {
    isLoading.value = false;
  }
};


const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[70vh] font-pretendard-regular bg-gray-100 p-4 sm:p-6">
    <form class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 rounded-lg shadow-md mx-auto" @submit.prevent="login">
      <div class="mb-4">
        <label for="memberId" class="block text-gray-700 text-sm font-bold mb-2">아이디</label>
        <div class="relative">
          <input
            type="text"
            v-model="member.memberId"
            id="memberId"
            class="w-full px-10 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="아이디를 입력해주세요."
            aria-label="아이디 입력"
            required
          />
          <font-awesome-icon icon="user" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="member.password"
            id="password"
            class="w-full px-10 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력해주세요."
            aria-label="비밀번호 입력"
            required
          />
          <font-awesome-icon icon="lock" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-4 text-gray-500 focus:outline-none"
          >
            <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
          </button>
        </div>
        <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 focus:outline-none"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="loader-spinner mr-2"></span> 로그인
      </button>

      <div class="text-blue-700 text-center mb-6 my-2">
        <router-link to="/member/find/memberId" class="text-sm hover:underline">아이디 찾기</router-link>
        <span class="mx-2 text-gray-400">|</span>
        <router-link to="/member/find/password" class="text-sm hover:underline">비밀번호 찾기</router-link>
      </div>

      <div class="text-blue-700 text-center mt-6">
        <p class="text-gray-500 my-2">아직 계정이 없나요?</p>
        <router-link to="/member/register" class="text-sm font-semibold hover:underline">회원가입</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
body {
  font-family: 'pretendard', sans-serif;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;
}
::placeholder {
  color: #999999;
  opacity: 1;
}

@media (max-width: 640px) {
  .p-6 {
    padding: 1.5rem;
  }
  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .w-full {
    width: 100%;
  }
  .text-center {
    text-align: center;
  }
  .absolute.left-3 {
    left: 1rem;
  }
  .bg-blue-600 {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
