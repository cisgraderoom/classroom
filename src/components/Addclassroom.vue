<template>
    <v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    elevation="2"
                    color="secondary"
                    block
                    v-bind="attrs"
                    v-on="on"
                >
                    Add Classroom
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Add Classroom</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="classname"
                                        label="Classroom name"
                                        required
                                    ></v-text-field>
                                    <v-select
                                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                                        :value="1"
                                        v-model="section"
                                        label="Section"
                                    >
                                    </v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="[2565, 2564, 2563]"
                                        :value="2564"
                                        v-model="year"
                                        label="Year"
                                    ></v-select> </v-col
                                ><v-col cols="12" sm="6">
                                    <v-select
                                        :items="[1, 2, 3]"
                                        :value="1"
                                        v-model="term"
                                        label="Term"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="info"
                            v-show="this.$store.state.createClassroom.isLoading"
                        >
                            กำลังสร้างชั้นเรียน
                        </v-alert>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.createClassroom.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closedialog">
                        Close
                    </v-btn>
                    <v-btn color="primary" text @click="handleSubmit">
                        Add Classroom
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'Addclassroom',
    data: () => ({
        dialog: false,
        classname: '',
        section: 1,
        year: 2564,
        term: 1,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const { classname, section, year, term } = this
            if (classname == '' && section == '' && year == '' && term == '') {
                this.errormessage = 'Please enter your infomation'
                commit('createClassroom/createClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (classname == '') {
                this.errormessage = 'Please enter Classroom name'
                commit('createClassroom/createClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (year == '') {
                this.errormessage = 'Please enter Classroom Year'
                commit('createClassroom/createClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
            }
            if (classname != '' && year != '') {
                await dispatch('createClassroom/createClassroom', {
                    classname,
                    section,
                    year,
                    term,
                })
                if (state?.createClassroom?.isFailed) {
                    this.errormessage = 'ไม่สามารถสร้างชั้นเรียนได้'
                    commit('createClassroom/createClassFailure', {
                        isFailed: true,
                        isLoading: false,
                        isSuccess: false,
                    })
                }
                if (state?.createClassroom?.isSuccess) {
                    this.dialog = false
                    this.closedialog()
                }
            }
        },
        closedialog() {
            this.classname = ''
            this.section = 1
            this.year = 2564
            this.term = 1
            this.submitted = false
            this.dialog = false
        },
    },
}
</script>

<style></style>
