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
                            :items="listScore"
                            :items-per-page="5"
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
                    this.numproblem = Object.keys(this.data).length
                    for (let index = 0; index < this.numproblem; index++) {
                        let problem = index + 1
                        this.headers.push({
                            text: index + 1,
                            value: 'problem' + problem,
                            sortable: false,
                        })
                    }
                    Array.prototype.push.apply(this.data[1], this.data[2])
                    this.rawArray = this.data[1]
                    for (let i = 0; i < this.rawArray.length; i++) {
                        this.listScore.push({
                            username: this.rawArray[i].username,
                            name: this.rawArray[i].name,
                            ['problem' + this.rawArray[i].problem_id]:
                                this.rawArray[i].score,
                        })
                    }
                    console.log(this.listScore)
                    let _ = require('lodash')
                    var array = this.listScore
                    let merged = _.uniqWith(array, (pre, cur) => {
                        if (pre.name == cur.name) {
                            cur = { ...cur, ...pre }
                            return true
                        }
                        return false
                    })
                    console.log(merged)
                    // console.log(this.listScore)
                    // console.log({ ...this.listScore[0], ...this.listScore[2] })
                }
            })
        },
    },
}
</script>

<style></style>
