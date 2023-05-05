<template>
    <header class="bg-slate-600 text-white text-center pt-4 pb-3 sticky top-0 w-full z-40 ">
        <div class="w-5/6 sm:w-2/3 flex justify-between items-center m-auto">
            <div>
                <h1 class="text-3xl font-bold">VINTAGE WHEELS</h1>
                <h3 class="text-md mt-1 text-sky-300 font-semibold">-Retro Reimagined</h3>
            </div>
            <div>
                <button @click="showModalForm" class="px-4 py-2 text-lg font-semibold text-center text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-400">
                    ADD CAR
                </button>
            </div>
        </div>
    </header>
</template>

<script>

import ModalForm from './ModalForm.vue';

export default {
    name: "Header",
    methods: {
        showModalForm() {
            this.$emit('show-form', {})
        }
    },
    components: {
        ModalForm
    }
}
</script>