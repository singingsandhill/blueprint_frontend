<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

console.log("컴포넌트에서 authStore.member: ", authStore.member);
</script>

<template>
  <li class="px-3 py-2">
    <router-link
      class="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
      to="/member/mypage"
    >
      {{ authStore.isLoggedIn && authStore.member ? authStore.member.memberName : '로그인' }}
    </router-link>
  </li>
</template>
