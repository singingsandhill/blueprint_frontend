import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notificationStatus: false, 
  }),
  actions: {
    async toggleNotification(policyIdx) {
      const authStore = useAuthStore();
      const uid = authStore.getUid(); 
      if (!uid || !policyIdx) {
        console.error("UID 또는 PolicyIdx가 설정되지 않았습니다.");
        return;
      }

      try {
        const response = await axiosInstance.put(
          `/member/notification/${uid}/${policyIdx}`,
          {
            notificationEnabled: this.notificationStatus,
          }
        );
        console.log("알림 상태 업데이트 성공:", response.data);
      } catch (error) {
        console.error(
          "알림 설정 업데이트 중 오류 발생:",
          error.response?.data || error.message
        );
      }
    },
  },
});
