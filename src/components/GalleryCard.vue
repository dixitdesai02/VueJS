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
            <button @click="notify" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-600 rounded-lg hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300">
                Show Price
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    </div>

</template>

<script>
    import swal from 'sweetalert';

    export default {
        name: "GalleryCard",
        props: ["car"],
        methods: {
            notify() {
                swal({
                    title: this.car.title,
                    text: `Price: ${this.car.price}`, 
                    buttons: {
                        confirm : {text:'Okay',className:'sweet-ok'},
                    }
                })
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
</style>