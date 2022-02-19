<template>
    <div>
        <v-row>
            <v-col md="9" xl="5">
                <h2 class="my-2">จัดการห้องเรียน</h2>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="10" xl="9"
                    ><v-sheet
                        class="px-7 py-7 rounded white mb-5"
                        elevation="3"
                    >
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
                            <template v-slot:[`item.kick_classroom`]="{ item }">
                                <kickStudent
                                    :username="item.username"
                                    @getList="getListUser"
                                />
                            </template>
                        </v-data-table>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.listAllUser.isLoading"
                        ></v-progress-linear>
                        <!-- <div class="text-center pt-2">
                            <v-pagination
                                v-model="pageCount"
                                :disabled="
                                    this.$store.state.listAllUser.isLoading
                                "
                                :length="totalPage"
                                :total-visible="7"
                                @input="handlePageChange"
                            ></v-pagination>
                        </div> -->
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.listAllUser.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-sheet></v-col
                >
            </v-row>
        </div>
    </div>
</template>

<script>
import kickStudent from './kickStudent.vue'
export default {
    name: 'EditClassroom',
    components: { kickStudent },
    // mounted() {
    //     this.getListUser()
    // },
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
                    text: 'Kick',
                    value: 'kick_classroom',
                    sortable: false,
                },
            ],
            listuser: [],
            errormessage: null,
        }
    },
    // methods: {
    // async getListUser() {
    //     const { dispatch, state } = this.$store
    //     const { currentPage } = this
    //     await dispatch('listAllUser/listAllUser', {
    //         currentPage,
    //     }).then(() => {
    //         this.listuser = state.listAllUser.listUser
    //         this.totalPage = Math.ceil(state.listAllUser.totalUser / 20)
    //         this.hasNext = state.listAllUser.hasNext
    //         this.upDateKey += 1
    //     })
    //     if (state.listAllUser.isFailed) {
    //         this.errormessage =
    //             state.listAllUser.message ?? 'ไม่สามารถโหลดข้อมูลได้'
    //     }
    // },
    // handlePageChange(value) {
    //     if (this.currentPage != value) {
    //         this.currentPage = value
    //         this.getListUser()
    //     }
    // },
    // },
}
</script>

<style></style>
