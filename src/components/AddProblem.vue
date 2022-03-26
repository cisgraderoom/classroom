<template>
    <div>
        <v-row>
            <v-col md="9" xl="5">
                <h2 class="my-2">เพิ่มโจทย์</h2>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="10" xl="9"
                    ><v-sheet
                        class="px-7 py-7 rounded white mb-5"
                        elevation="3"
                    >
                        <v-text-field
                            v-model="problemsname"
                            label="ชื่อโจทย์"
                            :disabled="this.$store.state.addProblem.isLoading"
                        ></v-text-field>
                        <v-textarea
                            v-model="problemstext"
                            label="รายละเอียดโจทย์"
                            :disabled="this.$store.state.addProblem.isLoading"
                        ></v-textarea>
                        <v-text-field
                            label="คะแนนเต็ม"
                            v-model="maxscore"
                            type="number"
                            :disabled="this.$store.state.addProblem.isLoading"
                        ></v-text-field>
                        <v-file-input
                            accept="image/*,application/*,.pdf,.html,.css,.json,.txt,.zip"
                            label="แนบไฟล์"
                            v-model="asset"
                            :disabled="this.$store.state.addProblem.isLoading"
                            show-size
                        ></v-file-input>
                        <v-file-input
                            accept=".zip"
                            label="แนบไฟล์ TestCase .zip"
                            show-size
                            v-model="testcase"
                            :disabled="this.$store.state.addProblem.isLoading"
                        ></v-file-input>
                        <v-text-field
                            label="จำกัดเวลาตรวจ 1-10 (วินาที)"
                            v-model="timelimit"
                            type="number"
                            min="1"
                            max="10"
                            :disabled="this.$store.state.addProblem.isLoading"
                        ></v-text-field>
                        <v-text-field
                            label="จำกัดหน่วยความจำตรวจ 1-256 (MB)"
                            v-model="memlimit"
                            type="number"
                            min="1"
                            max="256"
                            :disabled="this.$store.state.addProblem.isLoading"
                        ></v-text-field>
                        <p>
                            ตัวอย่างไฟล์
                            <a
                                href="https://drive.google.com/file/d/1hxuJJ_AstQBmwu5zSbeTrEjxxddBwZqp/view?usp=sharing"
                                target="_blank"
                                >testcase.zip</a
                            >
                        </p>
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            :disabled="this.$store.state.addProblem.isLoading"
                        >
                            <template v-slot:activator="{ on, attrs }">
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
                            :disabled="this.$store.state.addProblem.isLoading"
                        >
                            <template v-slot:activator="{ on, attrs }">
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
                        <v-alert
                            text
                            type="success"
                            v-show="this.$store.state.addProblem.isSuccess"
                        >
                            เพิ่มโจทย์แล้ว
                        </v-alert>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.addProblem.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.addProblem.isLoading"
                        ></v-progress-linear>
                        <div class="d-flex justify-end mt-2">
                            <v-btn
                                color="primary"
                                @click="handleSubmit"
                                :disabled="
                                    this.$store.state.addProblem.isLoading
                                "
                                >เพิ่มโจทย์</v-btn
                            >
                        </div>
                    </v-sheet></v-col
                >
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddProblem',
    data: () => ({
        problemsname: '',
        problemstext: '',
        maxscore: null,
        typetext: 'auto',
        asset: null,
        testcase: null,
        memlimit: null,
        timelimit: null,
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
    methods: {
        setOpen() {
            this.opendatetime = this.opendate + ' ' + this.opentime
            this.menu = false
        },
        setClose() {
            this.closedatetime = this.closedate + ' ' + this.closetime
            this.menu2 = false
        },
        resetInput() {
            this.problemsname = ''
            this.problemstext = ''
            this.maxscore = null
            this.asset = null
            this.testcase = null
            this.menu = false
            this.menu2 = false
            this.memlimit = null
            this.timelimit = null
            this.opendate = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10)
            this.opentime = '00:00'
            this.opendatetime =
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10) +
                ' ' +
                '00:00'
            this.closedate = new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10)
            this.closetime = '00:00'
            this.closedatetime =
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10) +
                ' ' +
                '00:00'
        },
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = state.getInfoClassroom.data.classcode
            if (this.problemsname == '') {
                this.errormessage = 'โปรดเขียนชื่อโจทย์ที่ต้องการ'
                commit('addProblem/addProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (this.maxscore == null) {
                this.errormessage = 'โปรดระบุคะแนนเต็มของโจทย์'
                commit('addProblem/addProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (this.type == true && this.testcase == null) {
                this.errormessage = 'โปรดแนบไฟล์ Testcase'
                commit('addProblem/addProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            const formatopentime = Math.round(
                new Date(this.opendatetime).getTime() / 1000
            )
            const formatclosetime = Math.round(
                new Date(this.closedatetime).getTime() / 1000
            )
            if (formatclosetime <= formatopentime) {
                this.errormessage = 'เวลาปิดโจทย์ต้องมากกว่าเวลาเปิดโจทย์'
                commit('addProblem/addProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (this.memlimit == null || this.timelimit == null) {
                this.errormessage =
                    'โปรดใส่ จำกัดเวลาตรวจ และ จำกัดหน่วยความจำตรวจ'
                commit('addProblem/addProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            if (
                this.memlimit > 256 ||
                this.timelimit > 10 ||
                this.memlimit == 0 ||
                this.timelimit == 0
            ) {
                this.errormessage =
                    'โปรดใส่ จำกัดเวลาตรวจ และ จำกัดหน่วยความจำตรวจ ให้ตรงเงือนไข'
                commit('addProblem/addProblemFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addProblem/addProblem', {
                problemName: this.problemsname,
                problemDesc: this.problemstext,
                score: this.maxscore,
                classcode,
                open: formatopentime,
                close: formatclosetime,
                asset: this.asset,
                testcase: this.testcase,
                time_limit: this.timelimit,
                mem_limit: this.memlimit,
            })
            if (state.addProblem.isFailed) {
                this.errormessage =
                    state.addProblem.message ?? 'ไม่สามารถสร้างโจทย์ได้'
            }
            if (state.addProblem.isSuccess) {
                this.resetInput()
            }
        },
    },
}
</script>

<style></style>
