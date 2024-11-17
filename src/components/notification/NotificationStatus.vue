<script setup>
import { ref, onMounted, computed } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const router = useRouter();

const notificationStatus = ref(false); 
const isModalOpen = ref(false);
const notifications = ref([]); 
const isLoading = ref(false); 

const unreadCount = computed(() =>
  notifications.value.filter((notification) => !notification.isRead).length
);

const recentNotifications = computed(() =>
  [...notifications.value].reverse().slice(0, 10)
);

// 초기 알림 상태 가져오기
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
    await notificationStore.toggleNotificationStatus(notificationStatus.value);
    console.log("알림 상태 변경 성공:", notificationStatus.value);
  } catch (error) {
    console.error("알림 상태 변경 중 오류:", error);
  }
};

// 알림 모달 열기
const openNotificationModal = async () => {

  if (isModalOpen.value) return;

  if (!authStore.isLoggedIn || !authStore.token) {
    console.error("로그인 상태가 유효하지 않습니다. 로그인을 다시 시도하세요.");
    router.push({ name: "login" });
    return;
  }

  isModalOpen.value = true;

  try {
    isLoading.value = true;
    await notificationStore.fetchPushNotifications();
    notifications.value = notificationStore.pushNotifications;
    console.log("알림 목록 불러오기 성공:", notifications.value);
  } catch (error) {
    console.error("알림 목록 로드 중 오류:", error);
  } finally {
    isLoading.value = false;
  }
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  notifications.value = [];
};

// 알림 읽음 처리 및 상세 페이지로 이동
const markAsReadAndNavigate = async (policyIdx, routePath) => {
  try {
    await notificationStore.markNotificationAsRead(policyIdx);
    router.push(routePath);
  } catch (error) {
    console.error("알림 읽음 처리 중 오류:", error);
  }
};

// 알림 모아보기 페이지로 이동
const goToNotificationSummary = () => {
  router.push("/notification/summary");
};

onMounted(() => {
  if (authStore.isLoggedIn && authStore.token) {
    fetchInitialNotificationStatus();
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
    <div
      class="notification-icon relative cursor-pointer"
      @click="openNotificationModal"
    >
      <span class="icon">🔔</span>
      <span
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
      >
        {{ unreadCount }}
      </span>
    </div>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Push 알림</h2>

        <!-- 로딩 상태 -->
        <p v-if="isLoading" class="text-center text-gray-500">로딩 중...</p>

        <!-- 알림 목록 -->
        <ul v-else-if="recentNotifications.length > 0">
          <li
            v-for="(notification, index) in recentNotifications"
            :key="index"
            class="mb-4 border-b pb-4"
          >
            <div
              class="cursor-pointer"
              @click="markAsReadAndNavigate(notification.policyIdx, `/policy/detail/${notification.policyIdx}`)"
            >
              <p>{{ notification.message }}</p>
              <small class="text-gray-500">{{ notification.applyEndDate || "날짜 정보 없음" }}</small>
            </div>
          </li>
        </ul>

        <p v-else class="text-center text-gray-500">표시할 Push 알림이 없습니다.</p>

        <!-- 버튼 -->
        <div class="flex justify-end mt-4">
          <button
            @click="goToNotificationSummary"
            class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            알림 모아보기
          </button>
          <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">
            닫기
          </button>
        </div>
      </div>
    </div>
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #0056b3;
}
</style>
