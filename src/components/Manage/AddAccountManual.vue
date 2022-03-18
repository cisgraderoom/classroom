<template>
    <v-col md="5" xl="4" class="mx-auto">
        <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
            <v-col>
                <h3>เพิ่มผู้ใช้งาน</h3>
                <v-text-field
                    class="mt-0"
                    v-model="name"
                    label="ชื่อ"
                    :disabled="this.$store.state.addUserManual.isLoading"
                ></v-text-field>
                <v-select
                    class="mt-0"
                    :items="['student', 'teacher', 'superteacher']"
                    v-model="role"
                    label="Role"
                    :disabled="this.$store.state.addUserManual.isLoading"
                ></v-select>
                <v-text-field
                    class="mt-0"
                    v-model="username"
                    label="Username"
                    :disabled="this.$store.state.addUserManual.isLoading"
                ></v-text-field>
                <v-text-field
                    class="mt-0"
                    v-model="password"
                    type="password"
                    label="Password"
                    :disabled="this.$store.state.addUserManual.isLoading"
                ></v-text-field>
            </v-col>
            <v-alert
                text
                type="error"
                v-show="this.$store.state.addUserManual.isFailed"
            >
                {{ errormessage }}
            </v-alert>
            <v-alert
                text
                type="success"
                v-show="this.$store.state.addUserManual.isSuccess"
            >
                เพิ่มผู้ใช้งานแล้ว
            </v-alert>
            <v-progress-linear
                indeterminate
                color="primary"
                v-show="this.$store.state.addUserManual.isLoading"
            ></v-progress-linear>
            <div class="d-flex justify-end mt-0">
                <v-btn color="primary" @click="handleSubmit"
                    >เพิ่มผู้ใช้งาน</v-btn
                >
            </div>
        </v-sheet>
    </v-col>
</template>

<script>
export default {
    name: 'AddAccountManual',
    data: () => ({
        name: null,
        role: null,
        username: null,
        password: null,
        status: true,
        submitted: false,
        errormessage: '',
    }),
    methods: {
        async handleSubmit() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const { name, role, username, password, status } = this
            if (
                this.name == null ||
                this.role == null ||
                this.username == null ||
                this.password == null
            ) {
                this.errormessage = 'โปรดกรอกข้อมูลให้ครบ'
                commit('addUserManual/addUserManualFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
            await dispatch('addUserManual/addUserManual', {
                name,
                role,
                username,
                password,
                status,
            }).then(() => {
                this.name = null
                this.role = null
                this.username = null
                this.password = null
                this.$emit('getlist')
            })
            if (state.addUser.isFailed) {
                this.errormessage = state.addUser.error ?? 'ไม่สามารถอัพโหลดได้'
            }
        },
    },
}
</script>

<style>
.text-xs-right {
    white-space: nowrap;
}
</style>
