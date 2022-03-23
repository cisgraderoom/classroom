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
                                        :items="list_item"
                                        item-text="problem_name"
                                        item-value="problem_id"
                                        v-model="problemid"
                                        label="โจทย์"
                                        :disabled="
                                            this.$store.state
                                                .addRecheckPlagiarism.isLoading
                                        "
                                    >
                                    </v-select>
                                    <v-select
                                        :items="typecheck"
                                        item-text="text"
                                        item-value="type"
                                        v-model="type"
                                        label="ประเภทที่จะตรวจ"
                                        :disabled="
                                            this.$store.state
                                                .addRecheckPlagiarism.isLoading
                                        "
                                    >
                                    </v-select>
                                    <v-text-field
                                        v-model="checkconfirm"
                                        label="พิมคำว่า ยืนยัน"
                                        :disabled="
                                            this.$store.state
                                                .addRecheckPlagiarism.isLoading
                                        "
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="error"
                            v-show="
                                this.$store.state.addRecheckPlagiarism.isFailed
                            "
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-container>
                    <v-progress-linear
                        class="mt-2"
                        indeterminate
                        color="primary"
                        v-show="
                            this.$store.state.addRecheckPlagiarism.isLoading
                        "
                    ></v-progress-linear>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closedialog">
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="
                            this.$store.state.addRecheckPlagiarism.isLoading
                        "
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
    props: ['list_item'],
    data: () => ({
        dialog: false,
        problemid: null,
        typecheck: [
            { text: 'ตรวจใหม่', type: 'recheck' },
            { text: 'ตรวจความคล้ายคลึง', type: 'plagiarism' },
        ],
        type: null,
        checkconfirm: null,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            // const { commit } = this.$store
            this.submitted = true
            const { problemid, checkconfirm, typecheck } = this
            console.log(this.problemid)
            if (problemid == null) {
                this.errormessage = 'โปรดเลือกโจทย์ที่ต้องการตรวจ'
                commit('addRecheckPlagiarism/addRecheckPlagiarismFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (typecheck == null) {
                this.errormessage = 'โปรดเลือกประเภทที่ต้องการตรวจ'
                commit('addRecheckPlagiarism/addRecheckPlagiarismFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (checkconfirm != 'ยืนยัน') {
                this.errormessage = 'โปรดพิมคำว่า ยืนยัน'
                commit('addRecheckPlagiarism/addRecheckPlagiarismFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (
                problemid != '' &&
                typecheck != '' &&
                checkconfirm == 'ยืนยัน'
            ) {
                await dispatch('addRecheckPlagiarism/addRecheckPlagiarism', {
                    problem_id: problemid,
                    type: this.type,
                })
                if (state?.addRecheckPlagiarism?.isFailed) {
                    this.errormessage = 'ไม่สามารถสร้างชั้นเรียนได้'
                    commit('addRecheckPlagiarism/addRecheckPlagiarismFailure', {
                        isFailed: true,
                        isLoading: false,
                        isSuccess: false,
                    })
                }
                if (state?.addRecheckPlagiarism?.isSuccess) {
                    this.dialog = false
                    this.closedialog()
                }
            }
        },
        closedialog() {
            const { commit } = this.$store
            this.classname = ''
            this.section = 1
            this.year = 2564
            this.term = 1
            this.submitted = false
            commit('addRecheckPlagiarism/addRecheckPlagiarismFailure', {
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
