<template>
    <section class="h-[75vh] flex flex-col items-center justify-center">
        <img class="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto object-contain" src="/404.png" alt="">
        <h2 class="xs:text-lg sm:text-2xl lg:text-3xl text-slate-800 font-light pt-2 pb-8 text-center"><span class="font-bold">ERROR!</span> the requested page does not exist</h2>
        <RouterLink :to="{name: 'home'}" class="back px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Go to Home Page</RouterLink>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router';

    export default {
    name: "NotFound",
    components: { RouterLink }
}
</script>

<style scoped>
    .back {
        left: 46%;
        top: 70%;
    }
</style>