<template>
    <main v-show="!isLoading" class="w-5/6 max-w-screen-xl mx-auto">
        <div class="button-wrapper flex flex-row justify-center sm:justify-end">
            <button @click="showModalForm({})" class="mt-3 px-5 py-2 text-md font-semibold text-center text-slate-700 hover:bg-slate-300 bg-slate-200 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-400">
                    ADD CAR
            </button>
        </div>
        <section class="pt-3 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            <GalleryCard @show-price="showPrice" @update-cars="fetchData" @show-form="showModalForm" v-for="car in carsData" :car="car" :key="car.title"/>

            <ModalForm :showModal="showModal" @hide-modal="() => { showModal = false }" @update-cars="fetchData" :type="!Object.keys(editCar).length ? 'add' : 'edit'" :car="editCar" />
        </section>
    </main>

    <Loader v-show="isLoading"/>
</template>

<script>
    import GalleryCard from "../components/GalleryCard.vue"
    import ModalForm from '../components/ModalForm.vue';
    import Loader from "../components/Loader.vue";
    import Swal from 'sweetalert2';
    import axios from 'axios';

    export default {
        name: 'Home',
        data() {
            return {
                carsData: null,
                editCar: {},
                isLoading: true,
                showModal: false
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            showPrice(title, price) {
                Swal.fire({
                    title: title,
                    html: `Price:<strong> $${price} /-</strong>`, 
                    confirmButtonText: "Okay!",
                    confirmButtonColor: "#475569"
                })
            },
            showModalForm(car) {
                this.showModal = true;
                this.editCar = car;
            },
            fetchData() {
                this.isLoading = true;

                axios.get("https://testapi.io/api/dartya/resource/cardata")
                .then(response => { 
                    this.carsData = response.data.data;
                    this.isLoading = false;
                })
                .catch((err) => { 
                    alert("ERROR while Fetching Data!", err);
                    this.isLoading = false;
                })

            }
        },
        components: {
            GalleryCard,
            ModalForm,
            Loader
        }
    }
</script>