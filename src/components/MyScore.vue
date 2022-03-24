<template>
    <div>
        <v-row>
            <v-col md="9" xl="5">
                <h2 class="my-2">คะแนนของฉัน</h2>
            </v-col>
        </v-row>
        <div>
            <v-row>
                <v-col md="10" class="mb-10" xl="9">
                    <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
                        <v-data-table
                            :headers="headers"
                            :items="listScore"
                            hide-default-footer
                            :loading="
                                this.$store.state.listMyScoreInClass.isLoading
                            "
                            v-show="
                                !this.$store.state.listMyScoreInClass.isFailed
                            "
                            loading-text="กำลังโหลด...."
                            class="elevation-1"
                        >
                        </v-data-table>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                            v-show="
                                this.$store.state.listMyScoreInClass.isLoading
                            "
                        ></v-progress-linear>
                        <v-alert
                            text
                            type="error"
                            v-show="
                                this.$store.state.listMyScoreInClass.isFailed
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
    name: 'MyScore',
    mounted() {
        this.listMyScore()
    },
    data() {
        return {
            rawArray: [],
            listScore: [{}],
            merged: [],
            data: {},
            errormessage: null,
            headers: [],
            numproblem: 0,
        }
    },
    methods: {
        async listMyScore() {
            const classcode = this.$route.params.code
            const { dispatch, state } = this.$store
            await dispatch('listMyScoreInClass/listMyScoreInClass', {
                classcode,
            }).then(() => {
                if (state.listMyScoreInClass.isFailed) {
                    this.errormessage =
                        state.listMyScoreInClass.message ??
                        'ไม่สามารถโหลดข้อมูลได้'
                }
                if (state.listMyScoreInClass.isSuccess) {
                    this.data = state.listMyScoreInClass.listScore
                    for (const key in this.data.problem) {
                        this.headers.push({
                            text: this.data.problem[key],
                            value: 'problem' + key,
                            sortable: false,
                        })
                        this.listScore[0] = {
                            ...this.listScore[0],
                            ...{
                                ['problem' + key]: this.data.submission[key],
                            },
                        }
                    }
                    this.headers.push({
                        text: 'คะแนนทั้งหมด',
                        value: 'total',
                        sortable: false,
                    })
                    this.listScore[0] = {
                        ...this.listScore[0],
                        ...{
                            total: this.data.score,
                        },
                    }
                }
            })
        },
    },
}
</script>

<style></style>
