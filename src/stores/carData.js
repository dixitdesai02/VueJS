import axios from "axios";
import { defineStore } from "pinia";

export const useCarData = defineStore('carData', {
    state: () => {
        return {
            cars: []
        }
    },

    getters: {
        carDetailsById: (state) => (id) => {
            return state.cars.find((car) => car.id == id)
        } 
    },

    actions: {
        async fetchCars() {
            try {
                const response = await axios.get("https://testapi.io/api/dartya/resource/cardata");
                this.cars = response.data.data;
            }
            catch(error) {
                alert("Error! Could not fetch Cars Data!");
            }
        },

        async addCar(carData) {
            try {
                await axios.post("https://testapi.io/api/dartya/resource/cardata", carData);
                await this.fetchCars();
            }
            catch (error) {
                alert("Error! Car could not be Added!");
            }
        },

        async editCar(id, carData) {
            try {
                await axios.put(`https://testapi.io/api/dartya/resource/cardata/${id}`, carData);
                await this.fetchCars();
            }
            catch(error) {
                alert("Error! Car Could not be Updated!");
            }
        },

        async deleteCar(id) {
            try {
                await axios.delete(`https://testapi.io/api/dartya/resource/cardata/${id}`);
                await this.fetchCars();
            }
            catch(error) {
                alert("Error! Car could not be Deleted!");
            }
        }
    }
})