<script setup>
import blueprintLogo from '@/assets/BluePrint_logo_B_transparent.png';
</script>

<template>
    <div class="mt-8 flex flex-col items-center">
        <router-link to="/">
            <img 
                :src="blueprintLogo" 
                alt="BluePrint Logo" 
                class="w-32 sm:w-48 md:w-64 lg:w-80 mb-4" 
            />
        </router-link>
    </div>
</template>

<style scoped>
.bg-header {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>
