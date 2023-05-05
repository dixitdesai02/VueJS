<template>
    <div class="wrapper max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="car-img rounded-t-lg" :src="car.image" alt="" />
        </a>
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ car.name.slice(0, 15) }}</h5>
            <p class="mb-3 font-light text-gray-700 dark:text-gray-400 h-24">
                {{ car.detail?.length > 110 ? car.detail.slice(0, 100) + "...": car.detail }}
            </p>
            <div class="flex items-center justify-between">
                <button @click="showPrice" :disabled="car.price === undefined" :class="{ disabledBtn: car.price ? false : true }" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">
                    {{car.price ? 'Show Price': 'Available Soon..'}}
                   <svg v-if="car.price" aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

                <div class="icon-wrapper flex justify-between w-[4em] gap-2">
                    <img @click="showEditForm" src="../assets/edit.svg" alt="Edit" class="w-5 h-6 object-contain cursor-pointer opacity-90"/>
                    <img @click="showDeleteAlert" src="../assets/delete.svg" alt="delete" class="w-6 h-6 cursor-pointer object-contain opacity-80">
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import ModalForm from './ModalForm.vue';
    import Swal from 'sweetalert2'

    export default {
        name: "GalleryCard",
        props: ["car"],
        emits: ["show-price", "show-form"],
        methods: {
            showPrice() {
                this.$emit('show-price', this.car.name, this.car.price);
            },
            showDeleteAlert() {
                Swal.fire(
                'Deleted!',
                `${this.car.name} has been deleted.`,
                'success'
                )
            },
            showEditForm() {
                this.$emit('show-form', {...this.car})
            }
        },
        components: {
            ModalForm
        }
    }
</script>

<style scoped>
    .car-img {
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
        background-color: #dadada;
        color: #424242;
        border: none;
        cursor: not-allowed;
    }

    button:hover:enabled {
        background-color: rgb(51 65 85);
    }

</style>