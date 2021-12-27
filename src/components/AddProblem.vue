<template>
    <div>
        <v-row>
            <v-col md="9" class="mx-auto" xl="5">
                <h2 class="my-2">เพิ่มโจทย์</h2>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="9" class="mx-auto" xl="5"
                    ><v-sheet
                        class="px-7 py-7 rounded white mb-5"
                        elevation="3"
                    >
                        <v-text-field
                            v-model="problemsname"
                            label="ชื่อโจทย์"
                        ></v-text-field>
                        <v-textarea
                            v-model="problemstext"
                            label="รายละเอียดโจทย์"
                        ></v-textarea>
                        <v-text-field
                            label="คะแนนเต็ม"
                            v-model="maxscore"
                            type="number"
                        ></v-text-field>
                        <v-switch
                            color="primary"
                            v-model="type"
                            :label="`ประเภทโจทย์ : ${typetext}`"
                            @click="changeType()"
                        ></v-switch>
                        <v-file-input
                            accept="image/*,application/*,.pdf,.html,.css,.json,.txt"
                            label="แนบไฟล์"
                            v-model="asset"
                            counter
                            multiple
                            show-size
                        ></v-file-input>
                        <div v-show="type == true">
                            <v-file-input
                                accept=".zip"
                                label="แนบไฟล์ TestCase .zip"
                                show-size
                                v-model="testcase"
                            ></v-file-input>
                            <p>
                                ตัวอย่างไฟล์
                                <a
                                    href="https://drive.google.com/file/d/1hxuJJ_AstQBmwu5zSbeTrEjxxddBwZqp/view?usp=sharing"
                                    target="_blank"
                                    >testcase.zip</a
                                >
                            </p>
                        </div>
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="opendate"
                                    label="วันที่เปิดโจทย์"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="opendate"
                                @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="closedate"
                                    label="วันที่ปิดโจทย์"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="closedate"
                                @input="menu2 = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-alert
                            text
                            type="info"
                            v-show="this.$store.state.addProblem.isLoading"
                        >
                            กำลังเพิ่มโจทย์
                        </v-alert>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.addProblem.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                        <div class="d-flex justify-end">
                            <v-btn color="primary" @click="handleSubmit"
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
        type: false,
        typetext: 'manual',
        asset: null,
        testcase: null,
        menu: false,
        menu2: false,
        opendate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        closedate: null,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        changeType() {
            if (this.type == true) {
                this.typetext = 'auto'
            } else {
                this.typetext = 'manual'
                this.testcase = null
            }
        },

        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            console.log(this.asset)
            console.log(this.testcase)
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
            await dispatch(
                'addProblem/addProblem',
                {
                    problemName: this.problemsname,
                    problemDesc: this.problemstext,
                    score: this.maxscore,
                    type: this.type,
                    classcode,
                    open: this.opendate,
                    close: this.closedate,
                },
                this.asset,
                this.testcase
            )
            if (state.addProblem.isFailed) {
                this.errormessage =
                    state.addProblem.message ?? 'ไม่สามารถโพสต์ได้'
            }
            this.text = ''
        },
    },
}
</script>

<style></style>
