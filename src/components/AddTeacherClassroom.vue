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
                    เชิญอาจารย์
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">เชิญอาจารย์เข้าชั้นเรียน</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="username"
                                    label="ชื่อผู้ใช้อาจารย์"
                                    :disabled="
                                        this.$store.state.addTeacherClassroom
                                            .isLoading
                                    "
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-alert
                            text
                            type="error"
                            v-show="
                                this.$store.state.addTeacherClassroom.isFailed
                            "
                        >
                            {{ errormessage }}
                        </v-alert>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="
                                this.$store.state.addTeacherClassroom.isLoading
                            "
                        ></v-progress-linear>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closedialog"
                        :disabled="
                            this.$store.state.addTeacherClassroom.isLoading
                        "
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="
                            this.$store.state.addTeacherClassroom.isLoading
                        "
                    >
                        เชิญเข้าชั้นเรียน
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'AddTeacherClassroom',
    data: () => ({
        dialog: false,
        username: '',
        submitted: false,
        errormessage: '',
    }),

    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            const classcode = this.$route.params.code
            this.submitted = true
            const { username } = this

            if (username == '') {
                this.errormessage = 'โปรดใส่ชื่อผู้ใช้'
                commit('addTeacherClassroom/addTeacherClassroomFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addTeacherClassroom/addTeacherClassroom', {
                classcode,
                username,
            })
            if (state.addTeacherClassroom.isFailed) {
                this.errormessage =
                    state.addTeacherClassroom.message ??
                    'ไม่สามารถเพิ่มผู้ใช้นี้ได้'
                return
            }
            if (state.addTeacherClassroom.isSuccess) {
                this.username = ''
                this.dialog = false
                this.$emit('getList')
            }
        },
        closedialog() {
            this.username = ''
            this.dialog = false
        },
    },
}
</script>

<style></style>
