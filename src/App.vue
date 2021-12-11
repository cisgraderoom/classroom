<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
// import { logger } from "@cisclassroom/logger";
export default {
    name: 'App',
    mounted() {
        // logger.fail("Fail")
    },
    data: () => ({
        //
    }),
}
</script>

<style lang="scss">
#app {
    background-color: #f5f5f5;
    font-family: 'K2D', Arial, Helvetica, sans-serif;
}
.subtitle {
    font-family: 'K2D' !important;
    font-size: 1.1rem !important;
}
.cis-h5 {
    font-size: 1.5rem !important;
    font-family: 'K2D' !important;
}
@font-face {
    font-family: 'K2D';
    src: url(./font/K2D-Regular.ttf) format('truetype');
}
</style>
