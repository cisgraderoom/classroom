<template>
    <div>
        <v-row v-show="this.$store.state.submitTable.isSuccess && !this.status">
            <v-col md="9" class="mx-auto" xl="7">
                <v-alert text class="text-center" type="info"
                    >ยังไม่ส่งงาน</v-alert
                >
            </v-col>
        </v-row>
        <v-row
            v-show="
                this.$store.state.submitTable.isFailed &&
                this.$store.state.submitList.isFailed
            "
        >
            <v-col md="9" class="mx-auto" xl="7">
                <v-alert text class="text-center" type="info">{{
                    errormessage
                }}</v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="9" class="mx-auto" xl="7">
                <v-data-table
                    :headers="headers"
                    :items="score"
                    hide-default-footer
                    :loading="loading"
                    :loading-text="loadingtext"
                    class="elevation-1"
                    v-if="status"
                    v-show="checkRoleClassroom == 'student'"
                >
                </v-data-table>

                <v-row
                    class="mx-auto align-center"
                    v-show="
                        checkRoleClassroom == 'superteacher' ||
                        checkRoleClassroom == 'teacher'
                    "
                >
                    <v-col>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหาชื่อผู้ใช้"
                            v-on:keyup.enter="submitList"
                            :disabled="loading"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn
                            color="primary"
                            @click="submitList"
                            :disabled="loading"
                            >ค้นหา</v-btn
                        >
                    </v-col>
                </v-row>

                <v-data-table
                    :headers="headers2"
                    :items="score"
                    :page.sync="currentPage"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    :loading="loading"
                    :loading-text="loadingtext"
                    class="elevation-1"
                    @page-count="pageCount = $event"
                    v-if="status"
                    v-show="
                        checkRoleClassroom == 'superteacher' ||
                        checkRoleClassroom == 'teacher'
                    "
                >
                    <template v-slot:[`item.result`]="{ item }">
                        {{ item.result }}
                    </template>
                    <template v-slot:[`item.view_code`]="{ item }">
                        <viewCode
                            :username="item.username"
                            :code="item.code"
                            :is_delete="item.is_delete"
                            v-show="
                                checkRoleClassroom == 'superteacher' ||
                                checkRoleClassroom == 'teacher'
                            "
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
    props: ['submission_id'],
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
                value: 'created_at',
            },
            { text: 'Result', value: 'result', sortable: false },
            { text: 'Score', value: 'score', sortable: false },
        ],
        headers2: [
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
                value: 'created_at',
            },
            { text: 'Result', value: 'result', sortable: false },
            { text: 'Score', value: 'score', sortable: false },
            { text: 'Viewcode', value: 'view_code', sortable: false },
        ],
        score: [],
        search: null,
        getclasscode: null,
        getproblemid: null,
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
            this.getclasscode = this.$route.params.code
            this.getproblemid = this.$route.params.problemid
            this.loadingtext = 'กำลังโหลด....'
            this.loading = true
            const { commit } = this.$store
            commit('submitTable/submitTableLoading', {
                isFailed: false,
                isLoading: true,
                isSuccess: false,
            })
            // setTimeout(() => this.submitTable(), 3000)
        }
    },
    methods: {
        submitTable() {
            this.status = true
            const { state, commit } = this.$store
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            if (classcode && problemid) {
                // this.loading = true
                let data = this.$store
                    .dispatch('submitTable/submitTable', {
                        classcode,
                        problemid,
                        submission_id: this.submission_id,
                    })
                    .then(() => {
                        if (state.submitTable.isFailed) {
                            this.errormessage =
                                state.submitTable.error ?? 'ไม่สามารถโหลดได้'
                        }
                        if (state.submitTable.isSuccess) {
                            if (this.$store.state.submitTable.status) {
                                if (this.$store.state.submitTable.state) {
                                    this.score.pop()
                                    this.score.push(
                                        this.$store.state.submitTable.score
                                    )
                                    this.loading = false
                                } else {
                                    // this.loadingtext = 'กำลังตรวจคำตอบ....'
                                    // commit('submitTable/submitTableLoading', {
                                    //     isFailed: false,
                                    //     isLoading: true,
                                    //     isSuccess: false,
                                    // })
                                    this.score.pop()
                                    this.score.push(
                                        this.$store.state.submitTable.score
                                    )
                                    this.loading = false
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
            if (
                this.getclasscode == this.$route.params.code &&
                this.getproblemid == this.$route.params.problemid
            ) {
                setTimeout(() => this.submitTable(), 3000)
            }
        },
        submitList() {
            this.loading = true
            const { state } = this.$store
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('submitList/submitList', {
                    classcode,
                    problemid,
                    current: this.currentPage,
                    search: this.search,
                })
                .then(() => {
                    if (state.submitList.isFailed) {
                        this.errormessage =
                            state.submitList.error ?? 'ไม่สามารถโหลดได้'
                    }
                    if (state.submitList.isSuccess) {
                        this.score = this.$store.state.submitList.score
                        this.totalPage = Math.ceil(
                            this.$store.state.submitList.totalUser / 20
                        )
                        this.hasNext = this.$store.state.submitList.hasNext
                        this.status = this.$store.state.submitList.status
                        this.loading = false
                    }
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
