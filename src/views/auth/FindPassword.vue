<script>
import axios from '@/util/axiosInstance';

export default {
  data() {
    return {
      memberId: '',
      email: '',
      message: '',
    };
  },
  methods: {
    async findPassword() {
      try {
        const response = await axios.post('member/find/password', {
          memberId: this.memberId,
          email: this.email,
        });
        this.message = `<strong class="text-green-600">임시 비밀번호가 이메일로 발송되었습니다.</strong>`;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = `<span class="text-red-600">${error.response.data.message}</span>`;
        } else {
          this.message = '<span class="text-red-600">비밀번호 찾기 요청 중 오류가 발생했습니다.</span>';
        }
      }
    },
  },
};
</script>

<template>
    <div class="flex flex-col items-center justify-center h-[70vh] font-pretendard-regular p-4 sm:p-6">
        <h2 class="text-2xl font-semibold text-center mb-4">비밀번호 찾기</h2>
        <form 
        class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 rounded-lg shadow-lg mx-auto"
        @submit.prevent="findPassword"
        >
          <div class="mb-6">
            <label for="memberId" class="block text-gray-700 font-semibold mb-2">아이디</label>
            <input
              v-model="memberId"
              type="text"
              id="memberId"
              class="w-full px-10 py-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
  
          <div class="mb-6">
            <label for="email" class="block text-gray-700 font-semibold mb-2">이메일</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full px-10 py-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
  
          <button
            type="submit"
            class="w-full bg-[#002842] text-white font-semibold py-3 mt-5 rounded hover:bg-[#0E429D] focus:outline-none"
          >
            비밀번호 찾기
          </button>
        </form>
  
        <div v-if="message" class="mt-4 text-center text-sm text-gray-600" v-html="message"></div>
  
        <div class="mt-4 text-center">
          <router-link to="/member/find/memberId" class="text-sm hover:underline">아이디 찾기</router-link>
        </div>
      </div>
  </template>
  

  
<style scoped>

</style>
  