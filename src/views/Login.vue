<template>
    <section>
        <LoginForm />
    </section>
</template>

<script>
    import LoginForm from '../components/LoginForm.vue';
    export default {
        name: "Login",
        components: { LoginForm }
}
</script>

<style scoped>
    section {
        height: 75vh;
    }
</style>