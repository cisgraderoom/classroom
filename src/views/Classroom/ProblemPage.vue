<template>
    <div>
        <Navbar />
        <v-container class="mb-10">
            <HeadClassroom />
            <div>
                <v-row>
                    <v-col md="9" class="mx-auto" xl="7">
                        <h2 class="my-2">โจทย์</h2>
                    </v-col>
                </v-row>
            </div>
            <div>
                <v-row
                    ><v-col md="9" class="mx-auto" xl="7"
                        ><Problemauto
                            :problemname="problem.problem_name"
                            :problemid="problem.problem_id"
                            :problemtext="problem.problem_desc"
                            :opendate="openDateFormat"
                            :closedate="closeDateFormat"
                            :maxscore="problem.max_score"
                        /><v-alert
                            text
                            type="error"
                            v-show="this.$store.state.getByIdProblem.isFailed"
                        >
                            {{ errormessage }}
                        </v-alert>
                    </v-col>
                </v-row>
            </div>
            <SubmitTable />
            <!-- <v-row>
                <v-col md="9" class="mx-auto" xl="7">
                    <v-data-table
                        :headers="headers"
                        :items="score"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </v-col>
            </v-row> -->
        </v-container>
    </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import Problemauto from '../../components/Problemauto'
import SubmitTable from '../../components/SubmitTable'
export default {
    name: 'Problem',
    components: {
        Navbar,
        HeadClassroom,
        Problemauto,
        SubmitTable,
    },
    mounted() {
        this.getByIdProblem()
    },
    data: () => ({
        problem: [],
        openDateFormat: null,
        closeDateFormat: null,
        errormessage: null,
        // headers: [
        //     {
        //         text: 'Date',
        //         align: 'start',
        //         sortable: false,
        //         value: 'date',
        //     },
        //     { text: 'case1', value: 'case1' },
        //     { text: 'case2', value: 'case2' },
        //     { text: 'case3', value: 'case3' },
        //     { text: 'case4', value: 'case4' },
        //     { text: 'case5', value: 'case5' },
        //     { text: 'sum', value: 'sum' },
        // ],
        // score: [
        //     {
        //         date: '01/01/2021',
        //         case1: 0,
        //         case2: 0,
        //         case3: 0,
        //         case4: 0,
        //         case5: 0,
        //         sum: '0',
        //     },
        // ],
    }),
    methods: {
        getByIdProblem() {
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            let data = this.$store
                .dispatch('getByIdProblem/getByIdProblem', {
                    classcode,
                    problemid,
                })
                .then(() => {
                    this.problem = this.$store.state.getByIdProblem.problem
                    this.Loading = false
                    this.formatDate()
                })
            return data
        },
        formatDate() {
            const timeAgo = new TimeAgo('en-US')
            this.openDateFormat = timeAgo.format(new Date(this.problem.open_at))
            this.closeDateFormat = timeAgo.format(
                new Date(this.problem.close_at)
            )
        },
    },
}
</script>
