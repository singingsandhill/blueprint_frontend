<script setup>
const props = defineProps({ memberName: String });
</script>

<template>
    <li class="px-3 py-2">
        <router-link 
            class="flex items-center text-white hover:text-gray-200 transition-colors duration-200" 
            to="/mypage"
        >
            <i class="fa-solid fa-user mr-2"></i>
            {{ memberName }}
        </router-link>
    </li>
</template>