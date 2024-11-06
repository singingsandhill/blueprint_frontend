<script setup>
import MenuItem from "./MenuItem.vue";
const props = defineProps({
    menus: { Type: Array, required: true },
});
</script>
<template>
    <ul class="flex flex-col md:flex-row md:ml-auto">
        <MenuItem 
            v-for="menu in menus" 
            :key="menu.title" 
            :menu="menu" 
            class="md:mr-4"/>
    </ul>
</template>