import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notificationStatus: false, // 전체 알림 On/Off 상태
    userNotifications: [], // 사용자가 직접 설정한 알림
    recommendedNotifications: [], // 추천된 알림
    recommendedPolicies: [], // 실시간 추천 정책
  }),
  actions: {
    // 알림 On/Off 상태 업데이트
    async toggleNotificationStatus(enabled) {
      try {
        const response = await axiosInstance.put(`/member/notification/status`, {
          notificationEnabled: enabled,
        });
        console.log("알림 상태 업데이트 성공:", response.data);
        this.notificationStatus = enabled;
      } catch (error) {
        console.error("알림 상태 업데이트 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 사용자 설정 알림 가져오기
    async fetchUserNotifications() {
      try {
        const response = await axiosInstance.get(`/member/notification/list/member`);
        this.userNotifications = response.data.response.data;
        console.log("사용자 설정 알림 목록 가져오기 성공:", this.userNotifications);
      } catch (error) {
        console.error("사용자 설정 알림 목록 가져오는 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 추천된 알림 가져오기
    async fetchRecommendedNotifications() {
      try {
        const response = await axiosInstance.get(`/member/notification/list/recommended`);
        this.recommendedNotifications = response.data.response.data;
        console.log("추천 알림 목록 가져오기 성공:", this.recommendedNotifications);
      } catch (error) {
        console.error("추천 알림 목록 가져오는 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 대시보드 데이터 가져오기
    async fetchNotificationDashboard() {
      try {
        const response = await axiosInstance.get(`/member/notification/dashboard`);
        const { memberNotifications, recommendedNotifications, recommendedPolicies } =
          response.data.response.data;

        this.userNotifications = memberNotifications;
        this.recommendedNotifications = recommendedNotifications;
        this.recommendedPolicies = recommendedPolicies;

        console.log("대시보드 데이터 가져오기 성공:", {
          userNotifications: this.userNotifications,
          recommendedNotifications: this.recommendedNotifications,
          recommendedPolicies: this.recommendedPolicies,
        });
      } catch (error) {
        console.error("대시보드 데이터 가져오는 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 사용자 알림 삭제
    async deleteNotification(policyIdx) {
      try {
        const response = await axiosInstance.delete(`/member/notification/${policyIdx}`);
        console.log("알림 삭제 성공:", response.data);
        // 삭제 후 사용자 알림 목록 갱신
        this.fetchUserNotifications();
      } catch (error) {
        console.error("알림 삭제 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 사용자 알림 추가 및 업데이트
    async updateNotification(policyIdx, notificationEnabled, applyEndDate) {
      try {
        const response = await axiosInstance.put(`/member/notification/${policyIdx}`, {
          notificationEnabled,
          applyEndDate,
        });
        console.log("알림 추가/수정 성공:", response.data);
        // 추가/수정 후 사용자 알림 목록 갱신
        this.fetchUserNotifications();
      } catch (error) {
        console.error("알림 추가/수정 중 오류 발생:", error.response?.data || error.message);
      }
    },
  },
});
