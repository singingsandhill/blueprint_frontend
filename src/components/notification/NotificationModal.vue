<script setup>
import { defineProps, defineEmits } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";

const props = defineProps({
  userNotifications: {
    type: Array,
    default: () => [],
  },
  upcomingDeadlineNotifications: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["close"]);

const notificationStore = useNotificationStore();

const deleteNotification = async (policyIdx) => {
  try {
    await notificationStore.deleteNotification(policyIdx);
    notificationStore.fetchUserNotifications();
  } catch (error) {
    console.error("알림 삭제 중 오류:", error);
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">알림 목록</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <!-- 사용자 설정 알림 리스트 -->
      <h4 class="text-lg font-semibold mb-2">내가 알림 요청한 항목</h4>
      <ul>
        <li
          v-for="notification in props.userNotifications"
          :key="notification.idx"
          class="mb-2 border-b pb-2 flex justify-between items-center"
        >
          <div>
            <p>{{ notification.alarmCategory }} - {{ notification.alarmType }}</p>
            <small class="text-gray-500">{{ notification.sendDate || '날짜 정보 없음' }}</small>
          </div>
          <button @click="deleteNotification(notification.idx)" class="text-red-500 hover:text-red-700 text-sm">
            삭제
          </button>
        </li>
      </ul>

      <!-- 신청 마감일 3일 전 알림 리스트 -->
      <h4 class="text-lg font-semibold mt-4 mb-2">마감일 3일 전 알림</h4>
      <ul>
        <li
          v-for="notification in props.upcomingDeadlineNotifications"
          :key="notification.idx"
          class="mb-2 border-b pb-2"
        >
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

<style scoped>
/* 필요에 따라 스타일 추가 가능 */
</style>
