<template>
    <div class="login-wrapper w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 m-auto flex flex-col justify-center h-3/5 mt-10 mb-10">

        <div class="bg-white shadow-lg rounded-lg">
            <h2 class="font-bold text-3xl bg-slate-200 text-slate-700 text-center py-4 rounded-t-md">LOGIN</h2>
            <Form id="form" class="py-5 px-7" :validation-schema="schema" @submit="handleLogin">
                <div class="relative z-0 w-full mb-5">
                    <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="inputData.email"
                    />
                    <label for="email" class="absolute duration-300 top-3 origin-0 text-gray-500">Email Address</label>
                    <ErrorMessage class="text-red-600 text-sm" name="email"/>
                </div>
                <div class="relative z-0 w-full mb-5">
                    <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="inputData.password"
                    />
                    <label for="password" class="absolute duration-300 top-3 origin-0 text-gray-500">Password</label>
                    <ErrorMessage class="text-red-600 text-sm" name="password"/>
                </div>
            
                <button type="submit" class="my-1 px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Login</button>
            </Form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '../stores/auth';

// import axios from 'axios';

    export default {
        name: "LoginForm",
        data() {
            return {
                schema: {
                    email: "required|email",
                    password: "required|min:8|max:12"
                },
                inputData: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            ...mapActions(useAuthStore, ['login']),
            handleLogin() {
                try {
                    this.login(this.inputData);
                    this.$router.push("/")
                }
                catch(error) {
                    alert("Error! " + error);
                }
            }
        }
    }
</script>

<style scoped>

</style>