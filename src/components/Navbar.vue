<template>
    <header class="bg-slate-600 text-center pt-4 pb-3 sticky top-0 w-full z-40">
        <div class="w-5/6 sm:w-2/3 flex justify-between items-center m-auto">
            <div>
                <h1 class="text-2xl sm:text-3xl text-slate-200 font-bold">Car Zone</h1>
                <h3 class="text-md mt-1 text-sky-300 font-semibold">-Driving Dreams</h3>
            </div>
            <div class="nav-list bg-slate-600" ref="navList">
                <div class="hamburger-menu" ref="menu" @click="showMenu">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                </div>

                <div class="flex flex-col md:flex-row md:gap-6 font-semibold text-lg text-slate-200">
                    <button class="hover:text-white hover:underline" @click="handleBtnclick">
                        <RouterLink :to="{name: 'home'}">Home</RouterLink>
                    </button>
                    <button class=" hover:text-white hover:underline" @click="handleBtnclick">
                        <RouterLink :to="{name: 'login'}">Login</RouterLink>
                    </button>
                    <button class=" hover:text-white hover:underline" @click="handleBtnclick">
                        <RouterLink :to="{name: 'register'}">Register</RouterLink>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import ModalForm from './ModalForm.vue';

export default {
    name: "Header",
    components: {
        ModalForm
    },
    methods: {
        showMenu() {
            this.$refs.navList.classList.toggle('change');
        },
        handleBtnclick() {
            this.$refs.navList.classList.toggle('change');
        }
    }
}
</script>

<style scoped>
    .activated-link {
        color: #7DD3FC;
        text-decoration: underline;
    }

    @media screen and (max-width: 768px) {
        .nav-list {
            width: 225px;
            height: 225px;
            position: fixed;
            top: 0;
            right: -325px;
            display: flex;
            flex-direction: column;
            padding-top: 85px;
            padding-left: 25px;
            align-items: center;
            border-radius: 0 0 0 75%;
            font-size: 1rem;
            transition: right 0.4s cubic-bezier(1, 0, 0, 1);
        }
    
        .change {
            right: 0;
        }
        .hamburger-menu {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 25px;
            right: 50px;
            width: 35px;
            height: 35px;
            justify-content: space-around;
            cursor: pointer;
        }
    
        .line {
            width: 100%;
            height: 3px;
            border-radius: 2px;
            background-color: rgb(199, 199, 199);
            transition: all 0.4s;
        }
    
        .change .line-1 {
            transform: rotateZ(-45deg) translate(-8px, 8px);   
        }
    
        .change .line-2 {
            opacity: 0;
        }
    
        .change .line-3 {
            transform: rotateZ(45deg) translate(-8px, -9px);
        }
    }
</style>