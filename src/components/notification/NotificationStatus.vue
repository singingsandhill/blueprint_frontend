<script setup>
import { ref, onMounted, computed } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useAuthStore } from "@/stores/auth";
import NotificationModal from "@/components/notification/NotificationModal.vue";
import { useRoute, useRouter } from "vue-router";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const notificationStatus = ref(false); // 알림 설정 상태
const isModalOpen = ref(false);
const notifications = ref([]);

// 읽지 않은 알림 상태 확인
const unreadCount = computed(() =>
  notifications.value.filter((notification) => !notification.isRead).length
);

const fetchInitialNotificationStatus = async () => {
  try {
    const response = await notificationStore.fetchNotificationStatus();
    notificationStatus.value = response.notificationEnabled; 
    console.log("초기 알림 상태 가져오기 성공:", notificationStatus.value);
  } catch (error) {
    console.error(
      "초기 알림 상태 가져오는 중 오류 발생:",
      error.response?.data || error.message
    );
  }
};

// 알림 상태 변경 처리
const handleToggleChange = async () => {
  try {
    // 상태 변경 API 호출
    await notificationStore.toggleNotificationStatus(notificationStatus.value);
    console.log("알림 상태 변경 성공:", notificationStatus.value);
  } catch (error) {
    console.error("알림 상태 변경 중 오류:", error);
  }
};

// 모달 열기 및 알림 목록 불러오기
const openNotificationModal = async () => {
  if (!authStore.isLoggedIn || !authStore.token) {
    console.error("로그인 상태가 유효하지 않습니다. 로그인을 다시 시도하세요.");
    router.push({ name: "login" });
    return;
  }

  isModalOpen.value = true;

  try {
    // 대시보드 데이터 가져오기
    await notificationStore.fetchNotificationDashboard();
    notifications.value = [
      ...notificationStore.userNotifications,
      ...notificationStore.recommendedNotifications,
    ];
  } catch (error) {
    console.error("알림 대시보드 로드 중 오류:", error);
  }
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};

// 컴포넌트 로드 시 초기 알림 상태 가져오기
onMounted(() => {
  if (authStore.isLoggedIn && authStore.token) {
    fetchInitialNotificationStatus(); // 초기 상태 가져오기
  } else {
    console.error("로그인 상태가 유효하지 않습니다. 로그인을 다시 시도하세요.");
    router.push({ name: "login" });
  }
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <!-- 알림 설정 토글 -->
    <label for="notification-toggle" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          type="checkbox"
          id="notification-toggle"
          v-model="notificationStatus"
          class="hidden"
          @change="handleToggleChange"
        />
        <div
          class="toggle-bg w-10 h-5 bg-gray-300 rounded-full"
          :class="{ 'bg-green-500': notificationStatus, 'bg-gray-300': !notificationStatus }"
        ></div>
        <div
          :class="{
            'translate-x-5': notificationStatus,
            'translate-x-1': !notificationStatus,
          }"
          class="toggle-dot absolute w-4 h-4 bg-white rounded-full transition transform"
        ></div>
      </div>
      <span class="ml-3">알림 설정</span>
    </label>

    <!-- 알림 아이콘 -->
    <div class="notification-icon relative cursor-pointer" @click="openNotificationModal">
      <span class="icon">🔔</span>
      <span
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
      >
        {{ unreadCount }}
      </span>
    </div>

    <!-- 알림 목록 모달 -->
    <NotificationModal
      v-if="isModalOpen"
      @close="closeModal"
      :notifications="notifications"
    />
  </div>
</template>

<style scoped>
.toggle-bg {
  position: relative;
}

.toggle-dot {
  top: 1px;
  transition: all 0.3s ease;
}

.notification-icon .icon {
  font-size: 1.5rem;
}

.notification-icon .badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 0.8rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
