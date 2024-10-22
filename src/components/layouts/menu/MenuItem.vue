<script setup>
const props = defineProps({
    menu: { Type: Object, required: true },
});
</script>
<template>
    <li class="px-3 py-2">
        <router-link 
            class="flex items-center text-white hover:text-gray-200 transition-colors duration-200" 
            :to="menu.url"
        >
            <i :class="[menu.icon, 'mr-2']"></i>
            {{ menu.title }}
        </router-link>
    </li>
</template>