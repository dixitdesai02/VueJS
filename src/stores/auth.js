import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            baseURL: "https://testapi.io/api/dartya"
        }
    },

    actions: {
        async login(data) {
            try {
                await axios.post(`${this.baseURL}//login`, data);
            }
            catch(error) {
                throw new Error("Invalid Credentials");
            }
        },

        async register(data) {
            try {
                await axios.post(`${this.baseURL}/resource/users`, data);
            }
            catch (error) {
                throw new Error(error);
            }
        }
    }
})