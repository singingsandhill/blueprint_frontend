<script setup>
const props = defineProps({ memberName: String });
const avatar = `/member/${props.memberName}/avatar`;
</script>
<template>
    <li class="px-3 py-2">
        <router-link 
            class="flex items-center text-white hover:text-gray-200 transition-colors duration-200" 
            to="/member/profile"
        >
            <img 
                :src="avatar" 
                class="w-8 h-8 rounded-full mr-2" 
                alt="User avatar"
            />
            {{ memberName }}
        </router-link>
    </li>
</template>