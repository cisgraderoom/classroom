<template>
    <div>
        <v-row>
            <v-col md="8" xl="7">
                <h2 class="my-2">จัดการห้องเรียน</h2>
            </v-col>
            <v-col md="2" xl="2" class="mt-5 mx-md-5 mx-lg-10 mx-xl-n2">
                <AddTeacherClassroom @getList="getListUser" />
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="10" xl="9"
                    ><v-sheet
                        class="px-7 py-7 rounded white mb-5"
                        elevation="3"
                    >
                        <br />
                        <v-data-table
                            :headers="headers"
                            :items="listuser"
                            :page.sync="currentPage"
                            :items-per-page="itemsPerPage"
                            hide-default-footer
                            :loading="
                                this.$store.state.listUserInClass.isLoading
                            "
                            loading-text="กำลังโหลด...."
                            class="elevation-1"
                            @page-count="pageCount = $event"
                        >
                            <template v-slot:[`item.kick_classroom`]="{ item }">
                                <kickStudent
                                    :username="item.username"
                                    @getList="getListUser"
                                    :is_delete="item.is_delete"
                                />
                            </template>
                        </v-data-table>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="this.$store.state.listUserInClass.isLoading"
                        ></v-progress-linear>
                        <div class="text-center pt-2">
                            <v-pagination
                                v-model="pageCount"
                                :disabled="
                                    this.$store.state.listUserInClass.isLoading
                                "
                                :length="totalPage"
                                :total-visible="7"
                                @input="handlePageChange"
                            ></v-pagination>
                        </div>
                        <v-alert
                            text
                            type="error"
                            v-show="this.$store.state.listUserInClass.isFailed"
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
import AddTeacherClassroom from './AddTeacherClassroom.vue'
export default {
    name: 'EditClassroom',
    components: { kickStudent, AddTeacherClassroom },
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
                { text: 'ชื่อผู้ใช้', value: 'username', sortable: false },
                { text: 'ตำแหน่ง', value: 'role', sortable: false },
                {
                    text: 'ลบออกชั้นเรียน',
                    value: 'kick_classroom',
                    sortable: false,
                },
            ],
            listuser: [],

            errormessage: null,
        }
    },
    methods: {
        async getListUser() {
            const classcode = this.$route.params.code
            const { dispatch, state } = this.$store
            const { currentPage } = this
            await dispatch('listUserInClass/listUserInClass', {
                classcode,
                currentPage,
            }).then(() => {
                this.listuser = state.listUserInClass.listUser
                this.totalPage = Math.ceil(state.listUserInClass.totalUser / 20)
                this.hasNext = state.listUserInClass.hasNext
                this.upDateKey += 1
            })
            if (state.listUserInClass.isFailed) {
                this.errormessage =
                    state.listUserInClass.message ?? 'ไม่สามารถโหลดข้อมูลได้'
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
