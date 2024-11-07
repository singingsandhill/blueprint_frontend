<!-- <script setup>
import { onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeMemberFromToken();
  authStore.fetchMyPage();
});
</script>

<template>
  <li class="px-3 py-2">
    <router-link
      v-if="authStore.isLoggedIn"
      class="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
      to="/member/mypage"
    >
      <i class="fa-solid fa-user mr-2"></i>
      {{ authStore.member?.memberName }}
    </router-link>
  </li>
</template>

<style scoped>
</style> -->
