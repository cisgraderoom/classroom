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
                    เข้าร่วมชั้นเรียน
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">เข้าร่วมชั้นเรียน</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="classcode"
                                    label="รหัสชั้นเรียน"
                                    :disabled="
                                        this.$store.state.joinClassroom
                                            .isLoading
                                    "
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.joinClassroom.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.joinClassroom.isLoading"
                        ></v-progress-linear>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closedialog"
                        :disabled="this.$store.state.joinClassroom.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.joinClassroom.isLoading"
                    >
                        เข้าร่วมชั้นเรียน
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'Joinclassroom',
    data: () => ({
        dialog: false,
        classcode: '',
        submitted: false,
        errormessage: '',
    }),

    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const { classcode } = this

            if (classcode == '') {
                this.errormessage = 'Please enter your Code Classroom'
                commit('joinClassroom/joinClassFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('joinClassroom/joinClassroom', {
                classcode,
            })
            if (state.joinClassroom.isFailed) {
                this.errormessage =
                    state.joinClassroom.message ??
                    'ไม่สามารถเข้าร่วมชั้นเรียนได้'
            }
        },
        closedialog() {
            this.classcode = ''
            this.dialog = false
        },
    },
}
</script>

<style></style>
