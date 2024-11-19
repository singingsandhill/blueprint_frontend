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

        await this.fetchNotificationDashboard();
      } catch (error) {
        console.error("알림 상태 업데이트 중 오류 발생:", error.response?.data || error.message);
      }
    },

    // 사용자 설정 알림 가져오기
    async fetchUserNotifications() {
      try {
        const response = await axiosInstance.get("/member/notification/list/member");
        this.userNotifications = response.data.response.data;
        this.error = null;
        console.log("사용자 설정 알림 목록 가져오기 성공:", this.userNotifications);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("사용자 설정 알림 목록 가져오는 중 오류 발생: 비로그인 사용자");
          this.error = "로그인이 필요합니다.";
          this.userNotifications = [];
        } else {
          console.error("사용자 설정 알림 목록 가져오는 중 오류 발생:", error.response?.data || error.message);
          this.error = error.response?.data?.message || error.message;
        }
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

    // 알림 읽음 처리
    async markNotificationAsRead(policyIdx) {
      try {
        const response = await axiosInstance.put(`/member/notification/read/${policyIdx}`);
        console.log(`알림 읽음 처리 성공: ${response.data.response}`);
    
        this.pushNotifications = this.pushNotifications.map((notification) =>
          notification.policyIdx === policyIdx
            ? { ...notification, isRead: true }
            : notification
        );
    
        // 읽지 않은 알림 개수 업데이트
        this.unreadNotificationsCount = this.pushNotifications.filter(
          (notification) => !notification.isRead
        ).length;
      } catch (error) {
        console.error("알림 읽음 처리 중 오류 발생:", error.response?.data || error.message);
        throw error; 
      }
    },
    
    // 사용자 알림 삭제
    async deleteNotification(policyIdx) {
      try {
        const response = await axiosInstance.delete(`/member/notification/${policyIdx}`);
        console.log("알림 삭제 성공:", response.data);

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

        await this.fetchNotificationDashboard();
      } catch (error) {
        console.error("알림 추가/수정 중 오류 발생:", error.response?.data || error.message);
      }
    },
  },
});
