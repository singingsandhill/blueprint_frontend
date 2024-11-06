<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>

<template>
  <li class="px-3 py-2">
    <router-link
      class="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
      to="/member/mypage"
    >
      <i class="fa-solid fa-user mr-2"></i>
      {{ authStore.member?.memberName }}
    </router-link>
  </li>
</template>
