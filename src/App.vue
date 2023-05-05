<template>
    <Navbar @show-form="showModalForm" />
    <main class="w-5/6 pt-6 pb-10 max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <GalleryCard @show-price="showPrice" @show-form="showModalForm" v-for="car in carsData" :car="car" :key="car.title"/>
        <ModalForm :type="!Object.keys(editCar).length ? 'add' : 'edit'" :showModal="showModal" @hide-modal="() => { showModal = false }" :car="editCar" />
    </main>
</template>

<script>
    import cars from '../cars-updated.json';
    import GalleryCard from "./components/GalleryCard.vue"
    import ModalForm from './components/ModalForm.vue';
    import Swal from 'sweetalert2';

    export default {
        name: "App",
        data() {
            return {
                carsData: cars,
                showModal: false,
                editCar: {}
            }
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
                console.log(this.editCar)
            }
        },
        components: {
            GalleryCard,
            ModalForm
        }
    }
</script>