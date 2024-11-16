<script setup>
import { ref, onMounted } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useAuthStore } from "@/stores/auth"; 
import NotificationModal from "@/components/notification/NotificationModal.vue";
import { useRoute, useRouter } from "vue-router"; 

const notificationStore = useNotificationStore();
const authStore = useAuthStore(); 
const route = useRoute();
const router = useRouter();

const policyIdx = ref(null);
const notificationStatus = ref(false);
const isModalOpen = ref(false);
const notifications = ref([]);
const hasUnreadNotifications = ref(false);

// 모달 열기 및 알림 목록 불러오기
const openNotificationModal = async () => {
  if (!authStore.isLoggedIn || !authStore.token) {
    console.error("로그인 상태가 유효하지 않습니다. 로그인을 다시 시도하세요.");
    router.push({ name: "login" });
    return;
  }

  isModalOpen.value = true;

  try {
    await notificationStore.fetchNotificationDashboard();
    notifications.value = [
      ...notificationStore.userNotifications,
      ...notificationStore.recommendedNotifications,
    ];
    checkForUnreadNotifications();
  } catch (error) {
    console.error("알림 대시보드 로드 중 오류:", error);
  }
};

// 알림 설정 상태 변경 처리
const handleToggleChange = async () => {
  try {
    await notificationStore.toggleNotificationStatus(notificationStatus.value);
    console.log("알림 상태 변경 성공:", notificationStatus.value);
  } catch (error) {
    console.error("알림 상태 변경 중 오류:", error);
  }
};

// 알림 읽음 상태 처리
const markNotificationsAsRead = () => {
  hasUnreadNotifications.value = false;
};

// 알림 읽지 않은 항목이 있는지 확인
const checkForUnreadNotifications = () => {
  hasUnreadNotifications.value = notifications.value.some((notification) => !notification.isRead);
};


onMounted(() => {
  if (authStore.isLoggedIn && authStore.token) {
    console.log("로그인 상태 확인:", authStore.member);
    policyIdx.value = route.params.policyIdx || null;
    notificationStatus.value = notificationStore.notificationStatus;
  } else {
    console.error("로그인 상태가 유효하지 않습니다. 로그인을 다시 시도하세요.");
    router.push({ name: "login" });
  }
});

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <span class="font-semibold cursor-pointer relative" @click="openNotificationModal">
      알림 설정
      <span
        v-if="hasUnreadNotifications"
        class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
      ></span>
    </span>

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
    </label>

    <!-- 알림 목록 모달 -->
    <NotificationModal
      v-if="isModalOpen"
      @close="closeModal"
      :notifications="notifications"
      @markRead="markNotificationsAsRead"
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

span.relative {
  position: relative;
}
</style>
