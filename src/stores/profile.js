import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    ProfileInfo: {
      email: null,
      password: null,
      income: null,
      occupation: null,
      residence: null,
      maritalStatus: null,
      hasChildren: null,
      housingType: null,
    },
  }),

  actions: {
    async getProfileInfo(memberId) {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get(
          `/member/profile/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.ProfileInfo = response.data.response.data;
      } catch (error) {
        console.error("Failed to fetch Profile info : ", error);
        throw error;
      }
    },

    async updateProfileInfo(memberId) {
      try {
        const token = useAuthStore().token;
        await axiosInstance.post(
          `/member/profile/${memberId}`,
          this.ProfileInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to update Profile info : ", error);
        throw error;
      }
    },
  },
});
