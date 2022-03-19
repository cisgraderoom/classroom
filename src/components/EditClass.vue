<template>
    <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    elevation="2"
                    color="primary"
                    block
                    v-bind="attrs"
                    v-on="on"
                >
                    แก้ไขชั้นเรียน
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">แก้ไขชั้นเรียน</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="classname"
                                        label="ชื่อชั้นเรียน"
                                        :disabled="
                                            this.$store.state.getInfoClassroom
                                                .isLoading ||
                                            this.$store.state.editClass
                                                .isLoading
                                        "
                                        required
                                    ></v-text-field>
                                    <v-select
                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                                        :value="1"
                                        v-model="section"
                                        label="ตอนเรียน"
                                        :disabled="
                                            this.$store.state.getInfoClassroom
                                                .isLoading ||
                                            this.$store.state.editClass
                                                .isLoading
                                        "
                                    >
                                    </v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="[2565, 2564, 2563]"
                                        :value="2564"
                                        v-model="year"
                                        label="ปีการศึกษา"
                                        :disabled="
                                            this.$store.state.getInfoClassroom
                                                .isLoading ||
                                            this.$store.state.editClass
                                                .isLoading
                                        "
                                    ></v-select> </v-col
                                ><v-col cols="12" sm="6">
                                    <v-select
                                        :items="[1, 2, 3]"
                                        :value="1"
                                        v-model="term"
                                        label="เทอม"
                                        :disabled="
                                            this.$store.state.getInfoClassroom
                                                .isLoading ||
                                            this.$store.state.editClass
                                                .isLoading
                                        "
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.getInfoClassroom.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-container>
                    <v-progress-linear
                        class="mt-2"
                        indeterminate
                        color="primary"
                        v-show="
                            this.$store.state.getInfoClassroom.isLoading ||
                            this.$store.state.editClass.isLoading
                        "
                    ></v-progress-linear>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closedialog"
                        :disabled="this.$store.state.editClass.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="
                            this.$store.state.getInfoClassroom.isLoading ||
                            this.$store.state.editClass.isLoading
                        "
                    >
                        แก้ไขชั้นเรียน
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'EditClass',
    props: ['classname', 'section', 'year', 'term'],
    data: () => ({
        dialog: false,
        classname: '',
        section: '',
        year: '',
        term: '',
        submitted: false,
        errormessage: '',
    }),
    mounted() {
        this.classname = this.$store.state.getInfoClassroom.data.classname
        this.section = this.$store.state.getInfoClassroom.data.section
        this.year = this.$store.state.getInfoClassroom.data.year
        this.term = this.$store.state.getInfoClassroom.data.term
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            const { classname, section, year, term } = this
            if (classname == '' && section == '' && year == '' && term == '') {
                this.errormessage = 'Please enter your infomation'
                commit('editClass/editClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (classname == '') {
                this.errormessage = 'Please enter Classroom name'
                commit('editClass/editClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (year == '') {
                this.errormessage = 'Please enter Classroom Year'
                commit('editClass/editClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (classname != '' && year != '') {
                await dispatch('editClass/editClass', {
                    classname,
                    section,
                    year,
                    term,
                    classcode,
                })
                if (state?.editClass?.isFailed) {
                    this.errormessage = 'ไม่สามารถแก้ไขชั้นเรียนได้'
                    commit('editClass/editClassFailure', {
                        isFailed: true,
                        isLoading: false,
                        isSuccess: false,
                    })
                }
                if (state?.editClass?.isSuccess) {
                    this.dialog = false
                }
            }
        },
    },
}
</script>

<style></style>
