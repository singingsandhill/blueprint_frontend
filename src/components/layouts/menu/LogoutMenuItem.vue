<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
}
</script>

<template>
  <li class="px-3 py-2" v-if="authStore.isLoggedIn">
    <router-link
      class="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
      to="/"
      @click.prevent="handleLogout"
    >
      로그아웃
    </router-link>
  </li>
</template>

<style scoped>

</style>
