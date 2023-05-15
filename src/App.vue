<template>
    <Navbar />

    <RouterView v-slot="{ Component }">
        <transition name="route" appear>
            <Component :is="Component"  />
        </transition>
    </RouterView>   

</template>

<script>
    import { RouterView } from "vue-router";

    export default {
        name: "App"
    }
</script>

<style scoped>
    .route-enter-from {
        transform: translateY(6rem) scale(0.8);
        opacity: 0.5;
    }

    .route-enter-to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }

    .route-enter-active {
        transition: all 0.3s linear;
    }
</style>