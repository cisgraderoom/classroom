<template>
    <v-col md="4" xl="2" class="mx-auto">
        <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
            <v-col>
                <h3>เพิ่มผู้ใช้งาน</h3>
            </v-col>
            <v-col>
                <input type="file" @change="onFileChange($event)" />
            </v-col>
            <v-alert
                text
                type="info"
                v-show="this.$store.state.addUser.isLoading"
            >
                กำลังเพิ่มผู้ใช้งาน
            </v-alert>
            <v-alert
                text
                type="error"
                v-show="this.$store.state.addUser.isFailed"
            >
                {{ errormessage }}
            </v-alert>
            <v-alert
                text
                type="success"
                v-show="this.$store.state.addUser.isSuccess"
            >
                เพิ่มผู้ใช้งานแล้ว
            </v-alert>
            <div class="d-flex justify-end">
                <v-btn color="primary" @click="handleSubmit"
                    >เพิ่มผู้ใช้งาน</v-btn
                >
            </div>
        </v-sheet>
    </v-col>
</template>

<script>
export default {
    name: 'AddAccount',
    data: () => ({
        userfile: null,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        onFileChange(event) {
            this.userfile = event.target.files[0]
        },
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            if (this.userfile == null) {
                this.errormessage = 'โปรดแนบไฟล์.csv'
                commit('addUser/addUserFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addUser/addUser', this.userfile)
            if (state.addUser.isFailed) {
                this.errormessage = state.addUser.error ?? 'ไม่สามารถอัพโหลดได้'
            }
            this.userfile = null
        },
    },
}
</script>

<style></style>
