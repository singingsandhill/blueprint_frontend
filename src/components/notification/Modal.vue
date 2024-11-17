<script setup>
import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useRouter } from "vue-router";

const notificationStore = useNotificationStore();
const router = useRouter();

// 모달 닫기 이벤트
const emits = defineEmits(["close"]);

const isLoading = ref(false); // 로딩 상태

// 알림 읽음 처리 및 상세 페이지로 이동
const markAsReadAndNavigate = async (policyIdx, routePath) => {
  try {
    await notificationStore.markNotificationAsRead(policyIdx);
    await notificationStore.fetchNotificationDashboard();
    router.push(routePath);
  } catch (error) {
    console.error("알림 읽음 처리 중 오류:", error);
  }
};

// 알림 삭제
const deleteNotification = async (policyIdx) => {
  const confirmDelete = confirm("정말로 이 알림을 삭제하시겠습니까?");
  if (!confirmDelete) return;

  try {
    await notificationStore.deleteNotification(policyIdx);
    await notificationStore.fetchNotificationDashboard();
  } catch (error) {
    console.error("알림 삭제 중 오류:", error);
  }
};

// push 알림 표시용 텍스트 생성
const getPushNotificationMessage = (sendDate) => {
  const today = new Date();
  const sendDateObj = new Date(sendDate);

  const diffInDays = Math.ceil((sendDateObj - today) / (1000 * 60 * 60 * 24));
  if (diffInDays === 3) {
    return "마감 3일 전 이메일 발송됨";
  } else if (diffInDays === 1) {
    return "마감 하루 전입니다";
  }
  return null;
};

// 알림 데이터 로드
const fetchNotifications = async () => {
  try {
    isLoading.value = true;
    await notificationStore.fetchNotificationDashboard();
  } catch (error) {
    console.error("알림 데이터 가져오는 중 오류:", error);
  } finally {
    isLoading.value = false;
  }
};

// 모달 열기
const openModal = async () => {
  isModalOpen.value = true;
  await fetchNotifications();
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <!-- 모달 헤더 -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">알림 목록</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <!-- 로딩 상태 -->
      <div v-if="isLoading" class="text-center text-gray-500">로딩 중...</div>

      <!-- 알림 목록 -->
      <ul v-else-if="notificationStore.userNotifications.length || notificationStore.recommendedNotifications.length">
        <li
          v-for="notification in notificationStore.userNotifications.concat(notificationStore.recommendedNotifications)"
          :key="notification.policyIdx"
          class="mb-4 border-b pb-4 flex justify-between items-center"
          :class="{ 'font-bold': !notification.isRead }"
        >
          <div @click="markAsReadAndNavigate(notification.policyIdx, `/policy/detail/${notification.policyIdx}`)" class="cursor-pointer">
            <p class="text-base">{{ notification.policyName }}</p>
            <small class="text-gray-500">{{ notification.applyEndDate || "날짜 정보 없음" }}</small>
          </div>
          <div class="flex items-center space-x-4">
            <span v-if="getPushNotificationMessage(notification.applyEndDate)" class="text-xs text-blue-500">
              {{ getPushNotificationMessage(notification.applyEndDate) }}
            </span>
            <button
              @click="deleteNotification(notification.policyIdx)"
              class="text-red-500 hover:text-red-700 text-sm"
            >
              삭제
            </button>
          </div>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500">표시할 알림이 없습니다.</p>

      <!-- 모아보기 버튼 -->
      <div class="flex justify-end mt-4">
        <button
          @click="router.push('/notification/summary')"
          class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          알림 모아보기
        </button>
        <button @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded">닫기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 읽지 않은 알림 스타일 */
.font-bold {
  font-weight: bold;
}
</style>
