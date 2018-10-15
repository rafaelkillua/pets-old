<template>
    <section class="container">
        <h1> PÁGINA PROTEDIGA PELO CABO DACIOLO </h1>
    </section>
</template>

<script>
    import auth from "~/middleware/auth";

    export default {
        middleware: auth
    }
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
        align-content: center;
    }
</style>
