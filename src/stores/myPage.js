import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const useMyPageStore = defineStore("myPage", {
  state: () => ({
    MyPageInfo: {
      email: null,
      income: null,
      occupation: null,
      region: null,
      district: null,
      local: null,
      maritalStatus: null,
      hasChildren: null,
      housingType: null,
    },
    password: "",
    checkPassword: "",
    newPassword: "",
    cities: [],
    districts: [],
    locals: [],
    selectedCity: "",
    selectedDistrict: "",
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

    async updatePassword() {
      try {
        const token = useAuthStore().token;
        await axiosInstance.post(
          "/member/change/password",
          { password: this.newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to update password : ", error);
        throw error;
      }
    },

    async getCity() {
      try {
        const response = await axiosInstance.get("/subscription/city");
        this.cities = response.data.response.data;
      } catch (error) {
        console.error("Failed to get city : ", error);
        throw error;
      }
    },

    async getDistrict(selectedCity) {
      try {
        const response = await axiosInstance.post("/subscription/district", {
          city: selectedCity,
        });
        this.districts = response.data.response.data;
      } catch (error) {
        console.error("Failed to get district : ", error);
        throw error;
      }
    },

    async getLocal() {
      try {
        const response = await axiosInstance.post("/subscription/local", {
          city: this.selectedCity,
          district: this.selectedDistrict,
        });
        this.locals = response.data.response.data;
      } catch (error) {
        console.error("Failed to get local : ", error);
        throw error;
      }
    },
  },
});
