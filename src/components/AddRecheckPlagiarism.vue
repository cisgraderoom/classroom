<template>
    <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn elevation="2" color="primary" v-bind="attrs" v-on="on">
                    เริ่มตรวจ
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">เริ่มตรวจ</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-select
                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                                        :value="1"
                                        v-model="problem"
                                        label="โจทย์"
                                        :disabled="
                                            this.$store.state.createClassroom
                                                .isLoading
                                        "
                                    >
                                    </v-select>
                                    <v-select
                                        :items="[
                                            'ตรวจใหม่',
                                            'ตรวจความคล้ายคลึง',
                                        ]"
                                        v-model="typecheck"
                                        label="ประเภทที่จะตรวจ"
                                        :disabled="
                                            this.$store.state.createClassroom
                                                .isLoading
                                        "
                                    >
                                    </v-select>
                                    <v-text-field
                                        v-model="checkconfirm"
                                        label="พิมคำว่า ยืนยัน"
                                        :disabled="
                                            this.$store.state.createClassroom
                                                .isLoading
                                        "
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.createClassroom.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-container>
                    <v-progress-linear
                        class="mt-2"
                        indeterminate
                        color="primary"
                        v-show="this.$store.state.createClassroom.isLoading"
                    ></v-progress-linear>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closedialog"
                        :disabled="this.$store.state.createClassroom.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.createClassroom.isLoading"
                    >
                        ตรวจ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'AddRecheckPlagiarism',
    data: () => ({
        dialog: false,
        problem: null,
        typecheck: null,
        checkconfirm: null,
        term: 1,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        async handleSubmit() {
            // const { dispatch, state, commit } = this.$store
            const { commit } = this.$store
            this.submitted = true
            const { problem, checkconfirm, typecheck } = this
            if (problem == null) {
                this.errormessage = 'โปรดเลือกโจทย์ที่ต้องการตรวจ'
                commit('createClassroom/createClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (typecheck == null) {
                this.errormessage = 'โปรดเลือกประเภทที่ต้องการตรวจ'
                commit('createClassroom/createClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (checkconfirm != 'ยืนยัน') {
                this.errormessage = 'โปรดพิมคำว่า ยืนยัน'
                commit('createClassroom/createClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            // if (problem != '' && typecheck != '' && checkconfirm == 'ยืนยัน') {
            //     await dispatch('createClassroom/createClassroom', {
            //         problem,
            //         typecheck,
            //     })
            //     if (state?.createClassroom?.isFailed) {
            //         this.errormessage = 'ไม่สามารถสร้างชั้นเรียนได้'
            //         commit('createClassroom/createClassFailure', {
            //             isFailed: true,
            //             isLoading: false,
            //             isSuccess: false,
            //         })
            //     }
            //     if (state?.createClassroom?.isSuccess) {
            //         this.dialog = false
            //         this.closedialog()
            //     }
            // }
        },
        closedialog() {
            const { commit } = this.$store
            this.classname = ''
            this.section = 1
            this.year = 2564
            this.term = 1
            this.submitted = false
            commit('createClassroom/createClassFailure', {
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
