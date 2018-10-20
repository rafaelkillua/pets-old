<template>

</template>

<script>
    import needAuth from "~/middleware/needAuth";

    export default {
        middleware: needAuth,

        created() {
            this.$store.dispatch("logout");
        }
    }
</script>
