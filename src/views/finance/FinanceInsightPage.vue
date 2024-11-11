<script setup>
import { ref, onMounted } from "vue";
import { useFinanceStore } from "@/stores/finance";

const financeStore = useFinanceStore();
const filterSavings = ref([]);
const filterLoan = ref([]);

const fetchSavings = async () => {
  await financeStore.getSavings();
  filterSavings.value = financeStore.SavingsList;
};

const fetchLoan = async () => {
  await financeStore.getLoan();
  filterLoan.value = financeStore.LoanList;
};

onMounted(async () => {
  await fetchSavings();
  await fetchLoan();
});
</script>

<template>
  <h1>Savings 추천</h1>
  <div>{{ filterSavings.idx }}</div>
  <div>{{ filterSavings.korCoNm }}</div>
  <h1>loan 추천</h1>
  <div>{{ filterLoan.korCoNm }}</div>
</template>
