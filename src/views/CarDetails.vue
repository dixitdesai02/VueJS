<template>
        <Loader v-show="isLoading"/>
        <section v-show="!isLoading" class="w-5/6 max-w-6xl m-auto">
            <div class="back mt-5 cursor-pointer w-fit" @click="goBack">
                <img src="../assets/back.svg" alt="back" class="w-10 h-10 object-cover">
            </div>
            <transition name="fade">
                <div v-show="!isLoading" class="wrapper flex flex-col md:flex-row m-auto items-center bg-white p-5 rounded shadow-lg mt-10">
                    <div class="img-wrapper">
                        <img :src="carData.image" alt="Car Image" class="car-image">
                    </div>
                    <div class="details-wrapper p-5">
                        <h1 class="text-3xl font-bold text-slate-800">{{ carData.name }}</h1>
                        <h3 class="text-lg text-slate-600 pt-5 break-words">{{ carData.details }}</h3>
                        <h3 class="text-lg text-slate-800 font-semibold pt-5">$ {{ carData.price }}</h3>
                    </div>
                </div>
            </transition>
        </section>
</template>

<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';
    export default {
        name: "CarDetails",
        data() {
            return {
                carData: "",
                isLoading: true
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        },
        mounted() {
            axios.get(`https://testapi.io/api/dartya/resource/cardata/${this.$route.params.id}`)
            .then((response) => {
                this.carData = response.data;
                this.isLoading = false;
            })
            .catch(err => {
                alert("ERROR:", err)
                this.isLoading = false;
            })
        },
        components: {
            Loader
        }
    }
</script>

<style scoped>
    .fade-enter-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }

    .fade-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .car-image {
        max-width: 100%;
        width: 1500px;
        height: 500px;
        object-fit: cover;
    }

    @media screen and (max-width: 991px) {
        .car-image {
            width: 100%;
            height: 200px;   
            object-fit: cover;
        }
    }
</style>