<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FilterSection from "@/components/home/FilterSection.vue";
import FilterResult from "@/components/home/FilterResult.vue";
import PolicySection from "@/components/home/PolicySection.vue";
import SubscriptionSection from "@/components/home/SubscriptionSection.vue";
import FinanceSection from "@/components//home/FinanceSection.vue";
import BannerSlider from "@/components/home/BannerSlider.vue";
import TypeFilter from "@/components/home/TypeFilterSection.vue"
import Datasource from "@/components/home/Datasource.vue";

const router = useRouter();

const filteredPolicies = ref([]);
const searchExecuted = ref(false);

const handleFilterChanged = (policies) => {
  filteredPolicies.value = policies;
  searchExecuted.value = true;
};

const handleFilterApplied = () => {
  router.push("/policy");
};
</script>

<template>
  <div>
    <BannerSlider />
  </div>
  <div>
    <TypeFilter />
  </div>
  <div class="homepage mx-auto p-4">
    <FilterSection
      @filterChanged="handleFilterChanged"
      @filterApplied="handleFilterApplied"
      class=" mb-20"
    />
    <FilterResult
      v-if="searchExecuted"
      :filteredPolicies="filteredPolicies"
      class="mb-20"
    />
    <PolicySection class="mb-20" />
    <SubscriptionSection class="mb-20" />
    <FinanceSection class="mb-20" />
  </div>
  <Datasource></Datasource>
</template>

<style scoped>
.homepage {
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
}

section {
  margin-top: 2rem;
}
</style>
