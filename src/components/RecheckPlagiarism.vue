<template>
    <div>
        <v-row>
            <v-col md="9" xl="8">
                <h2 class="my-2">ตรวจใหม่ & ตรวจความคล้ายคลึง</h2>
            </v-col>
            <v-col md="2" xl="2">
                <AddRecheckPlagiarism
                    class="my-2 mx-lg-n4"
                    :list_item="listitem"
                    :key="key"
                />
            </v-col>
        </v-row>
        <div>
            <v-row v-show="this.$store.state.getListItemPlagiarism.isFailed">
                <v-col md="9" class="mx-auto" xl="7">
                    <v-alert text class="text-center" type="error">{{
                        errormessage
                    }}</v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="10" class="mb-10" xl="9">
                    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                        <v-select
                            md="4"
                            xl="5"
                            item-text="problem_name"
                            item-value="problem_id"
                            :items="listitem"
                            :disabled="loading"
                            :loading="loading"
                            v-model="problemid"
                            label="โจทย์ที่ตรวจความคล้ายคลึงแล้ว"
                            v-on:change="listPlagiarism"
                        >
                        </v-select>
                        <v-data-table
                            :headers="headers"
                            :items="tableresult"
                            :items-per-page="20"
                            :page.sync="currentPage"
                            hide-default-footer
                            :disabled="loading"
                            :loading="loading"
                            :loading-text="loadingtext"
                            @page-count="pageCount = $event"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.view_code`]="{ item }">
                                <viewCode2
                                    :owner="item.owner"
                                    :compare="item.compare"
                                    :problem_id="problemid"
                                />
                            </template>
                        </v-data-table>
                        <div class="text-center pt-2">
                            <v-pagination
                                v-model="pageCount"
                                :disabled="
                                    this.$store.state.listAllUser.isLoading
                                "
                                :length="totalPage"
                                :total-visible="7"
                                @input="handlePageChange"
                            ></v-pagination>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import AddRecheckPlagiarism from './AddRecheckPlagiarism'
import viewCode2 from './viewCode2'
export default {
    name: 'RecheckPlagiarism',
    components: {
        AddRecheckPlagiarism,
        viewCode2,
    },
    data() {
        return {
            problemid: null,
            currentPage: 1,
            pageCount: 1,
            totalPage: 1,
            hasNext: false,
            headers: [
                { text: 'คนที่ 1', value: 'owner', sortable: false },
                { text: 'คนที่ 2', value: 'compare', sortable: false },
                {
                    text: 'ผลตรวจสอบความคล้าย',
                    value: 'result',
                },
                {
                    text: 'ดูเทียบ Code',
                    value: 'view_code',
                    sortable: false,
                },
            ],
            listitem: [],
            list: [],
            listresult: [],
            tableresult: [],
            status: false,
            loading: false,
            loadingtext: 'กำลังโหลด....',
            errormessage: '',
            key: 0,
        }
    },
    mounted() {
        this.getListItemPlagiarism()
    },
    methods: {
        async getListItemPlagiarism() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const classcode = this.$route.params.code
            if (classcode) {
                this.loading = true
                await dispatch('getListItemPlagiarism/getListItemPlagiarism', {
                    classcode,
                })
                if (state.getListItemPlagiarism.isFailed) {
                    this.errormessage =
                        state.getListItemPlagiarism.error ??
                        'ไม่สามารถลิสโจทย์ได้'
                }
                if (state.getListItemPlagiarism.isSuccess) {
                    this.list = state.getListItemPlagiarism.list
                    for (let x in this.list) {
                        this.listitem.push({
                            problem_name: this.list[x].problem_name,
                            problem_id: this.list[x].problem_id,
                        })
                    }
                    this.key += 1
                    this.loading = false
                }
                return
            } else {
                commit('getListItemPlagiarism/getListItemPlagiarismFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
        },
        async listPlagiarism() {
            const { dispatch, state, commit } = this.$store
            this.submitted = true
            const { currentPage } = this
            const classcode = this.$route.params.code
            if (classcode && this.problemid) {
                this.loading = true
                await dispatch('listPlagiarism/listPlagiarism', {
                    classcode,
                    problem_id: this.problemid,
                    currentPage,
                })
                if (state.listPlagiarism.isFailed) {
                    this.errormessage =
                        state.listPlagiarism.error ?? 'ไม่สามารถลิสโจทย์ได้'
                    this.loading = false
                }
                if (state.listPlagiarism.isSuccess) {
                    this.tableresult = state.listPlagiarism.list
                    this.totalPage = Math.ceil(
                        state.listPlagiarism.totalUser / 20
                    )
                    this.hasNext = state.listPlagiarism.hasNext
                    this.loading = false
                }
                return
            } else {
                commit('listPlagiarism/listPlagiarismFailure', {
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return
            }
        },
        handlePageChange(value) {
            if (this.currentPage != value) {
                this.currentPage = value
                this.listPlagiarism()
            }
        },
    },
}
</script>

<style></style>
