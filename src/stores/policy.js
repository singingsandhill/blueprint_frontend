import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { useAuthStore } from "@/stores/auth";

export const usePolicyStore = defineStore("policy", {
  state: () => ({
    PolicyInfoList: [],
    RecommedPolicyList: [],
    filterCondition: {
      city: null,
      district: null,
      type: null,
      age: null,
      job: null,
      name: null,
    },
    PolicyDetail: {
      idx: null,
      subject: null,
      condition: null,
      content: null,
      scale: null,
      enquiry: null,
      way: null,
      document: null,
      url: null,
      minAge: null,
      maxAge: null,
      job: null,
    },
  }),

  actions: {
    async getPolicyInfo() {
      try {
        const response = await axiosInstance.get("/policy/list");
        this.PolicyInfoList = response.data.response.data.map((policy) => ({
          idx: policy.idx,
          city: policy.city,
          district: policy.district,
          type: policy.type,
          name: policy.name,
          offer_inst: policy.offerInst,
          manage_inst: policy.manageInst,
          start_date: policy.startDate,
          end_date: policy.endDate,
          apply_start_date: policy.applyStartDate,
          apply_end_date: policy.applyEndDate,
        }));
      } catch (error) {
        console.error("Failed to fetch policy list: ", error);
        throw error;
      }
    },

    async getPolicyDetail(idx) {
      try {
        const response = await axiosInstance.get(`/policy/detail/${idx}`);
        const policy = response.data.response.data;
        this.PolicyDetail = {
          idx: policy.idx,
          subject: policy.subject,
          condition: policy.condition,
          content: policy.content,
          scale: policy.scale,
          enquiry: policy.enquiry,
          way: policy.way,
          document: policy.document,
          url: policy.url,
          minAge: policy.minAge,
          maxAge: policy.maxAge,
          job: policy.job,
        };
      } catch (error) {
        console.error("Failed to fetch Policy Detail: ", error);
        throw error;
      }
    },

    async getPolicyFilter() {
      try {
        const response = await axiosInstance.post(
          "/policy/filter",
          this.filterCondition
        );
        this.PolicyInfoList = response.data.response.data;
      } catch (error) {
        console.error("Failed to filter policy : ", error);
        throw error;
      }
    },

    async getRecommendPolicy() {
      try {
        const token = useAuthStore().token;
        const response = await axiosInstance.get("/policy/recommendation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.RecommedPolicyList = response.data.response.data;
      } catch (error) {
        console.error("Failed to recommend policy : ", error);
        throw error;
      }
    },

    filterPolicies(userData) {
      return this.PolicyInfoList.filter((policy) => {
        let matches = true;

        if (userData.region && !policy.city.includes(userData.region)) {
          matches = false;
        }

        if (userData.job && !policy.type.includes(userData.job)) {
          matches = false;
        }

        if (userData.age && !this.isAgeInRange(userData.age, policy.type)) {
          matches = false;
        }

        if (userData.income && !policy.type.includes(userData.income)) {
          matches = false;
        }

        if (userData.policyName && !policy.name.includes(userData.policyName)) {
          matches = false;
        }

        return matches;
      });
    },

    isAgeInRange(age, condition) {
      const ageRange = condition.match(/(\d+)세 ~ (\d+)세/);
      if (ageRange) {
        const minAge = parseInt(ageRange[1]);
        const maxAge = parseInt(ageRange[2]);
        return age >= minAge && age <= maxAge;
      }
      return false;
    },
  },
});
