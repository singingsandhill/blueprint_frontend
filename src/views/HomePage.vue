<script setup>
import { ref } from 'vue';
import FilterSection from '@/components/home/FilterSection.vue';
import FilterResult from '@/components/home/FilterResult.vue'; 
import PolicySection from '@/components/home/PolicySection.vue';
import SubscriptionSection from '@/components/home/SubscriptionSection.vue';
import FinanceSection from '@/components//home/FinanceSection.vue';
import BannerSlider from '@/components/home/BannerSlider.vue';

const filteredPolicies = ref([]);
const searchExecuted = ref(false);

const handleFilterChanged = (policies) => {
  filteredPolicies.value = policies;
  searchExecuted.value = true;
};
</script>

<template>
  <div>
    <BannerSlider />
  </div>
  <div class="homepage container mx-auto p-4">
    <FilterSection @filterChanged="handleFilterChanged" class="mb-32" />
    <FilterResult v-if="searchExecuted" :filteredPolicies="filteredPolicies" class="mb-32" />
    <PolicySection class="mb-32" />
    <SubscriptionSection class="mb-32" />
    <FinanceSection class="mb-32" />
  </div>
</template>


<style scoped>
.homepage {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-top: 2rem;
}
</style>