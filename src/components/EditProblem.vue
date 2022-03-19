<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on">
                    <v-btn
                        elevation="2"
                        color="primary"
                        block
                        v-bind="attrs"
                        v-on="on"
                    >
                        แก้ไขโจทย์
                    </v-btn>
                </v-list-item-title>
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">แก้ไขโจทย์</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="problem_name"
                                        label="ชื่อโจทย์"
                                        :disabled="
                                            this.$store.state.editProblem
                                                .isLoading
                                        "
                                    ></v-text-field>
                                    <v-textarea
                                        v-model="problem_text"
                                        label="รายละเอียดโจทย์"
                                        :disabled="
                                            this.$store.state.editProblem
                                                .isLoading
                                        "
                                    ></v-textarea>
                                    <v-text-field
                                        label="คะแนนเต็ม"
                                        v-model="max_score"
                                        type="number"
                                        disabled
                                    ></v-text-field>
                                    <v-file-input
                                        accept="image/*,application/*,.pdf,.html,.css,.json,.txt,.zip"
                                        label="แนบไฟล์"
                                        v-model="asset"
                                        :disabled="
                                            this.$store.state.editProblem
                                                .isLoading
                                        "
                                        show-size
                                    ></v-file-input>
                                    <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        :disabled="
                                            this.$store.state.editProblem
                                                .isLoading
                                        "
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="opendatetime"
                                                label="วันที่เปิดโจทย์"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <div class="white">
                                            <v-date-picker
                                                v-model="opendate"
                                            ></v-date-picker>
                                            <v-time-picker
                                                v-model="opentime"
                                                format="24hr"
                                                small
                                                ><v-spacer></v-spacer>
                                                <b>{{
                                                    'วันเวลาเปิดโจทย์ ' +
                                                    opendate +
                                                    ' ' +
                                                    opentime
                                                }}</b>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="setOpen"
                                                >
                                                    OK
                                                </v-btn></v-time-picker
                                            >
                                        </div>
                                    </v-menu>
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        :disabled="
                                            this.$store.state.editProblem
                                                .isLoading
                                        "
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="closedatetime"
                                                label="วันที่ปิดโจทย์"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <div class="white">
                                            <v-date-picker
                                                v-model="closedate"
                                            ></v-date-picker>
                                            <v-time-picker
                                                v-model="closetime"
                                                format="24hr"
                                                small
                                                ><v-spacer></v-spacer>
                                                <b>{{
                                                    'วันเวลาเปิดโจทย์ ' +
                                                    closedate +
                                                    ' ' +
                                                    closetime
                                                }}</b>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="setClose"
                                                >
                                                    OK
                                                </v-btn></v-time-picker
                                            >
                                        </div>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.editProblem.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.editProblem.isLoading"
                        ></v-progress-linear>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closedialog"
                        :disabled="this.$store.state.editProblem.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.editProblem.isLoading"
                    >
                        แก้ไขโจทย์
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'EditProblem',
    props: [
        'problemname',
        'problemid',
        'problemtext',
        'open_date',
        'close_date',
        'maxscore',
    ],

    data: () => ({
        dialog: false,
        problem_name: null,
        problem_id: null,
        problem_text: null,
        asset: null,
        max_score: null,
        menu: false,
        menu2: false,
        opendate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        opentime: '00:00',
        opendatetime:
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10) +
            ' ' +
            '00:00',
        closedate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        closetime: '00:00',
        closedatetime:
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10) +
            ' ' +
            '00:00',
        submitted: false,
        errormessage: '',
    }),
    mounted() {
        if (this.open_date) {
            this.setdata()
        }
    },
    methods: {
        setdata() {
            this.problem_name = this.problemname
            this.problem_id = this.problemid
            this.problem_text = this.problemtext
            this.opendate = this.open_date.split(' ')[0]
            this.opentime = this.open_date.split(' ')[1]
            this.opendatetime = this.open_date
            this.closedate = this.close_date.split(' ')[0]
            this.closetime = this.close_date.split(' ')[1]
            this.closedatetime = this.close_date
            this.max_score = this.maxscore
        },

        setOpen() {
            this.opendatetime = this.opendate + ' ' + this.opentime
            this.menu = false
        },
        setClose() {
            this.closedatetime = this.closedate + ' ' + this.closetime
            this.menu2 = false
        },

        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const {
                problem_name,
                problem_id,
                problem_text,
                opendatetime,
                closedatetime,
                asset,
            } = this
            if (problem_name == '') {
                this.errormessage = 'Please enter your Text Post'
                commit('editProblem/editProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            const formatopentime = Math.round(
                new Date(opendatetime).getTime() / 1000
            )
            const formatclosetime = Math.round(
                new Date(closedatetime).getTime() / 1000
            )
            if (formatclosetime <= formatopentime) {
                this.errormessage = 'เวลาปิดโจทย์ต้องมากกว่าเวลาเปิดโจทย์'
                commit('editProblem/editProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (problem_name != '') {
                await dispatch('editProblem/editProblem', {
                    problemName: problem_name,
                    problemDesc: problem_text,
                    problemId: problem_id,
                    openat: formatopentime,
                    closeat: formatclosetime,
                    asset: asset,
                    classcode,
                })
                if (state?.editProblem?.isSuccess) {
                    this.closedialog()
                    this.$emit('getProblem')
                }
                if (state?.editProblem?.isFailed) {
                    this.errormessage =
                        state.editProblem.message ?? 'ไม่สามารถแก้ไขโพสต์ได้'
                }
            }
        },
        closedialog() {
            const { commit } = this.$store
            commit('editProblem/editProblemFailure', {
                isFailed: false,
                isLoading: false,
                isSuccess: false,
            })
            this.setdata()
            this.dialog = false
        },
    },
}
</script>

<style></style>
