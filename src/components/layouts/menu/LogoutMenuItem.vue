<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const store = useAuthStore();
const router = useRouter();
const logout = (e) => {
    store.logout();
    router.push("/");
};
</script>
<template>
    <a 
        href="#" 
        class="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors duration-200" 
        @click.prevent="logout"
    >
        <i class="fa-solid fa-right-from-bracket mr-2"></i>
        로그아웃
    </a>
</template>