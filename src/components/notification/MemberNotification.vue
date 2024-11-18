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

const toggleLike = async () => {
  if (!authStore.isUserLoggedIn) {
    alert("로그인 후 이용 가능합니다.");
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
    isLiked.value = userNotifications.some(
      (notification) => notification.policyIdx === props.policyIdx
    );
  } catch (error) {
    console.error("알림 상태 로드 실패:", error);
  }
};

onMounted(fetchInitialLikeStatus);

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
</style>
