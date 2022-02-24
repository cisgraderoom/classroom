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
                            :opendate="problem.open_at"
                            :closedate="problem.close_at"
                            :maxscore="problem.max_score"
                        />
                    </v-col>
                </v-row>
            </div>

            <v-row>
                <v-col md="9" class="mx-auto" xl="7">
                    <v-data-table
                        :headers="headers"
                        :items="score"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import HeadClassroom from '../../components/HeadClassroom'
import Problemauto from '../../components/Problemauto'
export default {
    name: 'Problem',
    components: {
        Navbar,
        HeadClassroom,
        Problemauto,
    },
    mounted() {
        this.getByIdProblem()
    },
    data: () => ({
        problem: [],
        headers: [
            {
                text: 'Date',
                align: 'start',
                sortable: false,
                value: 'date',
            },
            { text: 'case1', value: 'case1' },
            { text: 'case2', value: 'case2' },
            { text: 'case3', value: 'case3' },
            { text: 'case4', value: 'case4' },
            { text: 'case5', value: 'case5' },
            { text: 'sum', value: 'sum' },
        ],
        score: [
            {
                date: '01/01/2021',
                case1: 0,
                case2: 0,
                case3: 0,
                case4: 0,
                case5: 0,
                sum: '0',
            },
        ],
    }),
    methods: {
        getByIdProblem() {
            const classcode = this.$route.params.code
            const problemid = this.$route.params.problemid
            this.Loading = true
            let data = this.$store
                .dispatch('getByIdProblem/getByIdProblem', {
                    classcode,
                    problemid,
                })
                .then(() => {
                    this.problem = this.$store.state.getByIdProblem.problem
                    console.log(this.problem)
                })
            return data
        },
    },
}
</script>
