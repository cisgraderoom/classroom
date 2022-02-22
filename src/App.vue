<template>
    <v-app>
        <v-main>
            <router-view />
            <v-scale-transition>
                <v-btn
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    dark
                    fixed
                    bottom
                    right
                    color="primary"
                    @click="toTop"
                >
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </v-scale-transition>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    // mounted() {
    //     // logger.fail("Fail")
    // },
    data: () => ({
        fab: false,
    }),

    methods: {
        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 300
        },
        toTop() {
            this.$vuetify.goTo(0)
        },
    },
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
.cis-h4 {
    font-size: 2.125rem !important;
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
