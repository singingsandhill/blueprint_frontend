import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useFinanceStore = defineStore("finance", {
  state: () => ({
    SavingsList: [],
    LoanList: [],
    AllSavingsList: [],
    AllLoanList: [],
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
        console.error("Failed to fetch savings filtering: ", error);
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
        console.error("Failed to fetch loan filtering: ", error);
        throw error;
      }
    },

    async getAllSavings() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get("/finance/getAllSavings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.AllSavingsList = response.data.response.data;
      } catch (error) {
        console.error("Failed to fetch all savings: ", error);
        throw error;
      }
    },

    async getAllLoans() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get("/finance/getAllLoans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.AllLoanList = response.data.response.data;
      } catch (error) {
        console.error("Failed to fetch all loans: ", error);
        throw error;
      }
    },
  },
});
