<script setup>
import { useNotificationStore } from "@/stores/useNotificationStore";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const notificationStore = useNotificationStore();
const route = useRoute();
const policyIdx = ref(null);

onMounted(() => {
  policyIdx.value = route.params.policyIdx || null; 
});

const handleToggleChange = async () => {
  if (policyIdx.value) {
    await notificationStore.toggleNotification(policyIdx.value);
  } else {
    console.error("PolicyIdx가 설정되지 않았습니다.");
  }
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <span class="font-semibold">알림 설정</span>
    <label for="notification-toggle" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          type="checkbox"
          id="notification-toggle"
          v-model="notificationStore.notificationStatus"
          class="hidden"
          @change="handleToggleChange"
        />
        <div class="toggle-bg w-10 h-5 bg-gray-300 rounded-full"></div>
        <div
          :class="{ 'translate-x-4': notificationStore.notificationStatus }"
          class="toggle-dot absolute w-4 h-4 bg-white rounded-full transition transform"
        ></div>
      </div>
    </label>
  </div>
</template>

<style scoped>
.toggle-bg {
  position: relative;
}

.toggle-dot {
  top: 1px;
  left: 1px;
  transition: all 0.3s ease;
}

input:checked + .toggle-bg .toggle-dot {
  transform: translateX(100%);
  background-color: #002842;
}

input:checked + .toggle-bg {
  background-color: #002842;
}
</style>
