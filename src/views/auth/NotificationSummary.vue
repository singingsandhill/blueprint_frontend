<script setup>
import { ref, computed, onMounted } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { usePolicyStore } from "@/stores/policy";
import { useRouter } from "vue-router";


const router = useRouter(); 
const selectedTab = ref("dashboard");
const notificationStore = useNotificationStore();
const policyStore = usePolicyStore(); 

const page = ref(0); 
const size = ref(10); 
const totalPages = ref(0); 
const isLastPage = computed(() => page.value >= totalPages.value - 1);
const isLoading = ref(false);

const displayedPages = computed(() => {
  const visiblePageCount = 5;
  const current = page.value;
  const half = Math.floor(visiblePageCount / 2);
  let start = current - half;
  let end = current + half;

  if (start < 0) {
    start = 0;
    end = Math.min(visiblePageCount - 1, totalPages.value - 1);
  }
  if (end >= totalPages.value) {
    end = totalPages.value - 1;
    start = Math.max(0, end - visiblePageCount + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const currentTabNotifications = computed(() => {
  let allNotifications = [];

  if (selectedTab.value === "dashboard") {
    allNotifications = [
      ...notificationStore.userNotifications,
      ...notificationStore.recommendedNotifications,
    ];
  } else if (selectedTab.value === "user") {
    allNotifications = notificationStore.userNotifications;
  } else if (selectedTab.value === "recommended") {
    allNotifications = notificationStore.recommendedNotifications;
  }

allNotifications.sort((a, b) => {
  const today = new Date();
  const aDate = a.applyEndDate === "상시" ? null : new Date(a.applyEndDate);
  const bDate = b.applyEndDate === "상시" ? null : new Date(b.applyEndDate);

  if (aDate && aDate < today && (!bDate || bDate >= today)) return 1;
  if (bDate && bDate < today && (!aDate || aDate >= today)) return -1;

  if (a.applyEndDate === "상시" && b.applyEndDate !== "상시") return 1;
  if (b.applyEndDate === "상시" && a.applyEndDate !== "상시") return -1;

  if (aDate && bDate) return bDate - aDate;

  return 0;
});

  totalPages.value = Math.ceil(allNotifications.length / size.value);

  const startIndex = page.value * size.value;
  const endIndex = startIndex + size.value;
  return allNotifications.slice(startIndex, endIndex);
});

const selectTab = (tab) => {
  selectedTab.value = tab;
  page.value = 0; 
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
  }
};

const nextPage = () => {
  if (!isLastPage.value) {
    page.value++;
  }
};

const goToPage = (newPage) => {
  page.value = newPage;
};

const handlePolicyClick = async (policyIdx) => {
  try {
    if (!policyIdx) {
      console.error("Invalid policyIdx:", policyIdx);
      return;
    }
    console.log("Fetching Policy Detail for idx:", policyIdx);

    await policyStore.getPolicyDetail(policyIdx);

    router.push({
      path: `/policy/detail/${policyIdx}`,
      query: { isLiked: true },
    });
  } catch (error) {
    console.error("Error while fetching policy detail:", error);
  }
};

const deleteNotification = async (policyIdx) => {
  const confirmDelete = confirm("정말로 삭제하시겠습니까?");
  if (!confirmDelete) return;
  try {
    await notificationStore.deleteNotification(policyIdx);
    console.log(`정책 ${policyIdx} 삭제 완료`);
  } catch (error) {
    console.error("정책 삭제 중 오류 발생:", error);
  }
};

onMounted(async () => {
  await notificationStore.fetchNotificationDashboard();
});
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-[20px]">알림 모아보기</h2>
  <div class="flex border-t-4 border-darkBlue py-4"></div>
  <div class="notification-container mx-auto p-4 max-w-screen-lg">
    <!-- Tabs -->
    <nav class="tabs flex space-x-4 mb-4">
      <button
        class="tab-button"
        :class="{ active: selectedTab === 'dashboard' }"
        @click="selectTab('dashboard')"
      >
        전체 목록
      </button>
      <button
        class="tab-button"
        :class="{ active: selectedTab === 'user' }"
        @click="selectTab('user')"
      >
        설정 알림
      </button>
      <button
        class="tab-button"
        :class="{ active: selectedTab === 'recommended' }"
        @click="selectTab('recommended')"
      >
        추천 알림
      </button>
    </nav>

    <!-- Notification List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              알림 이름
            </th>
            <th class="px-5 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              마감일
            </th>
            <th class="px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="notification in currentTabNotifications"
            :key="notification.policyIdx"
            class="hover:bg-gray-50"
            @click="notification.policyIdx 
              ? handlePolicyClick(notification.policyIdx)
              : console.error('Invalid policyIdx:', notification)"
          >
            <td class="px-5 py-4 text-sm font-medium text-gray-900">
              {{ notification.policyName }}
            </td>
            <td class="px-5 py-4 text-sm text-gray-500">
              {{ notification.applyEndDate === "상시" ? "상시" : notification.applyEndDate }}
            </td>
            <td class="px-5 py-4 text-center text-sm">
              <div class="delete-wrapper flex items-center justify-end">
              <button
                class="text-red-500 hover:text-red-700"
                @click.stop="deleteNotification(notification.policyIdx)"
              >
                삭제
              </button>
            </div>
            </td>
          </tr>
          <tr v-if="currentTabNotifications.length === 0">
            <td colspan="3" class="text-center py-6 text-sm text-gray-500">
              알림이 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 space-x-2">
      <button class="pagination-button" @click="prevPage" :disabled="page === 0">
        이전
      </button>
      <button
        v-for="p in displayedPages"
        :key="p"
        @click="goToPage(p)"
        :class="{ 'pagination-button active': page === p, 'pagination-button': true }"
      >
        {{ p + 1 }}
      </button>
      <button class="pagination-button" @click="nextPage" :disabled="isLastPage">
        다음
      </button>
    </div>
  </div>
</template>

<style scoped>
.notification-container {
  max-width: 90%;
  margin: 0 auto;
}

.tabs {
  border-bottom: 1px solid #e5e5e5;
}

.tab-button {
  padding: 0.5rem 1rem;
  font-size: 0.9em;
  color: #333;
  border: none;
  background: transparent;
  cursor: pointer;
}

.tab-button.active {
  font-weight: bold;
  color: #0056b3;
  border-bottom: 2px solid #0056b3;
}

.pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.pagination-button:hover {
  background-color: #f5f5f5;
}

.pagination-button:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

.pagination-button.active {
  background-color: #0d223d;
  color: white;
  border-color: #0d223d;
}
</style>
