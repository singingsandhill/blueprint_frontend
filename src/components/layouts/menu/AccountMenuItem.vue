<script setup>
const props = defineProps({ username: String });
const avatar = `/api/member/${props.username}/avatar`;
</script>
<template>
    <li class="px-3 py-2">
        <router-link 
            class="flex items-center text-white hover:text-gray-200 transition-colors duration-200" 
            to="/auth/profile"
        >
            <img 
                :src="avatar" 
                class="w-8 h-8 rounded-full mr-2" 
                alt="User avatar"
            />
            {{ username }}
        </router-link>
    </li>
</template>