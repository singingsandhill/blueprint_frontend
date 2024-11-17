import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notificationStatus: false, 
    userNotifications: [], 
    recommendedNotifications: [], 
    unreadNotificationsCount: 0, 
    pushNotifications: [],
  }),
  actions: {
    // 알림 상태 가져오기
    async fetchNotificationStatus() {
      try {
        const response = await axiosInstance.get(`/member/notification/status`);
        console.log("알림 상태 가져오기 성공:", response.data.response.data.notificationEnabled);
        this.notificationStatus = response.data.response.data.notificationEnabled;
        return response.data.response.data;
      } catch (error) {
        console.error("알림 상태 가져오는 중 오류 발생:", error.response?.data || error.message);
        throw error;
      }
    },

    // 알림 On/Off 상태 업데이트
    async toggleNotificationStatus(enabled) {
      try {
        const response = await axiosInstance.put(`/member/notification/status`, {
          notificationEnabled: enabled,
        });
        console.log("알림 상태 업데이트 성공:", response.data);
        this.notificationStatus = enabled;

        // 상태 변경 후 대시보드 데이터 갱신
        await this.fetchNotificationDashboard();
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
        console.log("추천된 알림 목록 가져오기 성공:", this.recommendedNotifications);
      } catch (error) {
        console.error("추천된 알림 목록 가져오는 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 대시보드 데이터 가져오기
    async fetchNotificationDashboard() {
      try {
        const response = await axiosInstance.get(`/member/notification/dashboard`);
        const { memberNotifications, recommendedNotifications } = response.data.response.data;

        this.userNotifications = memberNotifications;
        this.recommendedNotifications = recommendedNotifications;

        // 읽지 않은 알림 개수 계산
        const allNotifications = [...memberNotifications, ...recommendedNotifications];
        this.unreadNotificationsCount = allNotifications.filter((n) => !n.isRead).length;

        console.log("대시보드 데이터 가져오기 성공:", {
          userNotifications: this.userNotifications,
          recommendedNotifications: this.recommendedNotifications,
          unreadNotificationsCount: this.unreadNotificationsCount,
        });
      } catch (error) {
        console.error("대시보드 데이터 가져오는 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // Push 알림 가져오기
    async fetchPushNotifications() {
      try {
        const response = await axiosInstance.get(`/member/notification/push`);
        this.pushNotifications = response.data.response.data;
        console.log("Push 알림 가져오기 성공:", this.pushNotifications);
      } catch (error) {
        console.error("Push 알림 가져오는 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 사용자 알림 삭제
    async deleteNotification(policyIdx) {
      try {
        const response = await axiosInstance.delete(`/member/notification/${policyIdx}`);
        console.log("알림 삭제 성공:", response.data);

        // 삭제 후 대시보드 데이터 갱신
        await this.fetchNotificationDashboard();
      } catch (error) {
        console.error("알림 삭제 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 사용자 알림 추가 및 업데이트
    async updateNotification(policyIdx, notificationEnabled) {
      try {
        const response = await axiosInstance.put(`/member/notification/${policyIdx}`, {
          notificationEnabled,
        });
        console.log("알림 추가/수정 성공:", response.data);

        // 추가/수정 후 대시보드 데이터 갱신
        await this.fetchNotificationDashboard();
      } catch (error) {
        console.error("알림 추가/수정 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 특정 알림 읽음 처리
    async markNotificationAsRead(policyIdx) {
      try {
        const response = await axiosInstance.put(`/member/notification/read/${policyIdx}`);
        console.log("알림 읽음 처리 성공:", response.data);

        // 읽음 처리 후 대시보드 데이터 갱신
        await this.fetchNotificationDashboard();
      } catch (error) {
        console.error("알림 읽음 처리 중 오류 발생:", error.response?.data || error.message);
      }
    },
  },
});
