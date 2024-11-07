import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useMyPageStore = defineStore("myPage", {
  state: () => ({
    MyPageInfo: {
      email: null,
      income: null,
      occupation: null,
      residence: null,
      maritalStatus: null,
      hasChildren: null,
      housingType: null,
    },
    password: "",
    checkPassword: "",
  }),

  actions: {
    async getMyPageInfo() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get("/member/mypage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.MyPageInfo = response.data.response.data;
      } catch (error) {
        console.error("Failed to fetch MyPage info : ", error);
        throw error;
      }
    },

    async updateMyPageInfo() {
      try {
        const token = useAuthStore().token;
        await axiosInstance.post("/member/mypage", this.MyPageInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Failed to update MyPage info : ", error);
        throw error;
      }
    },

    async verifyPassword() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.post(
          "/member/verification/password",
          { password: this.password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.checkPassword = response.data.response.data;
      } catch (error) {
        console.error("Failed to verify password : ", error);
        throw error;
      }
    },
  },
});
