import { defineStore } from "pinia";
import axios from "axios";

export const useSubscriptionStore = defineStore("subscription",{
    state:()=>({
        subscription: [],
    }),

actions: {
    async getSubscription() {
        try{
            const response = await axios.get("http://localhost:8080/subscription/getAll")
            this.subscription = response.data.response.data;
        } catch (error) {
            console.log("Error fetching subscription data:", error);
        }
    }
}
});