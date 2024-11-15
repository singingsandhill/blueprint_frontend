import { defineStore } from 'pinia';
import axiosInstance from '@/util/axiosInstance';

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    subscription: {
      content: [],
      totalPages: 0,
      last: false
    }
  }),

  actions: {
    async getSubscription(page = 0, size = 10) {
      try {
        const response = await axiosInstance.get('/subscription/get', {
          params: { page, size }
        });
        this.subscription = response.data.response.data;
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
      }
    }
  }
});