<template>
    <div>
        <Navbar />
        <v-container>
            <v-form ref="form">
                <v-row>
                    <v-col
                        md="6"
                        offset-md="3"
                        class="px-12 py-16 rounded-lg white mt-15"
                        elevation="12"
                        xl="4"
                        offset-xl="4"
                    >
                        <h1>เปลี่ยนรหัสผ่าน</h1>
                        <v-text-field
                            v-model="newpassword"
                            :rules="newpasswordRules"
                            type="password"
                            label="รหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)"
                            :disabled="
                                this.$store.state.changePassword.isLoading
                            "
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="confirmpassword"
                            :rules="confirmpasswordRules"
                            type="password"
                            label="ยืนยันรหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)"
                            :disabled="
                                this.$store.state.changePassword.isLoading
                            "
                            required
                        ></v-text-field>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.changePassword.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                        <v-alert
                            text
                            type="success"
                            v-show="this.$store.state.changePassword.isSuccess"
                        >
                            เปลี่ยนรหัสผ่านสำเร็จ
                        </v-alert>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.changePassword.isLoading"
                        ></v-progress-linear>
                        <v-btn
                            @click="handleSubmit"
                            elevation="2"
                            color="primary"
                            block
                            :disabled="
                                this.$store.state.changePassword.isLoading
                            "
                            >Change Password</v-btn
                        >
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
    name: 'Editaccount',
    components: {
        Navbar,
    },
    data() {
        return {
            newpassword: '',
            newpasswordRules: [(v) => !!v || 'Newpassword is required'],
            confirmpassword: '',
            confirmpasswordRules: [(v) => !!v || 'Confirmpassword is required'],
            submitted: false,
            errormessage: '',
        }
    },

    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const { newpassword, confirmpassword } = this
            if (newpassword == '' || confirmpassword == '') {
                this.errormessage =
                    'โปรดใส่ รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ ของคุณ'
                commit('changePassword/changePasswordFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (newpassword !== confirmpassword) {
                this.errormessage =
                    'รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ ไม่ตรงกัน'
                commit('changePassword/changePasswordFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (newpassword.length < 8) {
                this.errormessage = 'โปรดใส่รหัสผ่านใหม่อย่างน้อย 8 ตัวอักษร'
                commit('changePassword/changePasswordFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (newpassword == confirmpassword && newpassword != '') {
                await dispatch('changePassword/changepassword', {
                    newpassword,
                })

                if (
                    state.changePassword.isFailed ||
                    state.changePassword.isSuccess
                ) {
                    this.error = false
                }
                this.$refs.form.reset()
            }
        },
    },
}
</script>
