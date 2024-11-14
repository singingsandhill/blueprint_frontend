import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useFinanceStore = defineStore("finance", {
  state: () => ({
    SavingsList: [],
    LoanList: [],
  }),

  actions: {
    async getSavings() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get("/finance/filter/savings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.SavingsList = response.data.response.data;
      } catch (error) {
        console.error("Failed to fetch savings filtering : ", error);
        throw error;
      }
    },

    async getLoan() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get("/finance/filter/loan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.LoanList = response.data.response.data;
      } catch (error) {
        console.error("Failed to fetch loan filtering : ", error);
        throw error;
      }
    },
  },
});
