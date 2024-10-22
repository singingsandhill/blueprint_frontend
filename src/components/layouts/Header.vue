<script setup>
import config from "@/config";
</script>

<template>
    <div class="mt-8">  <!-- 상단 여백 추가 -->
        <h1 class="text-blue-600 text-4xl font-bold mb-4">{{ config.title }}</h1>
        <p class="text-blue-600 text-xl mb-6">{{ config.subtitle }}</p>
        <!-- <div class="bg-blue-600 text-white p-8">
        </div> -->
    </div>
</template>

<style scoped>
.bg-header {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>