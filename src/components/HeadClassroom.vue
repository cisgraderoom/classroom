<template>
    <div>
        <v-row>
            <v-col md="10" offset-md="1" xl="8" offset-xl="2">
                <v-card>
                    <v-img
                        lazy-src="/banner.webp"
                        src="/banner.webp"
                        class="white--text align-end"
                        :height="imageHeight"
                    >
                        <v-card-title
                            class="cis-h4"
                            v-text="
                                $store.state.getInfoClassroom.data.classname
                            "
                            v-show="!$store.state.getInfoClassroom.isLoading"
                        ></v-card-title>
                        <h4
                            class="mx-5 mb-4"
                            v-show="
                                checkAddClassroom != 'student' &&
                                !$store.state.getInfoClassroom.isLoading
                            "
                        >
                            รหัสชั้นเรียน :
                            {{ $store.state.getInfoClassroom.data.classcode }}
                            <v-icon dark left @click="copy">
                                mdi-clipboard-multiple-outline
                            </v-icon>
                        </h4>
                        <v-progress-linear
                            indeterminate
                            color="secondary"
                            v-show="
                                this.$store.state.getInfoClassroom.isLoading
                            "
                        ></v-progress-linear>
                    </v-img>
                </v-card>
            </v-col>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="primary"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                        ปิด
                    </v-btn>
                </template>
            </v-snackbar>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'HeadClassroom',
    data: () => ({
        checkAddClassroom: JSON.parse(localStorage.getItem('user')).role,
        snackbar: false,
        text: 'คัดลอกรหัสชั้นเรียนสำเร็จ',
        timeout: 2000,
        hight: '200px',
        // imageHeight: '200px',
    }),
    computed: {
        imageHeight() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    return '200px'
                case 'sm':
                    return '200px'
                case 'md':
                    return '200px'
                case 'lg':
                    return '200px'
                case 'xl':
                    return '250px'
            }
            return '200px'
        },
    },
    mounted() {
        const classcode = this.$route.params.code
        let data = this.$store
            .dispatch('getInfoClassroom/getInfoClassroom', { classcode })
            .then(() => {
                this.classroom = this.$store.state.getInfoClassroom.data
            })
        return data
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(
                this.$store.state.getInfoClassroom.data.classcode
            )
            this.snackbar = true
        },
    },
}
</script>

<style></style>
