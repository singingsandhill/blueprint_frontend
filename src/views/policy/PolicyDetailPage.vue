<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePolicyStore } from '@/stores/policy';

const route = useRoute();
const policyStore = usePolicyStore();
const policyDetail = ref(null);
const policyListItem = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const idx = parseInt(route.params.idx, 10);

    await policyStore.getPolicyInfo();
    await policyStore.getPolicyDetail(idx);
    policyDetail.value = policyStore.PolicyDetail;
    policyListItem.value = policyStore.PolicyInfoList.find(item => item.idx === idx);

    console.log('Policy Detail:', policyDetail.value);
  } catch (error) {
    console.error("Error fetching policy data: ", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="text-center py-8">
    <p>불러오는 중...</p>
  </div>
  <div v-else-if="policyDetail && policyListItem" class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-6">{{ policyListItem.name }}</h2>

    <h3 class="text-xl font-semibold mb-4 border-b pb-2">사업 개요</h3>
    <table class="w-full border-collapse mb-8">
      <tbody>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">정책 유형</td>
          <td class="py-3 px-4">{{ policyListItem.type }}</td>
          <td class="font-semibold py-3 px-4 custom-bg">주관 기관</td>
          <td class="py-3 px-4">{{ policyListItem.offer_inst }}</td>
        </tr>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">정책 소개</td>
          <td colspan="3" class="py-3 px-4">{{ policyDetail.subject }}</td>
        </tr>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">지원 내용</td>
          <td colspan="3" class="py-3 px-4">{{ policyDetail.content }}</td>
        </tr>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">사업 운영 기간</td>
          <td colspan="3" class="py-3 px-4">
  {{
    new Date(policyListItem.apply_start_date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\. /g, '-').replace('.', '') 
  }} ~ 
  {{
    new Date(policyListItem.apply_end_date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\. /g, '-').replace('.', '')
  }}
</td>

        </tr>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">지원 규모</td>
          <td colspan="3" class="py-3 px-4">{{ policyDetail.scale }}</td>
        </tr>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">관련 사이트</td>
          <td colspan="3" class="py-3 px-4">
            <a :href="policyDetail.url" class="text-blue-500 underline" target="_blank">{{ policyDetail.url }}</a>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="text-xl font-semibold mb-4 border-b pb-2">신청 자격</h3>
    <table class="w-full border-collapse mb-8">
      <tbody>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">조건</td>
          <td class="py-3 px-4">{{ policyDetail.condition }}</td>
        </tr>
        <tr class="border-t border-b">
          <td class="font-semibold py-3 px-4 custom-bg">자격</td>
          <td class="py-3 px-4">{{ policyDetail.enquiry }}</td>
        </tr>
      </tbody>
    </table>

    <h3 class="text-xl font-semibold mb-4 border-b pb-2">신청 방법</h3>
    <p class="py-3 px-4 bg-gray-50 border mb-2">{{ policyDetail.way }}</p>

    <router-link to="/" class="text-blue-500 mt-4 inline-block">뒤로 가기</router-link>
  </div>
  <div v-else class="text-center py-8">
    <p>해당 정책의 세부 정보를 찾을 수 없습니다.</p>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
  margin-bottom: 2rem;
}
td {
  border: 1px solid #e5e7eb;
}
td.custom-bg {
  background-color: #C1D5F9;
  white-space: nowrap;
}
h3 {
  margin-top: 2rem;
}
</style>
