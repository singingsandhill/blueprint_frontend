<script setup>
const policyCards = [
  { image: 'policy-image1.jpg', description: '정책 설명 1' },
  { image: 'policy-image2.jpg', description: '정책 설명 2' },
  { image: 'policy-image3.jpg', description: '정책 설명 3' },
];
</script>

<template>
  <div class="section mb-6">
    <h2 class="text-2xl font-bold text-blue-900 mb-4">정책 정보</h2>
    <div class="cards flex overflow-x-scroll space-x-4">
      <div v-for="(card, index) in policyCards" :key="index" class="card bg-blue-800 text-white p-4 rounded-lg w-64 flex-shrink-0">
        <img :src="card.image" alt="정책 이미지" class="mb-2 rounded-md" />
        <p class="text-base">{{ card.description }}</p>
      </div>
    </div>
    <router-link to="/policy" class="block mt-2 text-right text-blue-700 hover:underline">더보기</router-link>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>