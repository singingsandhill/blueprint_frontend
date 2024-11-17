import { defineStore } from "pinia";
import axios from "axios";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useSubscriptionStore = defineStore("subscription",{
    state:()=>({
        subscription: [],
        RecommedSubscriptionList: [],
    }),

actions: {
    async getSubscription() {
        try{
            const response = await axios.get("http://localhost:8080/subscription/getAll")
            this.subscription = response.data.response.data;
        } catch (error) {
            console.log("Error fetching subscription data:", error);
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