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
                    :loading="
                        this.$store.state.submitTable.isLoading ||
                        this.$store.state.submitList.isLoading
                    "
                    loading-text="กำลังโหลด...."
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
                        :disabled="this.$store.state.submitList.isLoading"
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
        headers: [
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
        score: [
            {
                date: '01/01/2021',
                case1: 0,
                case2: 0,
                score: '0',
            },
        ],
        status: true,
    }),
    // mounted() {
    //     if (
    //         this.checkRoleClassroom == 'superteacher' ||
    //         this.checkRoleClassroom == 'teacher'
    //     ) {
    //         this.submitList()
    //     } else {
    //         this.submitTable()
    //     }
    // },
    methods: {
        submitTable() {
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('submitTable/submitTable', {
                    classcode,
                    problemid,
                })
                .then(() => {
                    this.score = this.$store.state.submitTable.score
                    this.status = this.$store.state.submitTable.status
                })
            return data
        },
        submitList() {
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('submitList/submitList', {
                    classcode,
                    problemid,
                    current: this.currentPage,
                })
                .then(() => {
                    this.score = this.$store.state.submitList.score
                    this.totalPage = Math.ceil(
                        this.$store.state.submitList.totalUser / 20
                    )
                    this.hasNext = this.$store.state.submitList.hasNext
                    this.status = this.$store.state.submitList.status
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
