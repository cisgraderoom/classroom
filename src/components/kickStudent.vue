<template>
    <div>
        <v-dialog v-model="dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                    :disabled="username == myusername || is_delete == 1"
                    >ลบออก</v-btn
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">ลบออกจากชั่นเรียน</span>
                </v-card-title>
                <v-card-text
                    >ต้องการที่จะลบ<br />
                    {{ username }} ออกจากชั่นเรียนนี้ใช่หรือไม่</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="closeDialog"
                        :disabled="this.$store.state.kickStudent.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.kickStudent.isLoading"
                    >
                        ใช่
                    </v-btn>
                </v-card-actions>
                <v-alert
                    text
                    type="error"
                    v-show="this.$store.state.kickStudent.isFailed"
                >
                    {{ errormessage }}
                </v-alert>
                <v-progress-linear
                    indeterminate
                    color="red"
                    v-show="this.$store.state.kickStudent.isLoading"
                ></v-progress-linear>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'kickClassroom',
    props: ['username', 'is_delete'],
    data() {
        return {
            myusername: JSON.parse(localStorage.getItem('user')).username,
            dialog: false,
            errormessage: '',
        }
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state } = this.$store
            const classcode = this.$route.params.code
            const { username } = this
            await dispatch('kickStudent/kickStudent', {
                classcode,
                username,
            })
            if (state.kickStudent.isSuccess) {
                this.dialog = false
                this.$emit('getList')
            }

            if (state.kickStudent.isFailed) {
                this.errormessage =
                    state.kickStudent.message ?? 'ไม่สามารถเตะออกได้'
            }
        },
        closeDialog() {
            const { commit } = this.$store
            commit('kickStudent/kickStudentFailure', {
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
