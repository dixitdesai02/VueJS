<template>
    <div class="wrapper max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div class="overflow-hidden cursor-pointer bg-slate-100">
            <img class="car-img rounded-t-lg bg-slate-50" :src="car.image" alt="" />
        </div>
        <div class="p-5">
            <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900">{{ car.name?.length > 20 ? car.name?.slice(0, 20) + "..." : car.name }}</h5>
            <p class="mb-3 font-light text-gray-700 h-24 car-details"> 
                {{ car.details?.length > 110 ? car.details?.slice(0, 100) + "...": car.details }}
            </p>
            <div class="flex items-center justify-between">
                <button @click="showDetails" :disabled="!car.price" :class="{ disabledBtn: car.price ? false : true }" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">
                    {{car.price ? 'Info': 'Available Soon..'}}
                   <svg v-if="car.price" aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

                <div class="icon-wrapper flex justify-between w-[4em] gap-2">
                    <img @click="showEditForm" src="/edit.svg" alt="Edit" class="w-5 h-6 object-contain cursor-pointer opacity-90"/>
                    <img @click="handleDelete" src="/delete.svg" alt="delete" class="w-6 h-6 cursor-pointer object-contain opacity-80">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ModalForm from './ModalForm.vue';
    import Swal from 'sweetalert2'
    import { mapActions, mapWritableState } from 'pinia';
    import { useCarData } from '../stores/carData';
    import { useModalStore } from '../stores/modalStore';

    export default {
        name: "GalleryCard",
        props: ["car"],
        computed: {
            ...mapWritableState(useModalStore, ['showModal', 'typeOfModal', 'editData'])
        },
        methods: {
            ...mapActions(useCarData, ['deleteCar']),

            showDetails() {
                this.$router.push(`/details/${this.car.id}`);
            },
            handleDelete() {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await this.deleteCar(this.car.id);

                            Swal.fire(
                                'Deleted!',
                                `${this.car.name} has been Deleted`,
                                'success'
                            )
                        }
                        catch (error) {
                            alert(error);
                        }
                    }
                })
            },
            showEditForm() {
                this.showModal = true;
                this.typeOfModal = 'edit',
                this.editData = { ...this.car }
            }
        },
        components: {
            ModalForm
        }
    }
</script>

<style scoped>
    .wrapper {
        overflow: hidden;
    }

    .car-img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        transition: all 0.3s ease-in-out;
    }

    .wrapper:hover .car-img {
        scale: 1.1;
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

    .car-details {
        word-break: break-all;
    }
</style>
