<script>
  import { ref, computed, onMounted } from "vue";
  import { useNotificationStore } from "@/stores/notificationStore";
  
  export default {
    setup() {
      const notificationStore = useNotificationStore();
      const activeTab = ref("dashboard");
      const notifications = computed(() => {
        if (activeTab.value === "dashboard") {
          return [
            ...notificationStore.userNotifications,
            ...notificationStore.recommendedNotifications,
          ];
        } else if (activeTab.value === "user") {
          return notificationStore.userNotifications;
        } else if (activeTab.value === "recommended") {
          return notificationStore.recommendedNotifications;
        }
        return [];
      });
  
      const setActiveTab = (tab) => {
        activeTab.value = tab;
      };
  
      const deleteNotification = async (policyIdx) => {
        const confirmDelete = confirm("정말로 이 알림을 삭제하시겠습니까?");
        if (!confirmDelete) return;
  
        try {
          await notificationStore.deleteNotification(policyIdx);
          console.log("알림 삭제 성공");
        } catch (error) {
          console.error("알림 삭제 중 오류 발생:", error);
        }
      };
  
      onMounted(async () => {
        await notificationStore.fetchNotificationDashboard();
      });
  
      return {
        activeTab,
        notifications,
        setActiveTab,
        deleteNotification,
      };
    },
  };
  </script>

<template>
    <div class="notification-summary">
      <!-- 타이틀 -->
      <header class="title-container flex justify-center sm:justify-between items-center py-4">
        <h2 class="text-lg font-bold text-center">알림 모아보기</h2>
        <nav class="tabs flex space-x-4 text-sm">
          <button
            class="tab-button"
            :class="{ 'active-tab': activeTab === 'dashboard' }"
            @click="setActiveTab('dashboard')"
          >
            전체 목록
          </button>
          <button
            class="tab-button"
            :class="{ 'active-tab': activeTab === 'user' }"
            @click="setActiveTab('user')"
          >
            설정 알림
          </button>
          <button
            class="tab-button"
            :class="{ 'active-tab': activeTab === 'recommended' }"
            @click="setActiveTab('recommended')"
          >
            추천 알림
          </button>
        </nav>
      </header>
  
      <!-- 알림 목록 -->
      <div class="notification-list py-6 px-4">
        <ul v-if="notifications.length">
          <li
            v-for="notification in notifications"
            :key="notification.policyIdx"
            class="notification-item flex items-center border-b pb-4 mb-4"
          >
            <!-- 정책 이름 및 날짜 -->
            <div class="notification-details flex-1 flex justify-between items-center pr-4">
              <p class="policy-name text-lg font-semibold">{{ notification.policyName }}</p>
              <p class="apply-date text-sm text-gray-500">{{ notification.applyEndDate }}</p>
            </div>
  
            <!-- 삭제 버튼 -->
            <button
              class="delete-button text-red-500 hover:text-red-700 text-sm"
              @click="deleteNotification(notification.policyIdx)"
            >
              삭제
            </button>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">표시할 알림이 없습니다.</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .notification-summary {
    max-width: 1200px; 
    margin: 0 auto;
  }
  
  .title-container {
    border-bottom: 1px solid #e5e5e5;
  }
  
  .tabs .tab-button {
    padding: 8px 16px;
    border: none;
    background: none;
    cursor: pointer;
    color: #555;
  }
  
  .tabs .tab-button.active-tab {
    color: #007bff;
    border-bottom: 2px solid #007bff;
    font-weight: bold;
  }
  
  .notification-list {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 16px;
  }
  
  .notification-item {
    display: flex;
    align-items: center; 
  }
  
  .notification-details {
    flex: 1; 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .policy-name {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .apply-date {
    color: #888;
    font-size: 0.875rem;
  }
  
  .delete-button {
    font-size: 0.875rem;
    cursor: pointer;
    margin-left: 1rem; 
  }
  
  @media (max-width: 768px) {
    .notification-details {
      flex-direction: column; 
      align-items: flex-start;
    }
  }
  </style>
  