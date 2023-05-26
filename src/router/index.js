import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'    
import CarDetails from '../views/CarDetails.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: "Home | CarZone",
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "Login | CarZone",
            guest: true
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            title: "Register | CarZone",
            guest: true
        }
    },
    {
        path: "/details/:id",
        name: "details",
        component: CarDetails,
        meta: {
            title: "Car | CarZone",
            requiresAuth: true
        }
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: NotFound,
        meta: {
            title: "404 | CarZone"
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: 'activated-link'
})

router.beforeEach((to, from, next) => {
    const isAutheticated = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    const token = sessionStorage.getItem('token');

    if (to.meta.requiresAuth && !isAutheticated && !token) {
        alert("Please login to continue..")
        next("/login");
    }
    else if (to.meta.guest && isAutheticated && token) {
        next("/");
    } 
    else {
        next();
    }
})

router.afterEach((to, from) => {
    document.title = to.meta.title || "Not Found";
})

export default router;