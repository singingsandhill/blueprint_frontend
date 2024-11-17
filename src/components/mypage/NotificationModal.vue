<!-- NotificationModal.vue -->
<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">알림 목록</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <ul>
          <li v-for="notification in notifications" :key="notification.idx" class="mb-2 border-b pb-2">
            <p>{{ notification.alarmCategory }} - {{ notification.alarmType }}</p>
            <small class="text-gray-500">{{ notification.sendDate || '날짜 정보 없음' }}</small>
          </li>
        </ul>
        <div class="flex justify-end mt-4">
          <button @click="$emit('close')" class="bg-blue-500 text-white px-4 py-2 rounded">닫기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  const props = defineProps({
    notifications: {
      type: Array,
      default: () => [],
    },
  });
  </script>
  
  <style scoped>
  /* 모달 스타일 */
  </style>
  