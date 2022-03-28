<template>
    <v-row
        ><v-col md="12" class="mx-auto" xl="10">
            <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                <v-col>
                    <h3>ผู้ใช้งานทั้งหมด</h3>
                </v-col>

                <v-row class="mx-auto align-center">
                    <v-col>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา ชื่อ หรือ ชื่อผู้ใช้"
                            v-on:keyup.enter="getListUser"
                            :disabled="this.$store.state.listAllUser.isLoading"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn
                            color="primary"
                            @click="getListUser"
                            :disabled="this.$store.state.listAllUser.isLoading"
                            >ค้นหา</v-btn
                        >
                    </v-col>
                </v-row>

                <v-data-table
                    :headers="headers"
                    :items="listuser"
                    :page.sync="currentPage"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    :loading="this.$store.state.listAllUser.isLoading"
                    loading-text="กำลังโหลด...."
                    class="elevation-1"
                    @page-count="pageCount = $event"
                >
                    <template v-slot:[`item.reset_password`]="{ item }">
                        <resetPassword
                            :username="item.username"
                            @getList="getListUser"
                        />
                    </template>
                    <template v-slot:[`item.edit_user`]="{ item }">
                        <editUser
                            :username="item.username"
                            :name="item.name"
                            :role="item.role"
                            @getList="getListUser"
                        />
                    </template>
                </v-data-table>
                <v-progress-linear
                    indeterminate
                    color="primary"
                    v-show="this.$store.state.listAllUser.isLoading"
                ></v-progress-linear>
                <div class="text-center pt-2">
                    <v-pagination
                        v-model="pageCount"
                        :disabled="this.$store.state.listAllUser.isLoading"
                        :length="totalPage"
                        :total-visible="7"
                        @input="handlePageChange"
                    ></v-pagination>
                </div>
                <v-alert
                    text
                    type="error"
                    v-show="this.$store.state.listAllUser.isFailed"
                >
                    {{ errormessage }}
                </v-alert>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import resetPassword from './resetPassword'
import editUser from './editUser.vue'
export default {
    name: 'AllUser',
    components: {
        resetPassword,
        editUser,
    },
    mounted() {
        this.getListUser()
    },
    data() {
        return {
            currentPage: 1,
            pageCount: 1,
            totalPage: 1,
            itemsPerPage: 20,
            headers: [
                {
                    text: 'ชื่อ',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Username', value: 'username', sortable: false },
                { text: 'Role', value: 'role', sortable: false },
                {
                    text: 'Reset Password',
                    value: 'reset_password',
                    sortable: false,
                },
                { text: 'Edit', value: 'edit_user', sortable: false },
            ],
            listuser: [],
            search: null,
            errormessage: null,
        }
    },
    methods: {
        async getListUser() {
            const { dispatch, state } = this.$store
            const { currentPage, search } = this
            await dispatch('listAllUser/listAllUser', {
                currentPage,
                search,
            }).then(() => {
                this.listuser = state.listAllUser.listUser
                this.totalPage = Math.ceil(state.listAllUser.totalUser / 20)
                this.hasNext = state.listAllUser.hasNext
                this.upDateKey += 1
            })
            if (state.listAllUser.isFailed) {
                this.errormessage =
                    state.listAllUser.message ?? 'ไม่สามารถโหลดข้อมูลได้'
            }
        },
        handlePageChange(value) {
            if (this.currentPage != value) {
                this.currentPage = value
                this.getListUser()
            }
        },
    },
}
</script>

<style></style>
