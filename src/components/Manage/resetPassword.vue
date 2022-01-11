<template>
    <div>
        <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn small color="error" v-bind="attrs" v-on="on"
                    >Reset</v-btn
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">รีเซ็ตรหัสผ่าน</span>
                </v-card-title>
                <v-card-text
                    >ต้องการที่รีเซ็ตรหัสผ่านของ<br />
                    {{ username }} นี้ใช่หรือไม่</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="closeDialog"
                        :disabled="this.$store.state.resetPassword.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.resetPassword.isLoading"
                    >
                        ใช่
                    </v-btn>
                </v-card-actions>
                <v-alert
                    text
                    type="error"
                    v-show="this.$store.state.resetPassword.isFailed"
                >
                    {{ errormessage }}
                </v-alert>
                <v-progress-linear
                    indeterminate
                    color="red"
                    v-show="this.$store.state.resetPassword.isLoading"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'resetPassword',
    props: ['username'],
    data() {
        return {
            dialog: false,
            errormessage: '',
        }
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state } = this.$store
            const { username } = this
            console.log(username)
            await dispatch('resetPassword/resetPassword', {
                username,
            })
            if (state.resetPassword.isSuccess) {
                this.dialog = false
                this.$emit('getList')
            }

            if (state.resetPassword.isFailed) {
                this.errormessage =
                    state.resetPassword.message ?? 'ไม่สามารถลบคอมเม้นได้'
            }
        },
        closeDialog() {
            const { commit } = this.$store
            commit('resetPassword/resetPasswordFailure', {
                isFailed: false,
                isLoading: false,
                isSuccess: false,
            })
            this.dialog = false
        },
    },
}
</script>

<style></style>
