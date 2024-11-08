<script setup>
import { computed } from "vue";
import MenuItem from "./MenuItem.vue";
import AccountMenuItem from "./AccountMenuItem.vue";
import LogoutMenuItem from "./LogoutMenuItem.vue";
import config from "@/config";
import { useAuthStore } from "@/stores/auth.js";

const auth = useAuthStore();
const { login, register } = config.accountMenus;

const isLogin = computed(() => auth.isLoggedIn);
const memberName = computed(() => auth.getMemberName);
</script>

<template>
  <ul class="flex flex-col md:flex-row ml-auto">
    <template v-if="isLogin">
      <AccountMenuItem :memberName="memberName" />
      <LogoutMenuItem />
    </template>
    <template v-else>
      <MenuItem :menu="login" />
      <MenuItem :menu="register" />
    </template>
  </ul>
</template>

<style scoped>
</style>
