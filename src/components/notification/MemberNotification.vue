<script setup>
import { ref, onMounted, watch } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  policyIdx: {
    type: Number,
    required: true,
  },
});

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const isLiked = ref(false);
const isLoading = ref(false);
const notificationStatus = ref(false); 
const showAlertMessage = ref(false); 

const toggleLike = async () => {
  if (!authStore.isUserLoggedIn) {
    alert("로그인 후 이용 가능합니다.");
    return;
  }

  if (!notificationStatus.value) {
    showAlertMessage.value = true;
    return;
  }

  isLoading.value = true;
  try {
    if (isLiked.value) {
      await notificationStore.deleteNotification(props.policyIdx);
      alert("알림이 해제되었습니다.");
    } else {
      await notificationStore.updateNotification(props.policyIdx, true);
      alert("알림이 설정되었습니다.");
    }
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error("알림 상태 변경 실패:", error);
    alert("알림 상태 변경에 실패하였습니다.");
  } finally {
    isLoading.value = false;
  }
};

const fetchInitialLikeStatus = async () => {
  if (!authStore.isUserLoggedIn) {
    console.warn("비로그인 사용자: 알림 상태를 확인하지 않습니다.");
    return;
  }

  try {
    await notificationStore.fetchUserNotifications();

    const userNotifications = notificationStore.userNotifications;

    const matchingNotifications = userNotifications.filter(
      (notification) =>
        Number(notification.policyIdx) === Number(props.policyIdx)
    );

    isLiked.value = matchingNotifications.some(
      (notification) => Number(notification.notification_enabled) === 1
    );

  } catch (error) {
    console.error("알림 상태 로드 실패:", error);
  }
};

const fetchNotificationStatus = async () => {
  try {
    const response = await notificationStore.fetchNotificationStatus();
    notificationStatus.value = response.notificationEnabled; 
  } catch (error) {
    console.error("알림 상태 가져오는 중 오류 발생:", error);
  }
};

const closeAlert = () => {
  showAlertMessage.value = false;
};

onMounted(async () => {
  await fetchNotificationStatus(); 
  await fetchInitialLikeStatus();
});

watch(() => props.policyIdx, fetchInitialLikeStatus);
</script>

<template>
  <div class="member-notification">
    <button
      @click="toggleLike"
      :class="{ liked: isLiked }"
      :disabled="isLoading"
    >
      <span v-if="isLiked">❤️</span>
      <span v-else>🤍</span>
    </button>

    <!-- 팝업 -->
    <div
      v-if="showAlertMessage"
      class="alert-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="popup-content bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <button
          class="close-button absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          @click="closeAlert"
        >
          ✕
        </button>
        <p class="text-gray-700 text-sm">
            <strong>현재 알림 설정이 꺼져 있습니다.</strong><br /><br />
            마이페이지에서 "알림 설정"을 ON으로 변경하시면 
            <br>이 기능을 이용하실 수 있습니다. 😊<br /><br />
            
            <strong>변경 방법</strong><br />
            1. 상단 메뉴에서 "마이페이지"로 이동하세요.<br />
            2. "알림 설정" 스위치를 ON으로 전환하세요.<br />
            3. 설정 후 이 페이지로 돌아오시면 하트 버튼을 사용할 수 있습니다!<br /><br />
            
            <br />
            <strong>알림 설정을 활성화하면 이런 혜택을 누릴 수 있습니다! 🎉<br /></strong><br />
                1. <b>맞춤형 추천 알림 서비스</b> <br />
                - 사용자 맞춤형 정책 및 프로그램을 추천해드립니다.<br />
                - 새로운 기회와 혜택을 누구보다 먼저 확인하세요!<br /><br />
                2. <b>찜한 정책의 중요한 알림 제공</b> <br />
                - 하트를 누른 정책은 마감 3일 전에 미리 이메일로 알려드립니다.<br />
                - 마감 하루 전에는 추가 알림을 보내드려 중요한 기회를 놓치지 않도록 도와드립니다.<br /><br />
                3. <b>효율적인 정책 관리</b> <br />
                - 찜한 정책과 추천받은 정책을 한눈에 확인할 수 있어, <br> 
                관심 있는 정책을 손쉽게 관리할 수 있습니다.<br /><br />
                <b>알림 설정은 정책 관리의 시작입니다. 지금 활성화하고 더 많은 혜택을 누려보세요! 😊</b>
            </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
.member-notification {
  display: inline-block;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
}

button.liked {
  color: red;
}

button:not(.liked) {
  color: gray;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.alert-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

.popup-content {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-button {
  position: absolute;
  top: 0.4rem;
  right: 0.7rem;
  background: none;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
  color: #000000;
}

.close-button:hover {
  color: #000;
}

.text-gray-700 {
  color: #4a5568;
}
</style>
