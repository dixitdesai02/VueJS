<template>
    <Navbar @show-form="showModalForm" />

    <main v-if="renderCars" class="w-5/6 pt-6 pb-10 max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <GalleryCard @show-price="showPrice" @update-cars="fetchData" @show-form="showModalForm" v-for="car in carsData" :car="car" :key="car.title"/>

        <ModalForm :showModal="showModal" @hide-modal="() => { showModal = false }" @update-cars="fetchData" :type="!Object.keys(editCar).length ? 'add' : 'edit'" :car="editCar" />
    </main>

    <div v-else class="w-full h-full flex justify-center align-center">
        <img src="./assets/loader.gif" alt="Loading" class="md:w-1/2 lg:w-1/3" >
    </div>
</template>

<script>
    import GalleryCard from "./components/GalleryCard.vue"
    import ModalForm from './components/ModalForm.vue';
    import Swal from 'sweetalert2';
    import axios from 'axios';

    export default {
        name: "App",
        data() {
            return {
                carsData: null,
                editCar: {},
                renderCars: true,
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
                this.renderCars = false;
                axios.get("https://testapi.io/api/dartya/resource/cardata")
                .then(response => { 
                    this.carsData = response.data.data;
                    this.renderCars = true;
                })
                .catch((err) => { 
                    alert("ERROR while Fetching Data!", err);
                })

            }
        },
        components: {
            GalleryCard,
            ModalForm
        }
    }
</script>