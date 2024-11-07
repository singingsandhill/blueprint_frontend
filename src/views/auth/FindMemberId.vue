<script>
import axios from '@/util/axiosInstance';

export default {
  data() {
    return {
      memberName: '',
      email: '',
      message: '',
    };
  },
  methods: {
    async findMemberId() {
      try {
        const response = await axios.post('/member/find/memberId', {
          memberName: this.memberName,
          email: this.email,
        });
        this.message = `회원님의 아이디는: <strong class="text-indigo-600">${response.data.response.data}</strong> 입니다`;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message;
        } else {
          this.message = '아이디 찾기 요청 중 오류가 발생했습니다.';
        }
      }
    },
  },
};
</script>

<template>
    <div class="flex flex-col justify-center items-center bg-gray-100 p-4">
      <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-center mb-4">아이디 찾기</h2>
        <form @submit.prevent="findMemberId">
          <div class="mb-4">
            <label for="memberName" class="block text-sm font-medium text-gray-700">이름</label>
            <input
              v-model="memberName"
              type="text"
              id="memberName"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
  
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
  
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            아이디 찾기
          </button>
        </form>
  
        <div v-if="message" class="mt-4 text-center text-sm text-gray-600" v-html="message"></div>
  
        <div v-if="message" class="mt-2 text-center">
          <router-link to="/member/find/password" class="text-sm hover:underline">비밀번호 찾기</router-link>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
</style>
  