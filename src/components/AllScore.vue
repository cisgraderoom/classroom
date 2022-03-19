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
                    text: 'Name',
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
                            value: 'problem' + this.data[key][0].problem_id,
                            sortable: false,
                        })
                        for (const keyj in this.data[key]) {
                            this.listScore.push({
                                username: this.data[key][keyj].username,
                                name: this.data[key][keyj].name,
                                ['problem' + this.data[key][keyj].problem_id]:
                                    this.data[key][keyj].score.toString(),
                            })
                        }
                    }

                    // console.log(this.listScore)
                    // let _ = require('lodash')
                    // this.merged = _.uniqWith(array, (pre, cur) => {
                    //     console.log(pre, cur)
                    //     if (pre.username == cur.username) {
                    //         cur = { ...cur, ...pre }
                    //         array.splice(pre, 1);
                    //         return true
                    //     }
                    //     return false
                    // })
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
                    // console.log(this.merged)
                }
            })
        },
    },
}
</script>

<style></style>
