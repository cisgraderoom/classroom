<template>
    <v-col md="5" xl="4" class="mx-auto">
        <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
            <v-col>
                <h3>เพิ่มผู้ใช้งาน(แนบไฟล์)</h3>
                <p class="mt-2">แนบไฟล์นามสกุล .csv</p>
                <p>
                    ตัวอย่างไฟล์
                    <a
                        href="https://drive.google.com/file/d/1jh-IG-t_qOS_zTDMHDKeSwIK07j3bezB/view?usp=sharing"
                        target="_blank"
                        >student.csv</a
                    >
                </p>
            </v-col>
            <v-col>
                <input
                    type="file"
                    @change="onFileChange($event)"
                    accept=".csv"
                    :disabled="this.$store.state.addUser.isLoading"
                />
            </v-col>
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
            <v-progress-linear
                indeterminate
                color="primary"
                v-show="this.$store.state.addUser.isLoading"
            ></v-progress-linear>
            <div class="d-flex justify-end mt-2">
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
            this.$emit('getlist')
        },
    },
}
</script>

<style>
.text-xs-right {
    white-space: nowrap;
}
</style>
