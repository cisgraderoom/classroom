<template>
    <div>
        <v-row v-show="this.$store.state.submitTable.isSuccess && !this.status">
            <v-col md="9" class="mx-auto" xl="7">
                <v-alert text class="text-center" type="info"
                    >ยังไม่ส่งงาน</v-alert
                >
            </v-col>
        </v-row>
        <v-row>
            <v-col md="9" class="mx-auto" xl="7">
                <v-data-table
                    :headers="headers"
                    :items="score"
                    :page.sync="currentPage"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    :loading="loading"
                    :loading-text="loadingtext"
                    class="elevation-1"
                    @page-count="pageCount = $event"
                    v-if="status"
                    ><template v-slot:[`item.view_code`]="{ item }">
                        <viewCode
                            :username="item.username"
                            :is_delete="item.is_delete"
                        />
                    </template>
                </v-data-table>
                <div class="text-center pt-2">
                    <v-pagination
                        v-model="pageCount"
                        :disabled="loading"
                        :length="totalPage"
                        :total-visible="7"
                        @input="handlePageChange"
                        v-show="
                            checkRoleClassroom == 'superteacher' ||
                            checkRoleClassroom == 'teacher'
                        "
                    ></v-pagination>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import viewCode from './viewCode.vue'
export default {
    name: 'SubmitTable',
    components: { viewCode },
    data: () => ({
        checkRoleClassroom: JSON.parse(localStorage.getItem('user')).role,
        errormessage: null,
        currentPage: 1,
        pageCount: 1,
        totalPage: 1,
        itemsPerPage: 20,
        loadingtext: 'กำลังโหลด....',
        loading: false,
        headers: [
            {
                text: 'Username',
                align: 'start',
                sortable: false,
                value: 'username',
            },
            {
                text: 'Date',
                align: 'start',
                sortable: false,
                value: 'date',
            },
            { text: 'case1', value: 'case1', sortable: false },
            { text: 'case2', value: 'case2', sortable: false },
            { text: 'Score', value: 'score', sortable: false },
            { text: 'viewcode', value: 'view_code', sortable: false },
        ],
        score: [],
        // score: [
        //     {
        //         username: 'student01',
        //         date: '01/01/2021',
        //         case1: 1,
        //         case2: 0,
        //         score: '5',
        //     },
        //     {
        //         username: 'student02',
        //         date: '01/01/2021',
        //         case1: 0,
        //         case2: 0,
        //         score: '0',
        //     },
        //     {
        //         username: 'student03',
        //         date: '01/01/2021',
        //         case1: 1,
        //         case2: 1,
        //         score: '10',
        //     },
        // ],
        status: true,
    }),
    mounted() {
        if (
            this.checkRoleClassroom == 'superteacher' ||
            this.checkRoleClassroom == 'teacher'
        ) {
            this.submitList()
        } else {
            this.submitTable()
        }
    },
    methods: {
        submitTable() {
            this.status = true
            const { state, commit } = this.$store
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            if (classcode && problemid) {
                this.loading = true
                let data = this.$store
                    .dispatch('submitTable/submitTable', {
                        classcode,
                        problemid,
                    })
                    .then(() => {
                        if (state.submitTable.isFailed) {
                            this.errormessage =
                                state.submitTable.error ?? 'ไม่สามารถโหลดได้'
                        }
                        if (state.submitTable.isSuccess) {
                            if (this.$store.state.submitTable.status) {
                                if (this.$store.state.submitTable.state) {
                                    this.score =
                                        this.$store.state.submitTable.score
                                    this.loading = false
                                } else {
                                    this.loadingtext = 'กำลังตรวจคำตอบ....'
                                    commit('submitTable/submitTableLoading', {
                                        isFailed: false,
                                        isLoading: true,
                                        isSuccess: false,
                                    })
                                    this.ReLoadsubmitTable()
                                }
                            } else {
                                this.status =
                                    this.$store.state.submitTable.status
                                this.loading = false
                                commit('submitTable/submitTableSuccess', {
                                    isFailed: false,
                                    isLoading: false,
                                    isSuccess: true,
                                })
                            }
                        }
                    })
                return data
            }
        },
        ReLoadsubmitTable() {
            setTimeout(() => this.submitTable(), 10000)
        },
        submitList() {
            this.loading = true
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('submitList/submitList', {
                    classcode,
                    problemid,
                    current: this.currentPage,
                })
                .then(() => {
                    this.loading = false
                    // this.score = this.$store.state.submitList.score
                    // this.totalPage = Math.ceil(
                    //     this.$store.state.submitList.totalUser / 20
                    // )
                    // this.hasNext = this.$store.state.submitList.hasNext
                    // this.status = this.$store.state.submitList.status
                })
            return data
        },
        handlePageChange(value) {
            if (this.currentPage != value) {
                this.currentPage = value
                this.submitList()
            }
        },
    },
}
</script>

<style></style>
