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
                            v-model="oldpassword"
                            :rules="oldpasswordRules"
                            type="password"
                            label="รหัสผ่านเก่า"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="newpassword"
                            :rules="newpasswordRules"
                            type="password"
                            label="รหัสผ่านใหม่"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="confirmpassword"
                            :rules="confirmpasswordRules"
                            type="password"
                            label="ยืนยันรหัสผ่านใหม่"
                            required
                        ></v-text-field>
                        <v-alert
                            text
                            type="info"
                            v-show="this.$store.state.changePassword.isLoading"
                        >
                            กำลังเปลี่ยนรหัสผ่าน
                        </v-alert>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.changePassword.isFailed"
                        >
                            {{ this.$store.state.changePassword.message }}
                        </v-alert>
                        <v-alert text type="error" v-show="error">
                            {{ errormessage }}
                        </v-alert>
                        <v-alert
                            text
                            type="success"
                            v-show="this.$store.state.changePassword.isSuccess"
                        >
                            เปลี่ยนรหัสผ่านสำเร็จ
                        </v-alert>
                        <v-btn
                            @click="handleSubmit"
                            elevation="2"
                            color="primary"
                            block
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
            oldpassword: '',
            oldpasswordRules: [(v) => !!v || 'Oldpassword is required'],
            newpassword: '',
            newpasswordRules: [(v) => !!v || 'Newpassword is required'],
            confirmpassword: '',
            confirmpasswordRules: [(v) => !!v || 'Confirmpassword is required'],
            submitted: false,
            error: false,
            errormessage: '',
        }
    },

    methods: {
        async handleSubmit() {
            this.submitted = true
            const { oldpassword, newpassword, confirmpassword } = this
            if (
                oldpassword == '' &&
                newpassword == '' &&
                confirmpassword == ''
            ) {
                this.errormessage = 'โปรดใส่ รหัสผ่าน ของคุณ'
                return (this.error = true)
            }
            if (oldpassword == '') {
                this.errormessage = 'โปรดใส่ รหัสผ่านเก่า ของคุณ'
                return (this.error = true)
            }
            if (newpassword == '' || confirmpassword == '') {
                this.errormessage =
                    'โปรดใส่ รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ ของคุณ'
                return (this.error = true)
            }
            if (newpassword !== confirmpassword) {
                this.errormessage =
                    'รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ ไม่ตรงกัน'
                return (this.error = true)
            }
            const { dispatch, state } = this.$store
            if (
                oldpassword &&
                newpassword == confirmpassword &&
                newpassword != ''
            ) {
                await dispatch('changePassword/changepassword', {
                    oldpassword,
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
