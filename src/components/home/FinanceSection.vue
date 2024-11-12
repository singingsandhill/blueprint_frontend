<script setup>
const financeCards = [
  { image: 'finance-image1.jpg', description: '금융 설명 1' },
  { image: 'finance-image2.jpg', description: '금융 설명 2' },
  { image: 'finance-image3.jpg', description: '금융 설명 3' },
];
</script>

<template>
  <div class="section mb-8">
    <h2 class="text-2xl font-bold mb-12">금융 정보</h2>
    <div class="flex items-center">
      <button class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="cards flex overflow-hidden w-full mx-4 space-x-4">
        <div
          v-for="(card, index) in financeCards"
          :key="index"
          class="card cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 p-4 w-64 flex-shrink-0"
        >
          <img :src="card.image" alt="금융 이미지" class="mb-3 rounded-md w-full h-32 object-cover" />
          <p class="text-sm text-gray-700">{{ card.description }}</p>
        </div>
      </div>

      <button class="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div class="flex justify-center mt-6">
      <router-link to="/finance" class="px-4 py-2 rounded-lg hover:bg-blue-200 hover:transition duration-200 font-semibold border">
        금융 정보 더보기
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 250px;
  flex-shrink: 0;
  scroll-snap-align: start;
  transition: transform 0.3s;
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
