import { defineStore } from "pinia";
import axios from "axios";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    subscription: {
      content: [],
      totalPages: 0,
      last: false
    },
        RecommedSubscriptionList: [],
  }),

  actions: {
    async getSubscription(page = 0, size = 10) {
      try {
        const response = await axiosInstance.get('/subscription/getAll', {
          params: { page, size }
        });
        this.subscription = response.data.response.data;
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
      }
    },

    async getRecommendSubscription() {
        try {
          const token = useAuthStore().token;
          const response = await axiosInstance.get("/subscription/recommendation", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.RecommedSubscriptionList = response.data.response.data;
        } catch (error) {
          console.error("Failed to recommend subscription : ", error);
          throw error;
        }
      },
  }
});