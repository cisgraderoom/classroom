<template>
    <div>
        <div class="container">
            <v-form>
                <v-row>
                    <v-col
                        md="6"
                        offset-md="3"
                        class="px-12 py-16 rounded-lg white"
                        elevation="12"
                        xl="4"
                        offset-xl="4"
                    >
                        <v-img
                            alt="CISClassroom Logo"
                            class="shrink mx-auto"
                            contain
                            src="../assets/ciskmutnb.png"
                            transition="scale-transition"
                            width="70"
                        />
                        <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            label="ชื่อผู้ใช้"
                            :disabled="
                                this.$store.state.authentication.isLoading
                            "
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            type="password"
                            label="รหัสผ่าน"
                            :disabled="
                                this.$store.state.authentication.isLoading
                            "
                            v-on:keyup.enter="handleSubmit"
                            required
                        ></v-text-field>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.authentication.isFailed"
                            >ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง</v-alert
                        >
                        <v-btn
                            @click="handleSubmit"
                            elevation="2"
                            color="primary"
                            block
                            :disabled="
                                this.$store.state.authentication.isLoading
                            "
                            >เข้าสู่ระบบ</v-btn
                        >
                        <v-progress-linear
                            class="mt-2"
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.authentication.isLoading"
                        ></v-progress-linear>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        ><p class="text-center">
                            ติดต่อสอบถามและแก้ปัญหาระบบ :
                            <a
                                href="https://discord.gg/w9cvvB9yWv"
                                target="_blank"
                                >Discord</a
                            >
                        </p>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            usernameRules: [(v) => !!v || 'โปรดใส่ชื่อผู้ใช้'],
            password: '',
            passwordRules: [(v) => !!v || 'โปรดใส่รหัสผ่าน'],
            submitted: false,
            loginfail: false,
        }
    },
    computed: {
        loggingIn() {
            return this.$store.state.authentication.status.loggingIn
        },
    },
    created() {
        // reset login status
        this.$store.dispatch('authentication/logout')
    },
    methods: {
        handleSubmit() {
            this.submitted = true
            const { username, password } = this
            const { dispatch, commit } = this.$store
            if (username == '' || password == '') {
                commit('authentication/loginFailure')
            }
            if (username && password) {
                dispatch('authentication/login', { username, password })
            }
        },
    },
}
</script>

<style scoped>
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
