<template>
    <Navbar />
    <main class="w-5/6 pt-6 pb-10 max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <GalleryCard @showPrice="showPrice" v-for="car in carsData" :car="car" :key="car.title"/>
    </main>
</template>

<script>
    import cars from '../cars.json';
    import GalleryCard from "./components/GalleryCard.vue"
    import swal from 'sweetalert';

    export default {
        name: "App",
        data() {
            return {
                carsData: cars
            }
        },
        methods: {
            showPrice(title, price) {
                swal({
                    title: title,
                    text: `Price: ${price}`, 
                    buttons: {
                        confirm : {text:'Okay',className:'sweet-ok'},
                    }
                })
            }
        },
        components: {
            GalleryCard
        }
    }
</script>