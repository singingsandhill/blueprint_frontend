import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  state: () => ({
    policyCards: [
      { image: 'policy-image1.jpg', description: '정책 설명 1' },
      { image: 'policy-image2.jpg', description: '정책 설명 2' },
      { image: 'policy-image3.jpg', description: '정책 설명 3' },
    ],
    realEstateCards: [
      { image: 'realestate-image1.jpg', description: '부동산 설명 1' },
      { image: 'realestate-image2.jpg', description: '부동산 설명 2' },
      { image: 'realestate-image3.jpg', description: '부동산 설명 3' },
    ],
    financeCards: [
      { image: 'finance-image1.jpg', description: '금융 설명 1' },
      { image: 'finance-image2.jpg', description: '금융 설명 2' },
      { image: 'finance-image3.jpg', description: '금융 설명 3' },
    ],
  }),
  actions: {
    fetchCards() {
    },
  },
});