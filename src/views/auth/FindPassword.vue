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
    <div class="flex flex-col justify-center items-center bg-gray-100 p-4">
      <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-center mb-4">비밀번호 찾기</h2>
        <form @submit.prevent="findPassword">
          <div class="mb-4">
            <label for="memberId" class="block text-sm font-medium text-gray-700">아이디</label>
            <input
              v-model="memberId"
              type="text"
              id="memberId"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="아이디를 입력하세요"
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
            비밀번호 찾기
          </button>
        </form>
  
        <div v-if="message" class="mt-4 text-center text-sm text-gray-600" v-html="message"></div>
      </div>
    </div>
</template>
  

  
<style scoped>

</style>
  