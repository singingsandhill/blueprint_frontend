<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { usePolicyStore } from '@/stores/policy';

const today = new Date();
const policyStore = usePolicyStore();
const router = useRouter();
const policies = ref([]);
const currentIndex = ref(0);
const itemsPerPage = ref(4);

const updateItemsPerPage = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 640) {
    itemsPerPage.value = 1;
  } else if (screenWidth < 1024) {
    itemsPerPage.value = 2;
  } else {
    itemsPerPage.value = 4; 
  }
};

onMounted(async () => {
  updateItemsPerPage(); 
  window.addEventListener('resize', updateItemsPerPage); 

  try {
    await policyStore.getPolicyInfo();
    const allPolicies = policyStore.PolicyInfoList.map(policy => {
      const status = getStatus(policy.apply_start_date, policy.apply_end_date);
      return { ...policy, status };
    });

    const recruitingPolicies = allPolicies
      .filter(policy => policy.status === '모집중')
      .sort((a, b) => new Date(a.apply_end_date) - new Date(b.apply_end_date));

    if (recruitingPolicies.length > 0) {
      policies.value = recruitingPolicies.slice(0, 10);
    } else {
      const onGoingPolicies = allPolicies.filter(policy => policy.status === '상시').sort((a, b) => a.idx - b.idx);
      policies.value = onGoingPolicies.slice(0, 10);
    }
  } catch (error) {
    console.error('Error fetching policy data:', error);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateItemsPerPage); 
});

const getStatus = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return '상시';
  }

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && today < start) {
    return '상시';
  }

  if (start && end) {
    if (today >= start && today <= end) {
      return '모집중';
    } else if (today > end) {
      return '완료';
    }
  }

  return '상시';
};

const goToDetails = (idx) => {
  router.push(`/policy/detail/${idx}`);
};

const slideNext = () => {
  if (currentIndex.value < policies.value.length - itemsPerPage.value) {
    currentIndex.value += 1;
  }
};

const slidePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};
</script>

<template>
  <section class="mt-8 relative">
    <h2 class="text-2xl font-bold mb-8 text-center">정책 정보</h2>
    <div class="flex items-center">
      <button 
        @click="slidePrev" 
        class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300"
        :disabled="currentIndex === 0"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="flex overflow-hidden w-full mx-4 space-x-4">
        <div 
          v-for="(policy, index) in policies.slice(currentIndex, currentIndex + itemsPerPage)" 
          :key="policy.idx" 
          @click="goToDetails(policy.idx)"
          class="card cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-300"
          :class="{ 'w-full': itemsPerPage === 1, 'w-1/2': itemsPerPage === 2, 'w-1/4': itemsPerPage === 4 }"
        >
          <div class="text-center">
            <span 
              :class="{
                'bg-[#0E429D] text-white px-2 py-1 rounded': policy.status === '모집중',
                'bg-[#C1D5F9] text-white px-2 py-1 rounded': policy.status === '상시',
                'bg-gray-400 text-white px-2 py-1 rounded': policy.status === '완료'
              }"
              class="badge inline-block text-sm font-semibold mb-2"
            >
              {{ policy.status }}
            </span>
          </div>
          <h2 class="title text-lg font-bold mb-2 text-center">{{ policy.name }}</h2>
          <div class="description text-sm text-gray-500 text-center">{{ policy.city ? policy.city + ', ' : '' }}{{ policy.district }}</div>
        </div>
      </div>

      <button 
        @click="slideNext" 
        class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300"
        :disabled="currentIndex >= policies.length - itemsPerPage.value"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div class="flex justify-end mt-6">
      <button 
        @click="router.push('/policy')" 
        class="px-4 py-2 rounded-lg hover:bg-blue-200 hover:transition duration-200 font-semibold border"
      >
        더보기
      </button>
    </div>
  </section>
</template>

<style scoped>
.card {
  min-width: 250px;
  min-height: 200px;
  flex-shrink: 0;
  scroll-snap-align: start;
  border: 1px solid #d1d5db;
  transition: transform 0.3s;
  text-align: center;
}
.card:hover {
  transform: translateY(-5px);
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .card {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
