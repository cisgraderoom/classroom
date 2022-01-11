<template>
    <div>
        <v-dialog v-model="dialog" max-width="450">
            <template v-slot:activator="{ on, attrs }">
                <v-btn small icon v-bind="attrs" v-on="on"
                    ><v-icon> mdi-account-edit </v-icon></v-btn
                >
            </template>
            <v-card>
                <v-card-title>
                    <span class="cis-h5">แก้ไขผู้ใช้</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="username"
                                        label="Username"
                                        disabled
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editname"
                                        label="name"
                                        :disabled="
                                            this.$store.state.editUser.isLoading
                                        "
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="[
                                            'student',
                                            'teacher',
                                            'superteacher',
                                        ]"
                                        v-model="editrole"
                                        label="Role"
                                        :disabled="
                                            this.$store.state.editUser.isLoading
                                        "
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.editUser.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-container>
                    <v-progress-linear
                        class="mt-2"
                        indeterminate
                        color="primary"
                        v-show="this.$store.state.editUser.isLoading"
                    ></v-progress-linear>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="closeDialog"
                        :disabled="this.$store.state.editUser.isLoading"
                    >
                        ยกเลิก
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="handleSubmit"
                        :disabled="this.$store.state.editUser.isLoading"
                    >
                        แก้ไข
                    </v-btn>
                </v-card-actions>
                <v-alert
                    text
                    type="error"
                    v-show="this.$store.state.editUser.isFailed"
                >
                    {{ errormessage }}
                </v-alert>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'editUser',
    props: ['username', 'name', 'role'],
    data() {
        return {
            dialog: false,
            status: true,
            editname: this.name,
            editrole: this.role,
            errormessage: '',
        }
    },
    methods: {
        async handleSubmit() {
            const { dispatch, state } = this.$store
            const { username, editname, editrole, status } = this
            await dispatch('editUser/editUser', {
                username,
                name: editname,
                role: editrole,
                status,
            })
            if (state.editUser.isSuccess) {
                this.dialog = false
                this.$emit('getList')
            }
            if (state.editUser.isFailed) {
                this.errormessage =
                    state.editUser.message ?? 'ไม่สามารถแก้ไขได้'
            }
        },
        closeDialog() {
            const { commit } = this.$store
            commit('editUser/editUserFailure', {
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
