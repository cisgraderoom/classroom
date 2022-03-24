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
                            :items="listresult"
                            :disabled="loading"
                            :loading="loading"
                            v-model="problemid"
                            label="โจทย์ที่ตรวจความคล้ายคลึงแล้ว"
                            @click="listPlagiarism"
                        >
                        </v-select>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหาชื่อผู้ใช้"
                            single-line
                            hide-details
                        ></v-text-field>
                        <v-data-table
                            :headers="headers"
                            :items="tableresult"
                            :items-per-page="5"
                            hide-default-footer
                            :disabled="loading"
                            :loading="loading"
                            :loading-text="loadingtext"
                            class="elevation-1"
                        >
                            <template v-slot:[`item.view_code`]="{ item }">
                                <viewCode2
                                    :owner="item.owner"
                                    :compar="item.compar"
                                    :problem_id="problem"
                                />
                            </template>
                        </v-data-table>
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
            search: '',
            headers: [
                { text: 'Username1', value: 'owner', sortable: false },
                { text: 'Username2', value: 'compar', sortable: false },
                { text: 'Result', value: 'result', filterable: false },
                {
                    text: 'ดูเทียบ Code',
                    sortable: false,
                    value: 'view_code',
                    filterable: false,
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
            const classcode = this.$route.params.code
            if (classcode && this.problemid) {
                this.loading = true
                await dispatch('listPlagiarism/listPlagiarism', {
                    classcode,
                })
                if (state.listPlagiarism.isFailed) {
                    this.errormessage =
                        state.listPlagiarism.error ?? 'ไม่สามารถลิสโจทย์ได้'
                }
                if (state.listPlagiarism.isSuccess) {
                    this.tableresult = state.listPlagiarism.list
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
                this.submitList()
            }
        },
    },
}
</script>

<style></style>
