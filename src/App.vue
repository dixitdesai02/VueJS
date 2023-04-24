<template>
    <Header />
    <main class="w-5/6 py-10 max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <GalleryCard v-for="car in carsData" :car="car" :key="car.title"/>
    </main>
</template>

<script>
    import cars from '../cars.json';
    import GalleryCard from "./components/GalleryCard.vue"
    import Header from "./components/Header.vue"

    export default {
        name: "App",
        data() {
            return {
                carsData: cars
            }
        },
        components: {
            Header,
            GalleryCard
        }
    }
</script>