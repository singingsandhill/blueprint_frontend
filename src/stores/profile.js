import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";

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
        const response = await axiosInstance.get(
          `/member/profile/${memberId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0ZXIwMSIsInVpZCI6IlB6b1hZQzIwWCtXeDZhTUh3UTBQWVE9PSIsInJvbGUiOiJST0xFX01FTUJFUiIsIm1lbWJlck5hbWUiOiJ0ZXN0ZXIwMSIsImVtYWlsIjoidGVzdEB0ZXN0IiwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNzMwODczNDc2LCJleHAiOjE3MzA5NTk4NzZ9.KX1j6hlb-_wRuE8rB3JvBeRjS5BekpDLHOQku_xoGzXPAwfw2Rpo59txUWqNUiq3`,
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
        await axiosInstance.post(
          `/member/profile/${memberId}`,
          this.ProfileInfo,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0ZXIwMSIsInVpZCI6IlB6b1hZQzIwWCtXeDZhTUh3UTBQWVE9PSIsInJvbGUiOiJST0xFX01FTUJFUiIsIm1lbWJlck5hbWUiOiJ0ZXN0ZXIwMSIsImVtYWlsIjoidGVzdEB0ZXN0IiwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNzMwODczNDc2LCJleHAiOjE3MzA5NTk4NzZ9.KX1j6hlb-_wRuE8rB3JvBeRjS5BekpDLHOQku_xoGzXPAwfw2Rpo59txUWqNUiq3`,
              "Content-Type": "application/json",
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
