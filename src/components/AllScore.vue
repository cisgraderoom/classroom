<template>
    <div>
        <v-row>
            <v-col md="9" xl="5">
                <h2 class="my-2">คะแนนทั้งหมด</h2>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="10" class="mb-10" xl="9">
                    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                        <div class="d-flex justify-end mb-3">
                            <v-btn
                                color="primary"
                                @click="onExport"
                                :disabled="
                                    this.$store.state.listAllScoreInClass
                                        .isLoading
                                "
                                >Export</v-btn
                            >
                        </div>
                        <v-data-table
                            :headers="headers"
                            :items="merged"
                            hide-default-footer
                            :loading="
                                this.$store.state.listAllScoreInClass.isLoading
                            "
                            v-show="
                                !this.$store.state.listAllScoreInClass.isFailed
                            "
                            loading-text="กำลังโหลด...."
                            class="elevation-1"
                        >
                        </v-data-table>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="
                                this.$store.state.listAllScoreInClass.isLoading
                            "
                        ></v-progress-linear>
                        <v-alert
                            text
                            type="error"
                            v-show="
                                this.$store.state.listAllScoreInClass.isFailed
                            "
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { utils, writeFile } from 'xlsx' // import xlsx
export default {
    name: 'AllScore',
    mounted() {
        this.listAllScore()
    },
    data() {
        return {
            rawArray: [],
            listScore: [],
            merged: [],
            data: {},
            errormessage: null,
            headers: [
                {
                    text: 'ชื่อ',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
            ],
            numproblem: 0,
        }
    },
    methods: {
        async listAllScore() {
            const classcode = this.$route.params.code
            const { dispatch, state } = this.$store
            await dispatch('listAllScoreInClass/listAllScoreInClass', {
                classcode,
            }).then(() => {
                if (state.listAllScoreInClass.isFailed) {
                    this.errormessage =
                        state.listAllScoreInClass.message ??
                        'ไม่สามารถโหลดข้อมูลได้'
                }
                if (state.listAllScoreInClass.isSuccess) {
                    this.data = state.listAllScoreInClass.listScore
                    for (const key in this.data) {
                        this.headers.push({
                            text: this.data[key][0].problem_name,
                            value:
                                this.data[key][0].problem_name +
                                '_' +
                                this.data[key][0].problem_id,
                            sortable: false,
                        })
                        for (const keyj in this.data[key]) {
                            this.listScore.push({
                                username: this.data[key][keyj].username,
                                name: this.data[key][keyj].name,
                                [this.data[key][keyj].problem_name +
                                '_' +
                                this.data[key][keyj].problem_id]:
                                    this.data[key][keyj].score.toString(),
                            })
                        }
                    }
                    let arr = this.listScore
                    let a = null
                    for (const index in arr) {
                        for (const indexj in arr) {
                            if (
                                indexj > index &&
                                arr[index].username == arr[indexj].username
                            ) {
                                arr[index] = {
                                    ...arr[index],
                                    ...arr[indexj],
                                }
                                arr.splice(indexj, 1)
                            }
                        }
                        a = arr[index]
                        this.merged.push(a)
                    }
                }
            })
        },
        onExport() {
            const dataWS = utils.json_to_sheet(this.merged)
            const wb = utils.book_new()
            utils.book_append_sheet(wb, dataWS)
            writeFile(wb, 'score.xlsx')
        },
    },
}
</script>

<style></style>
