<template>
    <div class="wrapper max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" :src="car.image" alt="" />
        </a>
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ car.title.slice(0, 15) }}</h5>
            <div class="mb-2 text-xs font-medium flex justify-between">
                <span class="p-1 px-3 bg-slate-200 rounded-full">{{ car.class }}</span>
                <span class="p-1 px-3 bg-slate-200 rounded-full">{{ car.start_production }}</span>
            </div>
            <p class="mb-3 font-light text-gray-700 dark:text-gray-400 h-24">
                {{ car.description?.length > 110 ? car.description.slice(0, 100) + "...": car.description }}
            </p>
            <button @click="showPrice" :disabled="car.price === undefined" :class="{ disabledBtn: car.price ? false : true }" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">
                {{car.price ? 'Show Price': 'Available Soon..'}}

               <svg v-if="car.price" aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "GalleryCard",
        props: ["car"],
        emits: ["showPrice"],
        methods: {
            showPrice() {
                this.$emit('showPrice', this.car.title, this.car.price);
            }
        }
    }
</script>

<style scoped>
    img {
        width: 100%;
        height: 220px;
        object-fit: cover;
    }

    .wrapper {
        transition: scale ease-in-out 200ms;
    }
    .wrapper:hover{
        scale: 1.03;
    }

    .disabledBtn {
        background-color: #cccccc;
        color: #424242;
        border: none;
        cursor: not-allowed;
    }

    button:hover:enabled {
        background-color: rgb(51 65 85);
    }

</style>